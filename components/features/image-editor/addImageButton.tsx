import { useState, type ReactNode } from "react";
import type { Image } from "@/prisma/generated/prisma/browser";
import ButtonPlus from "../../ui/buttonPlus";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

import AllImagesModalContent from "./allImagesModalContent";

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
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          <button className="cursor-pointer" type="button">
            {children}
          </button>
        ) : (
          <ButtonPlus />
        )}
      </DialogTrigger>
      <AddImageDialogContent onImage={onImage} setOpen={setOpen} />
    </Dialog>
  );
}

export function AddImageDialogContent({
  onImage,
  setOpen,
}: {
  onImage: (image: Image) => void;
  setOpen: (value: boolean) => void;
}) {
  return (
    <DialogContent className="w-[50dvw] max-h-[70dvw]">
      <AllImagesModalContent
        onImage={onImage}
        closeDialog={() => {
          setOpen(false);
        }}
      />
    </DialogContent>
  );
}
