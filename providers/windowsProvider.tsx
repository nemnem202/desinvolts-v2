import getRandomId from "@giapspzoo/get-random-id";
import { createContext, type ReactNode, useCallback, useContext, useMemo } from "react";
import ImageWindow from "@/components/windows/imageWindow";
import VideoWindow from "@/components/windows/videoWindow";
import WindowsManager, { type WindowManagerProps } from "@/components/windows/windowsManager";
import type { WindowProps } from "@/types/db";

interface WindowsContextValue {
  windows: WindowProps[];
  setWindows: (windows: WindowProps[]) => void;
  addWindow: (window: WindowProps) => void;
  removeWindow: (id: number) => void;
  bringToFront: (id: number) => void;
}
const WindowsContext = createContext<WindowsContextValue | undefined>(undefined);

export default function WindowsProvider({
  windows = [],
  managerProps,
  children,
}: {
  windows?: WindowProps[];
  managerProps: WindowManagerProps;
  children?: ReactNode;
}) {
  const createChildrenFromEnum = useCallback((props: WindowProps): ReactNode => {
    if (props.image) return <ImageWindow image={props.image} window={props} />;
    if (props.video) return <VideoWindow video={props.video} />;
  }, []);

  const createSingleWindow = (window: WindowProps, newZIndex: number): WindowProps => {
    return {
      ...window,
      id: getRandomId(),
      zIndex: newZIndex,
      children: createChildrenFromEnum(window),
    };
  };

  const _createMultipleWindows = (windows: WindowProps[]): WindowProps[] => {
    return windows.map((window, index) => createSingleWindow(window, index));
  };

  const addWindow = (window: WindowProps) => {
    const sorted = [...windows].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const newWindow = {
      ...window,
      id: getRandomId(),
      zIndex: sorted.length,
    };

    managerProps.setWindows([...windows, { ...newWindow }]);
  };

  const removeWindow = (id: number) => {
    managerProps.setWindows(windows.filter((window) => window.id !== id));
  };

  const bringToFront = (id: number) => {
    console.log("bring to front");
    const sorted = [...windows].sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    const targetIndex = sorted.findIndex((w) => w.id === id);
    if (targetIndex === -1) return;

    const [target] = sorted.splice(targetIndex, 1);

    sorted.push(target);

    const normalizedWindows = sorted.map((w, index) => ({
      ...w,
      zIndex: index,
    }));

    managerProps.setWindows(normalizedWindows);
  };

  const createdWindows = useMemo(
    () =>
      windows.map((window, index) => ({
        ...window,
        zIndex: window.zIndex ?? index,
        children: createChildrenFromEnum(window),
      })),
    [windows, createChildrenFromEnum]
  );

  return (
    <WindowsContext.Provider
      value={{
        windows: createdWindows,
        setWindows: managerProps.setWindows,
        addWindow,
        removeWindow,
        bringToFront,
      }}
    >
      <WindowsManager {...managerProps} />
      {children}
    </WindowsContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowsContext);

  if (!context) throw new Error("useWindows must be called inside its provider !");

  return context;
}
