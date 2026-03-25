import { useAdmin } from "@/providers/adminProvider";
import { useWindows } from "@/providers/windowsProvider";
import { Play, X } from "lucide-react";
import { useMemo } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Video } from "@/prisma/generated/prisma/browser";

export default function VideoWindow({ video }: { video: Video }) {
  const { isAdmin } = useAdmin();
  const { windows, setWindows } = useWindows();

  const getVideoID = (url: string | null): string | null => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const videoId = useMemo(() => getVideoID(video.url), [video.url]);

  const handleClose = () => {
    setWindows(windows.filter((window) => window.id !== video.id));
  };

  if (videoId) {
    return (
      <Dialog>
        <div className="w-full h-full">
          <img
            src={getVideoThumbnail(videoId)}
            className="w-full h-full object-cover pointer-events-none"
          />
          {isAdmin && (
            <div className="absolute right-2 top-2 flex gap-2 z-50">
              <button
                type="button"
                className="cursor-pointer rounded-full aspect-square"
                onClick={handleClose}
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
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Play className="fill-foreground " size={64} />
              </button>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent className="overflow-hidden max-w-[60vw] max-h-[70vh] bg-transparent border-transparent p-0 flex items-center justify-center">
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
