import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Import, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import onImageUpload from "@/telefunc/uploadimage.telefunc";

export default function AllImagesModalContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null); // Pour récupérer les dimensions réelles de l'image

  const [allImages, setAllImages] = useState<{ publicUrl: string }[]>([]);
  const [imageSrc, setImageSrc] = useState<string>(""); // URL locale pour l'affichage
  const [loading, setLoading] = useState(false);
  const [displayType, setDisplayType] = useState<"all" | "edit">("all");
  const [crop, setCrop] = useState<Crop>();

  const handleImageLoad = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImageSrc(reader.result?.toString() || "");
      setDisplayType("edit");
    });
    reader.readAsDataURL(file);
  };

  function onImageLoaded(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
  }

  const handleUploadCropped = async () => {
    if (!crop || !imgRef.current) return;
    setLoading(true);

    try {
      const canvas = document.createElement("canvas");
      const image = imgRef.current;
      const ctx = canvas.getContext("2d");

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
        };

        const compressedFile = await imageCompression(blob as File, options);
        const result = await onImageUpload(compressedFile);
        if (result.success) {
          setAllImages((prev) => [result, ...prev]);
          setDisplayType("all");
        }
      }, "image/webp");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (displayType === "all") {
    return (
      <div className="flex flex-col gap-5">
        <Button variant={"outline"} className="w-fit" onClick={() => inputRef.current?.click()}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Import /> Importer une image
            </>
          )}
        </Button>

        <div className="flex flex-wrap gap-2">
          {allImages.map((image, index) => (
            <img
              key={index}
              className="w-20 h-20 object-cover rounded"
              src={image.publicUrl}
              alt="cloud"
            />
          ))}
        </div>

        <input
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageLoad}
          accept="image/*"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="max-h-[500px] overflow-auto border rounded">
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)} ruleOfThirds={true}>
          <img
            ref={imgRef}
            src={imageSrc}
            onLoad={onImageLoaded}
            style={{ maxWidth: "100%" }}
            alt="To crop"
          />
        </ReactCrop>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => setDisplayType("all")}>
          <X className="mr-2 h-4 w-4" /> Annuler
        </Button>
        <Button onClick={handleUploadCropped}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Valider le recadrage
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
