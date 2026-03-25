import { Dispatch, SetStateAction } from "react";
import { Bounds } from "@/types/window";
import useImageCrop from "@/hooks/useImageCrop";
import { CANVAS_WIDTH } from "./addImageButton";

export interface ImageCropperProps {
  imageSrc: string;
  squareArea: Bounds;
  setSquare: Dispatch<SetStateAction<Bounds>>;
}

export default function ImageCropper(props: ImageCropperProps) {
  const { handleImageLoad, overlayCanvasRef, imageRef, imageSrc } = useImageCrop(props);
  return (
    <>
      <div className="relative w-[300px]">
        <canvas ref={overlayCanvasRef} className="absolute top-0 left-0" width={CANVAS_WIDTH} />
        <img src={imageSrc} alt="" onLoad={handleImageLoad} ref={imageRef} className="w-full" />
      </div>
    </>
  );
}
