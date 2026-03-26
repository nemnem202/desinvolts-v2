import { logger } from "@/lib/logger";
import { StateProviderProps } from "@/providers/stateProvider";
import { PageKey, PageRegistry } from "@/types/contexts";
import { BasePageContent } from "@/types/page-contents";
import { useHistoryState } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";

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
    [undo, redo],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    logger.info("Init state: ", props.initialState);
  }, []);

  return { state, set, undo, redo, canUndo, canRedo, pageKey };
}
