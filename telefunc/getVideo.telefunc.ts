import { logger } from "@/lib/logger";
import type { VideoData } from "@/types/db";

export default async function getVideoData(url: string): Promise<VideoData | null> {
  try {
    const parsedRequest = `https://youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(parsedRequest);

    if (!res.ok) throw new Error();
    const data = (await res.json()) as VideoData;
    return data;
  } catch (err) {
    logger.error("Get video data failed", err);
    return null;
  }
}
