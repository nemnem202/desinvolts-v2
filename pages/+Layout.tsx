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
import { contexts } from "@/types/contexts";
import DevToolsWindow from "@/components/windows/devToolsWindow";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { stateKey, page } = useData<Data>();
  const stateContext = contexts[stateKey];

  if (!page) return <Spinner />;

  return (
    <StateProvider<BasePageContent>
      // @ts-ignore
      context={stateContext}
      initialState={page}
      stateKey={stateKey}
      key={stateKey}
    >
      <ScreenSizeProvider>
        <AdminProvider>
          <MouseProvider>
            <Toaster />
            <Content context={stateContext}>{children}</Content>
          </MouseProvider>
        </AdminProvider>
      </ScreenSizeProvider>
    </StateProvider>
  );
}

function Content({
  children,
  context,
}: {
  children: React.ReactNode;
  context: Context<StateContent<any> | null>;
}) {
  const { setIsDown, setPosition } = useMouse();

  //   () => [
  //     {
  //       ...PLAHECOLDERS.defaultWindow,
  //       image: null,
  //       x: 20,
  //       y: 20,
  //       height: 250,
  //       width: 300,
  //     },
  //   ],
  //   [],
  // );

  return (
    <div
      id="page-container"
      className="min-h-screen w-screen relative"
      onMouseDownCapture={() => setIsDown(true)}
      onMouseUpCapture={() => setIsDown(false)}
      onMouseMoveCapture={(e) => setPosition(e.clientX, e.clientY)}
    >
      <DevToolsWindow context={context} />
      <Header context={context} />
      <div id="page-content" className="min-h-screen w-screen">
        {children}
      </div>
    </div>
  );
}
