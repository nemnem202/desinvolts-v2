import { MusicUrlForm } from "@/components/features/album/musicUrlForm";
import { albumUrlSchema } from "@/config/frontendFormSchemas";
import { convertUrlToIframeurl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type UrlFormValue = z.infer<typeof albumUrlSchema>;

export function useAlbumUrlForm({ currentTag, album, updateAlbum, setDialogOpen }: MusicUrlForm) {
  const form = useForm({
    resolver: zodResolver(albumUrlSchema) as Resolver<UrlFormValue>,
  });

  const [formValue, setFormValue] = useState<string | null>(null);
  const onSubmit = async (value: { url: string }) => {
    if (!currentTag) return;

    const iframe = convertUrlToIframeurl(value.url, currentTag);

    let newUrl: string | null = iframe ?? value.url;

    if (newUrl) {
      const urlUpdates = {
        spotifyUrl:
          currentTag === album.spotifyUrl?.text
            ? { ...album.spotifyUrl, link: newUrl }
            : album.spotifyUrl,
        appleMusicUrl:
          currentTag === album.appleMusicUrl?.text
            ? { ...album.appleMusicUrl, link: newUrl }
            : album.appleMusicUrl,
        deezerUrl:
          currentTag === album.deezerUrl?.text
            ? { ...album.deezerUrl, link: newUrl }
            : album.deezerUrl,
      };

      updateAlbum(urlUpdates);
      setDialogOpen(false);
    }
  };

  const handleUrlChange = (e: string) => {
    if (!currentTag) return;
    const url = convertUrlToIframeurl(e, currentTag);
    if (url) {
      setFormValue(url);
    } else {
      setFormValue(e);
    }
  };

  return { form, formValue, onSubmit, handleUrlChange };
}
