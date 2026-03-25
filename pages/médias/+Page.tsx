import ClassicPageLayout from "@/components/layout/classicPageLayout";
import EditableText from "@/components/common/editableText";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import VideoGallery from "@/components/features/media/videoGallery";
import PicturesGallery from "@/components/features/media/picturesGallery";

export default function Page() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;

  return (
    <ClassicPageLayout>
      <section className="md:py-[2.5rem] flex flex-col gap-[3rem] flex-1 min-h-0 items-center w-full">
        <EditableText
          as={"h1"}
          content={state.title}
          setContent={(newContent) => update("title", newContent)}
          className="headline w-full text-center shrink-0"
        />
      </section>
      <section className="pt-[2.5rem] flex w-full flex-col min-h-0 items-center w-full">
        <VideoGallery />
      </section>
      <section className="pt-[2.5rem] flex w-full flex-col min-h-0 items-center w-full">
        <PicturesGallery />
      </section>
    </ClassicPageLayout>
  );
}
