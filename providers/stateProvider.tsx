import { Context, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistoryState } from "@uidotdev/usehooks";
import { BasePageContent } from "@/types/page-contents";
import ApiHandler from "../lib/apiHandler";
import { handleStateChange } from "@/pages/handleStateChange.telefunc";
import useStateProvider from "@/hooks/useStateProvider";
import { logger } from "@/lib/logger";

export type StateContent<S> = {
  state: S;
  updatePath: string;
  set: (newPresent: S) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

export interface StateProviderProps<S extends BasePageContent> {
  children: React.ReactNode;
  context: Context<StateContent<S> | null>;
  initialState: S;
  updatePath: string;
}

export default function StateProvider<S extends BasePageContent>(props: StateProviderProps<S>) {
  const { children, context } = props;
  const { state, set, undo, redo, canUndo, canRedo } = useStateProvider(props);

  return (
    <context.Provider
      value={{ state, set, undo, redo, canUndo, canRedo, updatePath: props.updatePath }}
    >
      {children}
    </context.Provider>
  );
}

export function usePageState<S extends BasePageContent>(context: Context<StateContent<S> | null>) {
  const pageContext = useContext(context);
  if (!pageContext) {
    throw new Error("usePageState must be used within its Provider");
  }
  const update = <K extends keyof S>(key: K, value: S[K]) => {
    pageContext.set({ ...pageContext.state, [key]: value });
  };
  return { pageContext, update };
}
