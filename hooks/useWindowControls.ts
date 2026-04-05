/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Intentional*/
import { useWindowMangagerContext } from "@/components/windows/windowsManager";
import { MIN_WINDOW_SIZE } from "@/config/constants";
import { useAdmin } from "@/providers/adminProvider";
import { useMouse } from "@/providers/mouseProvider";
import { useWindows } from "@/providers/windowsProvider";
import { WindowProps } from "@/types/db";
import { Bounds } from "@/types/window";
import { useEffect, useMemo, useRef, useState } from "react";

export default function useWindowControls(props: WindowProps) {
  const { x, y, width, height, id } = props;

  const { isAdminDisplay } = useAdmin();

  const { isDown, position } = useMouse();
  const { windows, setWindows, bringToFront } = useWindows();

  const windowRef = useRef<HTMLDivElement | null>(null);

  const { columnSize, rowSize, containerBounds, isReady } = useWindowMangagerContext();

  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const limits = useMemo(
    () => ({
      top: 0,
      bottom: containerBounds.height,
      left: 0,
      right: containerBounds.width,
    }),
    [containerBounds]
  );

  const limitsTranslation = (newBounds: Bounds): Bounds => {
    let { x, y, width, height } = newBounds;

    if (!columnSize || !rowSize) return { x, y, width, height };

    if (limits.left !== undefined) x = Math.max(x, limits.left / columnSize);
    if (limits.top !== undefined) y = Math.max(y, limits.top / rowSize);

    if (limits.right !== undefined) x = Math.min(x, limits.right / columnSize - width);

    if (limits.bottom !== undefined) y = Math.min(y, limits.bottom / rowSize - height);

    return { x, y, width, height };
  };

  const limitsResize = (newBounds: Bounds): Bounds => {
    let { x, y, width, height } = newBounds;

    if (!columnSize || !rowSize || !isReady) return { x, y, width, height };

    if (limits.right !== undefined) width = Math.min(width, limits.right / columnSize - x);

    if (limits.bottom !== undefined) height = Math.min(height, limits.bottom / rowSize - y);

    width = Math.max(width, MIN_WINDOW_SIZE);
    height = Math.max(height, MIN_WINDOW_SIZE);

    return { x, y, width, height };
  };

  const [localBounds, setLocalBounds] = useState<Bounds>({ x: 0, y: 0, height: 0, width: 0 });

  // const bringToFront = () => {
  //   setWindows(
  //     windows.map((w) => {
  //       if (w.id === props.id) {
  //         const maxZ = Math.max(...windows.map((w) => w.zIndex));
  //         return { ...w, zIndex: maxZ + 1 };
  //       }
  //       return w;
  //     }),
  //   );
  // };

  const handleMouseDownForDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isAdminDisplay) return;
    const interactiveTags = ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"];
    const target = e.target as HTMLElement;
    if (interactiveTags.includes(target.tagName)) return;

    setIsDragging(true);
    windowRef.current?.classList.add("window-shadow");

    setMouseOffset({
      x: position.x - localBounds.x * columnSize,
      y: position.y - localBounds.y * rowSize,
    });

    bringToFront(id);
  };

  const handleMouseDownForResize = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
    tryToResize();
    bringToFront(id);
    e.stopPropagation();
  };

  const roundToInterval = (value: number, interval: number): number =>
    Math.round(value / interval) * interval;

  const tryToTranslate = () => {
    if (!isDragging) return;

    const newXpx = roundToInterval(position.x - mouseOffset.x, columnSize);
    const newYpx = roundToInterval(position.y - mouseOffset.y, rowSize);

    const widthPx = localBounds.width * columnSize;
    const heightPx = localBounds.height * rowSize;

    const constrainedXpx = Math.max(limits.left, Math.min(newXpx, limits.right - widthPx));
    const constrainedYpx = Math.max(limits.top, Math.min(newYpx, limits.bottom - heightPx));

    const newX = constrainedXpx / columnSize;
    const newY = constrainedYpx / rowSize;

    setLocalBounds(
      (prev) =>
        ({
          ...prev,
          x: newX,
          y: newY,
        }) as Bounds
    );
  };

  const tryToResize = () => {
    if (!isResizing) return;

    const posBaseX = position.x - containerBounds.left;
    const posBaseY = position.y - containerBounds.top;

    const originXpx = localBounds.x * columnSize;
    const originYpx = localBounds.y * rowSize;

    const rawWidthPx = Math.max(
      roundToInterval(posBaseX - originXpx + 20, columnSize),
      MIN_WINDOW_SIZE
    );

    const rawHeightPx = Math.max(
      roundToInterval(posBaseY - originYpx + 20, rowSize),
      MIN_WINDOW_SIZE
    );

    const maxWidthPx = limits.right - originXpx;
    const maxHeightPx = limits.bottom - originYpx;

    const newWidthPx = Math.min(rawWidthPx, maxWidthPx);
    const newHeightPx = Math.min(rawHeightPx, maxHeightPx);

    const newWidth = newWidthPx / columnSize;
    const newHeight = newHeightPx / rowSize;

    setLocalBounds(
      (prev) =>
        ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }) as Bounds
    );
  };

  useEffect(() => {
    tryToTranslate();
    tryToResize();
  }, [position, isDragging, isResizing]);

  useEffect(() => {
    setLocalBounds(limitsTranslation(limitsResize({ x, y, width, height })));
  }, [limits, x, y, width, height]);

  useEffect(() => {
    if (!windowRef.current) return;

    windowRef.current.style.width = `${localBounds.width * columnSize}px`;
    windowRef.current.style.height = `${localBounds.height * rowSize}px`;
    windowRef.current.style.transform = `translate(${localBounds.x * columnSize}px, ${localBounds.y * rowSize}px)`;
  }, [localBounds]);

  useEffect(() => {
    if (!isDown && (isDragging || isResizing)) {
      setIsDragging(false);
      setIsResizing(false);
      windowRef.current?.classList.remove("window-shadow");
      setMouseOffset({ x: 0, y: 0 });
      setWindows(
        windows.map((w) => {
          if (w.id === props.id) {
            return { ...w, ...localBounds };
          }
          return w;
        })
      );
    }
  }, [isDown]);

  useEffect(() => {
    setWindows(
      windows.map((w) => {
        if (w.id === props.id) {
          const bounds = limitsTranslation(
            limitsResize({
              x: x,
              y: y,
              width: width,
              height: height,
            })
          );
          return { ...w, ...localBounds };
        }
        return w;
      })
    );
  }, [columnSize, rowSize]);

  return {
    handleMouseDownForDrag,
    handleMouseDownForResize,
    windowRef,
    localBounds,
    columnSize,
    rowSize,
  };
}
