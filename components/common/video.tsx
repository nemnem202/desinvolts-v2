import { Play, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Spinner } from "../ui/spinner";
import useVideo from "@/hooks/useVideo";

export interface VideoProps {
  url?: string;
  onClose?: () => void;
}

export default function Video(props: VideoProps) {
  const {
    url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
    onClose = () => {},
  } = props;

  const { getVideoThumbnail, isAdminDisplay, loadingState, videoId, setLoadingState, imgRef } =
    useVideo(props);

  if (videoId) {
    return (
      <Dialog>
        <div className="w-full h-full relative">
          <div className="relative flex items-center justify-center w-full h-full">
            {loadingState && (
              <div className="absolute inset-0 flex items-center justify-center z-[-1]">
                <Spinner className="w-[50%] h-auto! aspect-square" />
              </div>
            )}
            <img
              src={getVideoThumbnail(videoId)}
              className="w-full h-full object-cover pointer-events-none"
              ref={imgRef}
              onLoad={() => setLoadingState(false)}
            />
          </div>
          {isAdminDisplay && (
            <div className="absolute right-2 top-2 flex gap-2 z-50">
              <button
                type="button"
                className="cursor-pointer rounded-full aspect-square"
                onClick={onClose}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              >
                <X className="hover:stroke-primary" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <DialogTrigger asChild>
              <button
                className="cursor-pointer opacity-50 hover:opacity-100"
                aria-label="Ouvrir le player youtube de la vidéo"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Play className="fill-foreground " size={64} />
              </button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="overflow-hidden max-w-[90vw] mx-auto md:max-w-[60vw] md:max-h-[70vh]  bg-transparent border-transparent p-0 flex items-center justify-center">
          <DialogTitle className="hidden">Une vidéo youtube du groupe Desinvolts</DialogTitle>
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  } else return null;
}
