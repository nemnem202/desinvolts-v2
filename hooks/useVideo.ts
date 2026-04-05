import { useCallback, useEffect, useRef, useState } from "react";
import type { VideoProps } from "@/components/common/video";
import { useAdmin } from "@/providers/adminProvider";

export default function useVideo(props: VideoProps) {
  const { url = "https://www.youtube.com/watch?v=xvFZjo5PgG0&list=RDxvFZjo5PgG0&start_radio=1" } =
    props;
  const { isAdminDisplay } = useAdmin();

  const getVideoID = (url: string): string | null => {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const [loadingState, setLoadingState] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const getVideoThumbnail = useCallback((videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }, []);

  const videoId = getVideoID(url);

  useEffect(() => {
    setLoadingState(true);
    if (imgRef.current?.complete) {
      setLoadingState(false);
    }
  }, []);

  return { isAdminDisplay, loadingState, getVideoThumbnail, videoId, setLoadingState, imgRef };
}
