import { createContext, useContext } from "react";
import useWindowManager from "@/hooks/useWindowManager";
import { useWindows } from "@/providers/windowsProvider";
import type { WindowProps } from "@/types/db";
import type { Bounds } from "@/types/window";
import Window from "./window";

export type WindowManagerProps = {
  setWindows: (windows: WindowProps[]) => void;
  colnumber?: number;
  rowSize?: number;
  showDots?: boolean;
  zIndexPriorityFactor?: number;
};

interface WindowManagerData {
  containerBounds: Bounds & { top: number; left: number };
  rowSize: number;
  columnSize: number;
  isReady: boolean;
}

const WindowsManagerContext = createContext<WindowManagerData | undefined>(undefined);

export default function WindowsManager(props: WindowManagerProps) {
  const { colnumber, rowSize = 1, zIndexPriorityFactor = 0 } = props;
  const { windows } = useWindows();
  const { containerRef, containerBounds, canvasRef } = useWindowManager(props);

  return (
    <WindowsManagerContext.Provider
      value={{
        isReady: !!containerBounds,
        rowSize: rowSize,
        columnSize: containerBounds && colnumber ? containerBounds.width / colnumber : 1,
        containerBounds: containerBounds ?? {
          x: 0,
          y: 0,
          width: 500,
          height: 500,
          top: 0,
          left: 0,
        },
      }}
    >
      <div className="flex-1 w-full h-full relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full min-h-full" ref={containerRef}>
            <canvas className="absolute inset-0" ref={canvasRef} />
            {windows.map((window) => (
              <Window key={window.id} {...window} zIndexPriorityFactor={zIndexPriorityFactor} />
            ))}
          </div>
        </div>
      </div>
    </WindowsManagerContext.Provider>
  );
}

export function useWindowMangagerContext() {
  const context = useContext(WindowsManagerContext);

  if (!context) throw new Error("useWindows must be called inside its provider !");

  return context;
}
