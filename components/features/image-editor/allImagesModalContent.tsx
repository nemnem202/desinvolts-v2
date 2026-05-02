import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Import, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { logger } from "@/lib/logger";
import { errorToast, successToast } from "@/lib/utils";
import onImageUpload, { onDeleteImage } from "@/telefunc/uploadimage.telefunc";
import { onGetAllImages } from "@/telefunc/getAllImages.telefunc";
import { ImageSchema } from "@/config/zodSchemas";
import { Image } from "@/prisma/generated/prisma/client";
import getRandomId from "@giapspzoo/get-random-id";

type AllImagesFormValues = z.infer<typeof ImageSchema>;

const getCroppedCanvas = (image: HTMLImageElement, crop: Crop): HTMLCanvasElement => {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const canvas = document.createElement("canvas");
  const pixelCrop = {
    x: (crop.unit === "%" ? (crop.x / 100) * image.width : crop.x) * scaleX,
    y: (crop.unit === "%" ? (crop.y / 100) * image.height : crop.y) * scaleY,
    width: (crop.unit === "%" ? (crop.width / 100) * image.width : crop.width) * scaleX,
    height: (crop.unit === "%" ? (crop.height / 100) * image.height : crop.height) * scaleY,
  };
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
  return canvas;
};

export default function AllImagesModalContent({
  onImage,
  closeDialog,
}: {
  onImage: (image: Image) => void;
  closeDialog: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [allImages, setAllImages] = useState<string[]>([]);
  const [imageSrc, setImageSrc] = useState("");
  const [uploading, setUploading] = useState(false);
  const [displayType, setDisplayType] = useState<"all" | "edit">("all");
  const [crop, setCrop] = useState<Crop>();

  const form = useForm<AllImagesFormValues>({
    resolver: zodResolver(ImageSchema),
    defaultValues: { source: "", alt: "", id: getRandomId() },
  });

  const selectedSource = form.watch("source");
  const altValue = form.watch("alt") ?? "";

  useEffect(() => {
    onGetAllImages().then((response) =>
      setAllImages(response.map((img: { publicUrl: string }) => img.publicUrl))
    );
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result?.toString() || "");
      setDisplayType("edit");
    };
    reader.readAsDataURL(file);
  };

  const onImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerCrop(makeAspectCrop({ unit: "%", width: 90 }, 1, width, height), width, height));
  };

  const handleUploadCropped = async () => {
    if (!crop || !imgRef.current) return;
    setUploading(true);
    try {
      const canvas = getCroppedCanvas(imgRef.current, crop);
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp"));
      if (!blob) throw new Error("Canvas is empty");
      const compressed = await imageCompression(blob as File, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp",
      });
      const result = await onImageUpload(compressed);
      if (result.success) {
        setAllImages((prev) => [result.publicUrl, ...prev]);
        setDisplayType("all");
        successToast("Image ajoutée !");
      }
    } catch (error) {
      logger.error("Erreur upload", error);
      errorToast("Erreur lors de l'envoi de l'image");
    } finally {
      setUploading(false);
    }
  };

  const removeImageFromList = (url: string) => {
    setAllImages((prev) => prev.filter((img) => img !== url));
    if (selectedSource === url) form.resetField("source");
  };

  const handleSubmit = (data: AllImagesFormValues) => {
    logger.info("Soumission de l'imae", data);
    onImage({ source: data.source, alt: data.alt ?? null, id: getRandomId() });
    closeDialog();
  };

  if (displayType === "edit") {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="max-h-[500px] overflow-auto border rounded bg-muted/20">
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)} ruleOfThirds>
            <img
              ref={imgRef}
              src={imageSrc}
              onLoad={onImageLoaded}
              style={{ maxWidth: "100%" }}
              alt="À recadrer"
            />
          </ReactCrop>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setDisplayType("all")}>
            <X className="mr-2 h-4 w-4" /> Annuler
          </Button>
          <Button onClick={handleUploadCropped} disabled={uploading}>
            {uploading ? <Spinner className="mr-2" /> : <Check className="mr-2 h-4 w-4" />}
            Valider le recadrage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="form-rhf-image-select"
      onSubmit={form.handleSubmit(handleSubmit, (errors) => {
        logger.error("Erreurs de validation", errors);
      })}
      className="flex flex-col gap-5"
    >
      <p className="title">Choisissez une image</p>

      {/* Import */}
      <Button
        type="button"
        variant="outline"
        className="w-fit"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? (
          <Spinner />
        ) : (
          <>
            <Import className="mr-2 h-4 w-4" /> Importer une image
          </>
        )}
      </Button>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
        accept="image/*"
      />

      {/* Grille radio */}
      <Controller
        name="source"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className="subtitle">Images disponibles</FieldLabel>
            <div
              role="radiogroup"
              aria-label="Sélectionner une image"
              className="flex flex-wrap gap-2 max-h-80 overflow-y-auto p-1 border rounded-md"
            >
              {allImages.map((url) => (
                <SelectableImage
                  key={url}
                  url={url}
                  isSelected={field.value === url}
                  onSelect={() => field.onChange(url)}
                  onDelete={() => removeImageFromList(url)}
                />
              ))}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Description optionnelle — visible seulement si une image est sélectionnée */}
      {selectedSource && (
        <Controller
          name="alt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-image-alt" className="subtitle">
                Description de l'image
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  value={field.value ?? ""}
                  id="form-rhf-image-alt"
                  placeholder="Ex: Portrait de l'équipe..."
                  rows={3}
                  className="min-h-16 resize-none focus:border-none focus-visible:ring-offset-0 paragraph"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums paragraph-sm">
                    {altValue.length}/500 caractères
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription className="paragraph">
                La description est optionnelle.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )}

      <Button
        type="submit"
        form="form-rhf-image-select"
        className="w-full"
        disabled={!selectedSource}
      >
        Envoyer
      </Button>
    </form>
  );
}

interface SelectableImageProps {
  url: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

function SelectableImage({ url, isSelected, onSelect, onDelete }: SelectableImageProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Supprimer cette image définitivement ?")) return;
    setIsDeleting(true);
    try {
      const response = await onDeleteImage(url);
      if (response.success) {
        successToast("L'image a bien été supprimée.");
        onDelete();
      } else {
        throw new Error();
      }
    } catch {
      errorToast("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === " " && onSelect()}
      className={`
        relative group w-20 h-20 rounded overflow-hidden border cursor-pointer
        bg-card flex justify-center transition-all
        ${
          isSelected
            ? "border-primary ring-2 ring-primary ring-offset-1"
            : "border-border hover:border-primary/50"
        }
      `}
    >
      <img src={url} alt=" le groupe desinvolts" className="object-contain h-full" />

      {isSelected && (
        <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full p-0.5">
          <Check size={10} />
        </div>
      )}

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="
          absolute top-1 right-1 p-1 bg-red-500 text-white rounded shadow-sm
          opacity-0 group-hover:opacity-100 transition-opacity
          hover:bg-red-600 disabled:bg-gray-400
        "
      >
        {isDeleting ? <Spinner className="h-3 w-3" /> : <Trash2 size={14} />}
      </button>
    </div>
  );
}
