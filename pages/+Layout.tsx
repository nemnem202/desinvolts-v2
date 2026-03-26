import AdminProvider from "@/providers/adminProvider";
import "../styleSheets/Layout.css";
import "../styleSheets/tailwind.css";
import "../styleSheets/typography.css";

import Header from "@/components/layout/header";
import MouseProvider, { useMouse } from "@/providers/mouseProvider";
import React, { Context } from "react";
import ScreenSizeProvider from "@/providers/screenSizeProvider";
import StateProvider, { StateContent } from "@/providers/stateProvider";
import { Toaster } from "@/components/ui/sonner";
import { BasePageContent } from "@/types/page-contents";
import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Spinner } from "@/components/ui/spinner";
import { contexts, PageKey } from "@/types/contexts";
import DevToolsWindow from "@/components/windows/devToolsWindow";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pageKey, page, currentUser } = useData<Data>();
  const stateContext = contexts[pageKey];

  if (!page) return <Spinner />;

  return (
    <StateProvider
      // @ts-ignore
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
