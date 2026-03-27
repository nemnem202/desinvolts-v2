import { Context, useContext } from "react";
import { BasePageContent } from "@/types/page-contents";
import useStateProvider from "@/hooks/useStateProvider";
import { PageKey, PageRegistry, PageStateKey } from "@/types/contexts";

export type StateContent<K extends PageKey> = {
  state: PageRegistry[K];
  pageKey: K;
  set: (newPresent: PageRegistry[K]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};
export interface StateProviderProps<K extends PageKey> {
  children: React.ReactNode;
  context: Context<StateContent<K> | null>;
  initialState: PageRegistry[K];
  pageKey: K;
}

export default function StateProvider<K extends PageKey>(props: StateProviderProps<K>) {
  const { children, context, pageKey } = props;

  const { state, set, undo, redo, canUndo, canRedo } = useStateProvider(props);

  return (
    <context.Provider value={{ state, set, undo, redo, canUndo, canRedo, pageKey }}>
      {children}
    </context.Provider>
  );
}

export function usePageState<K extends PageKey>(context: Context<StateContent<K> | null>) {
  const pageContext = useContext(context);

  if (!pageContext) {
    throw new Error("usePageState must be used within its Provider");
  }

  const update = <Key extends keyof PageRegistry[K]>(key: Key, value: PageRegistry[K][Key]) => {
    pageContext.set({ ...pageContext.state, [key]: value });
  };

  return { pageContext, update };
}
