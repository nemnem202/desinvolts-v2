import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { CANVAS_WIDTH } from "@/components/features/image-editor/addImageButton";
import type { ImageFormProps } from "@/components/features/image-editor/imageForm";
import { imagePropsSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import type { Bounds } from "@/types/window";
import onImageUpload from "@/telefunc/uploadimage.telefunc";
import { errorToast, successToast } from "@/lib/utils";

type ImageFormValues = z.infer<typeof imagePropsSchema>;

export function useImageForm(props: ImageFormProps) {
  const { image, setImage, setDialogOpen, onImage } = props;
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [squareArea, setSquare] = useState<Bounds>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setSquare((prev) => ({
        ...prev,
        width: CANVAS_WIDTH,
        height: img.naturalHeight * (CANVAS_WIDTH / img.naturalWidth),
      }));
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imagePropsSchema),
    defaultValues: {
      title: image.name,
      date: new Date(image.lastModified),
      description: "La photo du groupe Désinvolts",
    },
  });

  const cropImage = async (
    file: File,
    x: number,
    y: number,
    width: number,
    height: number
  ): Promise<Blob> => {
    return new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        const scaleX = img.naturalWidth / CANVAS_WIDTH;
        const _scaleY = img.naturalHeight / (img.naturalHeight * (CANVAS_WIDTH / img.naturalWidth));

        const realX = x * scaleX;
        const realY = y * scaleX;
        const realWidth = width * scaleX;
        const realHeight = height * scaleX;

        const canvas = document.createElement("canvas");

        canvas.width = realWidth;
        canvas.height = realHeight;

        const ctx = canvas.getContext("2d")!;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(img, realX, realY, realWidth, realHeight, 0, 0, realWidth, realHeight);

        canvas.toBlob((blob) => {
          if (!blob) {
            logger.error("Echec de la conversion du canvas");
            return;
          }
          resolve(blob);
        }, "image/webp");
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const submitImage = async (image: Blob, imageName: string): Promise<string> => {
    const file = new File([image], imageName, { type: image.type });

    const res = await onImageUpload(file);

    logger.info("response", res);

    if (res.success) {
      successToast("Image uploaded !");
      return res.publicUrl;
    } else {
      errorToast("Image failed to be upload");
      return "";
    }
  };

  const handleSubmit = async (values: ImageFormValues, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    logger.info("IMAGE FORM SUBMITTED", values);
    setFormLoading(true);
    const cropped = await cropImage(
      image,
      squareArea.x,
      squareArea.y,
      squareArea.width,
      squareArea.height
    );
    const imageUrl = await submitImage(cropped, values.title);
    onImage({
      alt: values.description,
      id: getRandomId(),
      source: imageUrl,
    });
    setDialogOpen(false);
    setFormLoading(false);
    return setImage(null);
  };

  const onError = (errors: any) => {
    logger.error("Erreurs de validation :", errors);
  };

  return { form, handleSubmit, onError, formLoading, squareArea, setSquare };
}
