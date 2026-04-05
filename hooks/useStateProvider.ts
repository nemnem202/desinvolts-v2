import { useHistoryState } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";
import { logger } from "@/lib/logger";
import type { StateProviderProps } from "@/providers/stateProvider";
import type { PageKey, PageRegistry } from "@/types/contexts";

export default function useStateProvider<K extends PageKey>(props: StateProviderProps<K>) {
  const { initialState, pageKey } = props;
  const { state, set, undo, redo, canUndo, canRedo } =
    useHistoryState<PageRegistry[K]>(initialState);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!e.key) return;
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;

      if (!ctrl) return;

      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      if (key === "y" || (key === "z" && e.shiftKey)) {
        e.preventDefault();
        redo();
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    logger.info("Init state: ", props.initialState);
  }, [props.initialState]);

  return { state, set, undo, redo, canUndo, canRedo, pageKey };
}
