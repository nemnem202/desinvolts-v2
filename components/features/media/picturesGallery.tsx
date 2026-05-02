import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import EditableText from "@/components/common/editableText";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog } from "@/components/ui/dialog";
import PLAHECOLDERS from "@/config/placeholders";
import type { Image } from "@/prisma/generated/prisma/browser";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { useWindows } from "@/providers/windowsProvider";
import { MediasPageContext } from "@/types/contexts";
import PicturesContainer from "./picturesContainter";
import VideoWindowForm from "./videoWindowForm";
import { AddImageDialogContent } from "../image-editor/addImageButton";

export default function PicturesGallery() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;
  const { isAdminDisplay } = useAdmin();
  const [showDots, setShowDots] = useState(true);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const addImageTriggerRef = useRef<() => void>(() => {});
  return (
    <>
      <EditableText
        className="title text-left w-full"
        content={state.pictures_section_title}
        setContent={(newContent) => update("pictures_section_title", newContent)}
        as={"h2"}
      />
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full">
          <PicturesContainer showDots={showDots}>
            {isAdminDisplay && (
              <>
                <VideoWindowForm setOpen={setVideoDialogOpen} isOpen={videoDialogOpen} />
                <AddImageDialog triggerRef={addImageTriggerRef} />
              </>
            )}
          </PicturesContainer>
        </ContextMenuTrigger>
        {isAdminDisplay && (
          <ContextMenuContent className="w-52 overflow-hidden">
            <ContextMenuItem inset onClick={() => setShowDots(!showDots)}>
              {showDots ? "Masquer le cadrillage" : "Afficher le cadrillage"}
            </ContextMenuItem>

            <ContextMenuSub>
              <ContextMenuSubTrigger inset>Ajouter</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem inset onClick={() => addImageTriggerRef.current()}>
                  Image
                </ContextMenuItem>
                <ContextMenuItem inset onClick={() => setVideoDialogOpen(true)}>
                  Vidéo
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
          </ContextMenuContent>
        )}
      </ContextMenu>
    </>
  );
}

function AddImageDialog({ triggerRef }: { triggerRef: React.RefObject<() => void> }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addWindow } = useWindows();

  useEffect(() => {
    triggerRef.current = () => {
      setDialogOpen(true);
    };
  }, [triggerRef]);

  const onImage = (image: Image) => {
    addWindow({
      ...PLAHECOLDERS.defaultWindow,
      image,
    });
  };
  return (
    <>
      {createPortal(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AddImageDialogContent onImage={onImage} setOpen={setDialogOpen} />
        </Dialog>,
        document.body
      )}
    </>
  );
}
