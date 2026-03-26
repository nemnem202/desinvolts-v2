import { ReactNode, useEffect, useRef, useState } from "react";
import ButtonPlus from "../../ui/buttonPlus";
import { Dialog } from "../../ui/dialog";
import ImageForm from "./imageForm";
import { Image } from "@/prisma/generated/prisma/browser";
import { errorToast } from "@/lib/utils";

export const CANVAS_WIDTH = 300;
export const RESIZE_HANDLE_SIZE = 20;

export default function AddImageButton({
  children,
  onImage,
  callbackOnClick = () => {},
}: {
  children?: ReactNode;
  onImage: (image: Image) => void;
  callbackOnClick?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImage] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const loadImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    callbackOnClick();
    e.preventDefault();
    e.stopPropagation();
    imageFile && setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (imageFile) {
      setDialogOpen(true);
    }
  }, [imageFile]);

  const handleImageLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      errorToast(
        "Fichier trop volumineux",
        "L'image ne doit pas dépasser 10 Mo. (Actuel : " +
          (file.size / (1024 * 1024)).toFixed(2) +
          " Mo)",
      );

      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    // ----------------------------------------

    setImage(file);
  };

  return (
    <>
      {children ? (
        <button onClick={loadImage} className="cursor-pointer" type="button">
          {children}
        </button>
      ) : (
        <ButtonPlus onClick={loadImage} />
      )}
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        onChange={handleImageLoad}
        accept="image/*"
      />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {imageFile && (
          <ImageForm
            image={imageFile}
            onImage={onImage}
            loadImage={loadImage}
            setImage={setImage}
            setDialogOpen={setDialogOpen}
          />
        )}
      </Dialog>
    </>
  );
}
