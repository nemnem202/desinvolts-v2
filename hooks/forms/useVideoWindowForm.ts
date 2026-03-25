import { VideoWindowFormProps } from "@/components/features/media/videoWindowForm";
import { videoSchema } from "@/config/frontendFormSchemas";
import PLAHECOLDERS from "@/config/placeholders";
import { useWindows } from "@/providers/windowsProvider";
import { VideoData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type VideoFormValues = z.infer<typeof videoSchema>;

export function useVideoWindowForm(props: VideoWindowFormProps) {
  const { isOpen, setOpen } = props;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const { addWindow } = useWindows();
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema) as Resolver<VideoFormValues>,
    defaultValues: {},
  });

  const addAVideo = (url: string) => {
    addWindow({
      ...PLAHECOLDERS.defaultWindow,
      video: { description: "Une vidéo du groupe Desinvolts", id: getRandomId(), url },
    });

    setOpen(false);
  };

  const onSubmit = (value: any) => {
    addAVideo(value.url);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url.length === 0) return;
    const res = await fetch(`/youtube-data?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const json = await res.json();
      setVideoData(json);
    }
  };

  return { isOpen, setOpen, videoData, form, onSubmit, handleChange };
}
