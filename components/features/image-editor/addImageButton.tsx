import { type ReactNode } from "react";
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          <button className="cursor-pointer" type="button">
            {children}
          </button>
        ) : (
          <ButtonPlus />
        )}
      </DialogTrigger>
      <DialogContent className="w-[50dvw] max-h-[70dvw]">
        <AllImagesModalContent />
      </DialogContent>
    </Dialog>
  );
}
