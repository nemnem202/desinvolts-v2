import { logger } from "@/lib/logger";
import { handleStateChange } from "@/pages/handleStateChange.telefunc";
import { StateProviderProps } from "@/providers/stateProvider";
import { BasePageContent } from "@/types/page-contents";
import { useHistoryState } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";

export default function useStateProvider<S extends BasePageContent>(props: StateProviderProps<S>) {
  const { initialState, updatePath } = props;
  const { state, set, undo, redo, canUndo, canRedo } = useHistoryState<S>(initialState);

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

  return { state, set, undo, redo, canUndo, canRedo, updatePath };
}
