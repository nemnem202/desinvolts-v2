import EditableText from "@/components/common/editableText";
import Video from "@/components/common/video";
import { usePageState } from "@/providers/stateProvider";
import { MediasPageContext } from "@/types/contexts";
import VideoGalleryForm from "./videoGalleryForm";

export default function VideoGallery() {
  const { pageContext, update } = usePageState(MediasPageContext);
  const { state } = pageContext;
  return (
    <>
      <EditableText
        className="title text-left w-full"
        content={state.video_section_title}
        setContent={(newContent) => update("video_section_title", newContent)}
        as={"h2"}
      />
      <div className="grid grid-cols-2 md:flex md:flex-wrap w-full min-h-[10rem] gap-3">
        {state.videos.map((video, index) => (
          <div className="w-full md:w-[15rem] aspect-video rounded-md overflow-hidden" key={index}>
            <Video
              url={video.url ?? undefined}
              onClose={() =>
                update(
                  "videos",
                  state.videos.filter((v) => v.id !== video.id)
                )
              }
            />
          </div>
        ))}
        <VideoGalleryForm onVideo={(video) => update("videos", [...state.videos, video])} />
      </div>
    </>
  );
}
