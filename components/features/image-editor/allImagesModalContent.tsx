import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Import, Check, X, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import onImageUpload, { onDeleteImage } from "@/telefunc/uploadimage.telefunc";
import { logger } from "@/lib/logger";
import { onGetAllImages } from "@/telefunc/getAllImages.telefunc";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { errorToast, successToast } from "@/lib/utils";

export default function AllImagesModalContent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const pixelCrop = {
        x: (crop.unit === "%" ? (crop.x / 100) * image.width : crop.x) * scaleX,
        y: (crop.unit === "%" ? (crop.y / 100) * image.height : crop.y) * scaleY,
        width: (crop.unit === "%" ? (crop.width / 100) * image.width : crop.width) * scaleX,
        height: (crop.unit === "%" ? (crop.height / 100) * image.height : crop.height) * scaleY,
      };

      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No canvas context");

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/webp")
      );
      if (!blob) throw new Error("Canvas is empty");

      const compressedFile = await imageCompression(blob as File, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const result = await onImageUpload(compressedFile);
      if (result.success) {
        setAllImages((prev) => [result, ...prev]);
        setDisplayType("all");
      }
    } catch (error) {
      logger.error("Erreur upload", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    onGetAllImages().then((response) => {
      setAllImages((prev) => [...prev, ...response]);
    });
  }, []);

  if (displayType === "all") {
    return (
      <div className="flex flex-col gap-5">
        <p className="title">Choisissez une image</p>
        <Button variant={"outline"} className="w-fit" onClick={() => inputRef.current?.click()}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Import /> Importer une image
            </>
          )}
        </Button>

        <div className="flex flex-wrap gap-2 max-h-100 overflow-auto">
          {allImages.map((image, index) => (
            <SelectableImage
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
        <Field>
          <FieldLabel htmlFor="form-rhf-image-title" className="subtitle">
            Description de l'image
          </FieldLabel>
          <Input id="form-rhf-image-title" autoComplete="off" className="paragraph" />
        </Field>

        <Button>Soumettre</Button>
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

interface SelectableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function SelectableImage({ ...props }: SelectableImageProps) {
  const handleDelete = async (e: React.MouseEvent) => {
    if (!props.src) return;
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Supprimer cette image définitivement ?")) {
      const response = await onDeleteImage(props.src);

      if (response.success) {
        successToast("L'image a bien été supprimée.");
      } else {
        errorToast("Une erreur innatendue est survenue lors de la suppression de l'image");
      }
    }
  };

  return (
    <div className="relative group w-20 h-20 bg-card rounded overflow-hidden border cursor-pointer flex items-center justify-center">
      <img
        {...props}
        src={props.src}
        className="object-contain h-full"
        alt={props.alt || "Cloud image"}
      />
      <button
        type="button"
        onClick={handleDelete}
        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded shadow-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200
                   hover:bg-red-600 active:scale-95 cursor-pointer"
        title="Supprimer l'image"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
