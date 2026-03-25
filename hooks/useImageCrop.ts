import {
  CANVAS_WIDTH,
  RESIZE_HANDLE_SIZE,
} from "@/components/features/image-editor/addImageButton";
import { ImageCropperProps } from "@/components/features/image-editor/imageCropper";
import { useMouse } from "@/providers/mouseProvider";
import { useEffect, useRef, useState } from "react";

export default function useImageCrop(props: ImageCropperProps) {
  const { imageSrc, squareArea, setSquare } = props;
  const { isDown, position } = useMouse();
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [mouseState, setMouseState] = useState<"resizing" | "moving" | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasInitialized = useRef(false);
  const [cursorRelativePosition, setCursorPosition] = useState<{ x: number; y: number } | null>(
    null,
  );

  const handleImageLoad = () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    if (!imageRef.current || !overlayCanvasRef.current) return;
    overlayCanvasRef.current.height =
      imageRef.current.naturalHeight * (CANVAS_WIDTH / imageRef.current.naturalWidth);
    setSquare({ x: 0, y: 0, width: CANVAS_WIDTH, height: overlayCanvasRef.current.height });
  };

  const drawRect = () => {
    if (!overlayCanvasRef.current) return;
    const ctx = overlayCanvasRef.current.getContext("2d");
    if (!ctx) return;
    const { x, y, height, width } = squareArea;
    ctx.reset();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, overlayCanvasRef.current.width, y);
    ctx.fillRect(
      0,
      y + height,
      overlayCanvasRef.current.width,
      overlayCanvasRef.current.height - (y + height),
    );
    ctx.fillRect(0, y, x, height);
    ctx.fillRect(x + width, y, overlayCanvasRef.current.width - (x + width), height);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
  };

  const cursorIsInResizeHandle = (x: number, y: number): boolean => {
    const cornerX = squareArea.x + squareArea.width;
    const cornerY = squareArea.y + squareArea.height;
    return (
      x > cornerX - RESIZE_HANDLE_SIZE &&
      x < cornerX + RESIZE_HANDLE_SIZE &&
      y > cornerY - RESIZE_HANDLE_SIZE &&
      y < cornerY + RESIZE_HANDLE_SIZE
    );
  };

  const cursorIsInMoveHandle = (x: number, y: number): boolean => {
    return (
      x > squareArea.x &&
      x < squareArea.x + squareArea.width &&
      y > squareArea.y &&
      y < squareArea.y + squareArea.height
    );
  };

  const updateMouseMove = (x: number, y: number) => {
    if (!overlayCanvasRef.current) return;

    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    x = x - rect.left;
    y = y - rect.top;

    setCursorPosition({ x, y });
  };

  const updateMouseState = (x: number, y: number) => {
    if (cursorIsInResizeHandle(x, y)) {
      if (isDown && !mouseState) {
        setMouseState("resizing");
        setMouseOffset({
          x: x - (squareArea.x + squareArea.width),
          y: y - (squareArea.y + squareArea.height),
        });
      }
      document.body.style.cursor = "nwse-resize";
      return;
    } else if (cursorIsInMoveHandle(x, y)) {
      if (isDown && !mouseState) {
        setMouseState("moving");
        setMouseOffset({ x: x - squareArea.x, y: y - squareArea.y });
      }
      document.body.style.cursor = "move";
      return;
    } else if (!isDown) {
      document.body.style.cursor = "default";
      setMouseState(null);
    }
  };

  const updateSquare = (x: number, y: number) => {
    if (!overlayCanvasRef.current) return;
    if (mouseState === "resizing") {
      let width: number = x - squareArea.x - mouseOffset.x;
      let height: number = y - squareArea.y - mouseOffset.y;

      if (squareArea.x + width > overlayCanvasRef.current.width)
        width = overlayCanvasRef.current.width - squareArea.x;

      if (squareArea.y + height > overlayCanvasRef.current.height)
        height = overlayCanvasRef.current.height - squareArea.y;

      setSquare((prev) => ({
        ...prev,
        width: width,
        height: height,
      }));
    } else if (mouseState === "moving") {
      let nextX = Math.max(x - mouseOffset.x, 0);
      let nextY = Math.max(y - mouseOffset.y, 0);

      if (nextX + squareArea.width > overlayCanvasRef.current.width)
        nextX = overlayCanvasRef.current.width - squareArea.width;

      if (nextY + squareArea.height > overlayCanvasRef.current.height)
        nextY = overlayCanvasRef.current.height - squareArea.height;

      setSquare((prev) => ({
        ...prev,
        x: nextX,
        y: nextY,
      }));
    }
  };

  useEffect(() => {
    drawRect();
  }, [squareArea]);

  useEffect(() => {
    if (!isDown && mouseState) {
      setMouseState(null);
    }
  }, [isDown]);

  useEffect(() => updateMouseMove(position.x, position.y), [position]);

  useEffect(() => {
    if (!cursorRelativePosition) return;
    updateMouseState(cursorRelativePosition.x, cursorRelativePosition.y);
    updateSquare(cursorRelativePosition.x, cursorRelativePosition.y);
    drawRect();
  }, [cursorRelativePosition, mouseState]);

  return { handleImageLoad, overlayCanvasRef, imageRef, imageSrc };
}
