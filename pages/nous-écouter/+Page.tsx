import ClassicPageLayout from "@/components/layout/classicPageLayout";
import ButtonPlus from "@/components/ui/buttonPlus";
import { Dialog } from "@/components/ui/dialog";
import EditableText from "@/components/common/editableText";
import { useAdmin } from "@/providers/adminProvider";
import { usePageState } from "@/providers/stateProvider";
import { SonPageContext } from "@/types/contexts";
import { useState } from "react";
import AlbumSection from "@/components/features/album/albumSection";
import AlbumForm from "@/components/features/album/albumForm";

export default function Page() {
  const { pageContext, update } = usePageState(SonPageContext);
  const { state } = pageContext;
  const [dialogOpen, setOpen] = useState<boolean>(false);
  const { isAdmin } = useAdmin();
  return (
    <>
      <ClassicPageLayout>
        <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center max-w-[40rem] w-full">
          <EditableText
            as={"h1"}
            content={state.title}
            setContent={(newContent) => update("title", newContent)}
            className="headline w-full text-center shrink-0"
          />
        </section>
        {state.albums.map((album) => (
          <AlbumSection
            album={album}
            albums={state.albums}
            setAlbums={(newAlbums) => update("albums", newAlbums)}
          />
        ))}

        {isAdmin && <ButtonPlus onClick={() => setOpen(true)} />}
      </ClassicPageLayout>
      {isAdmin && (
        <Dialog open={dialogOpen} onOpenChange={setOpen}>
          <AlbumForm setOpen={setOpen} />
        </Dialog>
      )}
    </>
  );
}
