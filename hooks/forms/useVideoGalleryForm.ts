import { VideoGalleryProps } from "@/components/features/media/videoGalleryForm";
import { videoSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import getVideoData from "@/telefunc/getVideo.telefunc";
import { VideoData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type VideoFormValues = z.infer<typeof videoSchema>;

export function useVideoGalleyProps({ onVideo }: VideoGalleryProps) {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema) as Resolver<VideoFormValues>,
    defaultValues: {},
  });

  const addAVideo = (url: string) => {
    if (!videoData) return;

    onVideo({
      description: "a video of " + videoData,
      id: getRandomId(),
      url: url,
    });

    setOpen(false);
    form.reset();
    setVideoData(null);
    setOpen(false);
  };

  const onSubmit = (value: { url: string }) => {
    addAVideo(value.url);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url.length === 0) return;
    const data = await getVideoData(url);
    logger.success("Video Data", data);
    setVideoData(data);
  };

  return { form, open, onSubmit, handleChange, setOpen, videoData };
}
