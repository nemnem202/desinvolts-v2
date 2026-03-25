import { useAdmin } from "@/providers/adminProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import { VideoProps } from "@/components/common/video";

export default function useVideo(props: VideoProps) {
  const {
    url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1",
    onClose = () => {},
  } = props;
  const { isAdmin } = useAdmin();

  const getVideoID = (url: string): string | null => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const getVideoThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  const videoId = useMemo(() => getVideoID(url), [url]);

  useEffect(() => {
    setLoadingState(true);
    if (imgRef.current?.complete) {
      setLoadingState(false);
    }
  }, [videoId]);

  return { isAdmin, loadingState, getVideoThumbnail, videoId, setLoadingState, imgRef };
}
