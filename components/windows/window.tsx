import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { MoveDiagonal2 } from "lucide-react";
import useWindowControls from "@/hooks/useWindowControls";
import { WindowProps } from "@/types/db";
import { useEffect, useMemo } from "react";

export default function Window(props: WindowProps) {
  const { isAdmin } = useAdmin();
  const { zIndex, zIndexPriorityFactor, children } = props;
  const {
    handleMouseDownForDrag,
    handleMouseDownForResize,
    localBounds,
    windowRef,
    columnSize,
    rowSize,
  } = useWindowControls(props);
  const { windows } = useWindows();

  return (
    <div
      className={`absolute ${
        isAdmin && "cursor-move"
      } bg-background pointer-events-auto rounded-md overflow-hidden`}
      onMouseDown={handleMouseDownForDrag}
      ref={windowRef}
      style={{
        zIndex: `${zIndex + windows.length * (zIndexPriorityFactor ?? 0) * 10}`,
        width: `${localBounds.width * columnSize}px`,
        height: `${localBounds.height * rowSize}px`,
        transform: `translate(${localBounds.x * columnSize}px, ${localBounds.y * rowSize}px)`,
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0">{children}</div>
        {isAdmin && (
          <div
            className="absolute cursor-nwse-resize absolute right-2 bottom-2 flex gap-2 border"
            onMouseDown={handleMouseDownForResize}
          >
            <MoveDiagonal2 />
          </div>
        )}
      </div>
    </div>
  );
}
