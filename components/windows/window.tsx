import { MoveDiagonal2 } from "lucide-react";
import useWindowControls from "@/hooks/useWindowControls";
import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import type { WindowProps } from "@/types/db";

export default function Window(props: WindowProps) {
  const { isAdminDisplay } = useAdmin();
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
        isAdminDisplay && "cursor-move"
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
        {isAdminDisplay && (
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
