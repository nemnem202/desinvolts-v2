import AdminProvider from "@/providers/adminProvider";
import "../styleSheets/Layout.css";
import "../styleSheets/tailwind.css";
import "../styleSheets/typography.css";

import type React from "react";
import { useData } from "vike-react/useData";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import DevToolsWindow from "@/components/windows/devToolsWindow";
import MouseProvider, { useMouse } from "@/providers/mouseProvider";
import ScreenSizeProvider from "@/providers/screenSizeProvider";
import StateProvider from "@/providers/stateProvider";
import { contexts, type PageKey } from "@/types/contexts";
import type { Data } from "./+data";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pageKey, page, currentUser } = useData<Data>();
  const stateContext = contexts[pageKey];

  if (!page) return <Spinner />;

  return (
    <StateProvider
      // @ts-expect-error
      context={stateContext}
      initialState={page}
      pageKey={pageKey}
      key={pageKey}
    >
      <ScreenSizeProvider>
        <AdminProvider currentUser={currentUser}>
          <MouseProvider>
            <Toaster />
            <Content pageKey={pageKey}>{children}</Content>
          </MouseProvider>
        </AdminProvider>
      </ScreenSizeProvider>
    </StateProvider>
  );
}

function Content<K extends PageKey>({
  children,
  pageKey,
}: {
  children: React.ReactNode;
  pageKey: K;
}) {
  const { setIsDown, setPosition } = useMouse();
  const { currentUser } = useData<Data>();
  return (
    <div
      id="page-container"
      className="min-h-screen w-screen relative"
      onMouseDownCapture={() => setIsDown(true)}
      onMouseUpCapture={() => setIsDown(false)}
      onMouseMoveCapture={(e) => setPosition(e.clientX, e.clientY)}
    >
      {currentUser && <DevToolsWindow pageKey={pageKey} />}
      <Header pageKey={pageKey} />
      <div id="page-content" className="min-h-screen w-screen">
        {children}
      </div>
    </div>
  );
}
