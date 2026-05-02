import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowDownUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Image as ImageDb } from "@/prisma/generated/prisma/browser";
import { useAdmin } from "@/providers/adminProvider";
import AddImageButton from "../features/image-editor/addImageButton";
import { Skeleton } from "../ui/skeleton";

export interface ImageProps {
  width?: number;
  height?: number;
  imageProps: ImageDb;
  onChange: (newImage: ImageDb) => void;
  onRemove?: () => void;

  changeButtonSideY?: "top" | "bottom";
}

export default function Image(props: ImageProps) {
  const { imageProps, onChange, onRemove, changeButtonSideY = "top" } = props;
  const { isAdminDisplay } = useAdmin();
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadingState(true);
  }, []);

  if (isAdminDisplay) {
    return (
      <div className="w-full h-full relative" ref={containerRef}>
        <div
          className={`absolute left-2 pointer-events-auto ${changeButtonSideY === "top" ? "top-2" : "bottom-2"}`}
        >
          <AddImageButton onImage={onChange} imageId={imageProps.id}>
            <ArrowDownUp className="hover:stroke-primary" />
          </AddImageButton>
        </div>
        {onRemove && (
          <div className="absolute right-2 top-2">
            <button onClick={onRemove} className="cursor-pointer" type="button">
              <X className="hover:stroke-primary" />
            </button>
          </div>
        )}
        {
          <img
            height={props.height}
            width={props.width}
            ref={imgRef}
            src={props.imageProps.source}
            alt={imageProps.alt ?? undefined}
            className="w-full h-full object-cover pointer-events-none"
            onLoad={() => setLoadingState(false)}
          />
        }
      </div>
    );
  } else {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="relative flex items-center justify-center w-full h-full"
            ref={containerRef}
          >
            <img
              height={props.height}
              width={props.width}
              ref={imgRef}
              src={props.imageProps.source}
              alt={imageProps.alt ?? ""}
              className="w-full h-full object-cover pointer-events-none"
              onLoad={() => setLoadingState(false)}
            />

            {loadingState && <Skeleton className="absolute inset-0 z-9" />}
          </div>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none p-0 flex items-center justify-center min-w-0 min-h-0 h-min w-min">
          <DialogTitle className="hidden">Une image du groupe Desinvolts</DialogTitle>

          <img
            src={props.imageProps.source}
            alt={imageProps.alt ?? ""}
            className="max-w-[70vw] max-h-[70vh] object-cover"
          />
        </DialogContent>
      </Dialog>
    );
  }
}
