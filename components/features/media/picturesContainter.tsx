import WindowsProvider from "@/providers/windowsProvider";
import { FocusEvent, ReactNode, useState } from "react";
import { useAdmin } from "@/providers/adminProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSize } from "@/providers/screenSizeProvider";
import Image from "@/components/common/image";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import { MediasPageContent } from "@/types/page-contents";
import { FloatingWindow } from "@/prisma/generated/prisma/browser";

export default function PicturesContainer({
  showDots,
  children,
}: {
  showDots: boolean;
  children?: ReactNode;
}) {
  const { pageContext, update } = usePageState<MediasPageContent>(MediasPageContext);
  const { state } = pageContext;
  const { isAdminDisplay } = useAdmin();
  const size = useSize();

  const updateChanges = (e: FocusEvent<HTMLInputElement, Element>) => {
    update("config", {
      ...state.config,
      mediaImagesContainerHeight: parseInt(e.currentTarget.value),
    });
  };

  const getY = (win: FloatingWindow) => win.y ?? -Infinity;
  if (size === "sm") {
    return (
      <div className="grid grid-cols-2 w-full gap-3">
        {state.windows
          .sort((a, b) => getY(b) - getY(a))
          .flatMap((window, index) => {
            if (window.image) {
              return (
                <div className="w-full  aspect-2/3 rounded-md overflow-hidden " key={index}>
                  <Image
                    imageProps={{
                      alt: window.image.alt ? window.image.alt : "",
                      id: window.image.id,
                      source: window.image.source,
                    }}
                    onChange={() => {}}
                  />
                </div>
              );
            }
          })}
      </div>
    );
  } else {
    return (
      <div
        className={`flex flex-col flex-1 items-center w-full relative`}
        style={{ height: `${state.config.mediaImagesContainerHeight}rem` }}
      >
        <WindowsProvider
          windows={state.windows}
          managerProps={{
            setWindows: (windows) => {
              const filteredWindows = windows.map((w) => ({
                ...w,
                children: undefined,
              }));
              update("windows", filteredWindows);
            },
            showDots: showDots,
            colnumber: 100,
            rowSize: 20,
          }}
        >
          {children}
        </WindowsProvider>
        {isAdminDisplay && (
          <div className="absolute right-[-5rem]">
            <Label htmlFor="size" className="subtitle">
              Hauteur
            </Label>
            <Input
              type="number"
              id="size"
              className="subtitle w-[4rem]"
              defaultValue={state.config.mediaImagesContainerHeight}
              // onChange={handleInputChange}
              onBlur={updateChanges}
            />
          </div>
        )}
      </div>
    );
  }
}
