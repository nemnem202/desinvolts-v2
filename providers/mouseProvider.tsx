import { createContext, type ReactNode, useContext, useState } from "react";

interface MouseContextValue {
  isDown: boolean;
  setIsDown: (value: boolean) => void;
  position: { x: number; y: number };
  setPosition: (x: number, y: number) => void;
}

const MouseContext = createContext<MouseContextValue | undefined>(undefined);

export default function MouseProvider({ children }: { children: ReactNode }) {
  const [isDown, setIsDown] = useState<boolean>(false);
  const [position, setPositionState] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const setPosition = (x: number, y: number) => setPositionState({ x, y });

  return (
    <MouseContext.Provider value={{ isDown, position, setIsDown, setPosition }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse() {
  const context = useContext(MouseContext);

  if (!context) throw new Error("useAdmin must be called inside its provider !");

  return context;
}
