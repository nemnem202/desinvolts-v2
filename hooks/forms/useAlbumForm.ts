import { AlbumFormProps } from "@/components/features/album/albumForm";
import { albumSchema } from "@/config/frontendFormSchemas";
import { convertStringToParagraphGroup, convertUrlToIframeurl } from "@/lib/utils";
import { usePageState } from "@/providers/stateProvider";
import { SonPageContext } from "@/types/contexts";
import { Album } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { Resolver, useForm } from "react-hook-form";
import z from "zod";

type AddAlbumFormValues = z.infer<typeof albumSchema>;

export function useAlbumForm({ setOpen }: AlbumFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { pageContext, update } = usePageState(SonPageContext);

  const form = useForm<AddAlbumFormValues>({
    resolver: zodResolver(albumSchema) as Resolver<AddAlbumFormValues>,
  });

  const onSubmit = (values: AddAlbumFormValues) => {
    const { appleMusicUrl, deezerUrl, spotifyUrl, description, title, cover } = values;
    const appleMusicIframeUrl = appleMusicUrl
      ? (convertUrlToIframeurl(appleMusicUrl, "applemusic") ?? undefined)
      : undefined;
    const deezerIframeUrl = deezerUrl
      ? (convertUrlToIframeurl(deezerUrl, "deezer") ?? undefined)
      : undefined;
    const spotifyIframeUrl = spotifyUrl
      ? (convertUrlToIframeurl(spotifyUrl, "spotify") ?? undefined)
      : undefined;

    const album: Album = {
      id: getRandomId(),
      title: {
        content: title,
        id: getRandomId(),

        hyperlinks: [],
      },
      paragraphs: convertStringToParagraphGroup(description),
      cover: cover ?? {
        alt: "La cover d'un album du groupe",
        id: getRandomId(),
        label: "",
        source: "assets/placeholder",
      },
      appleMusicUrl: appleMusicIframeUrl
        ? {
            text: "applemusic",
            link: appleMusicIframeUrl,
            id: getRandomId(),
            position: 0,
          }
        : null,
      deezerUrl: deezerIframeUrl
        ? {
            text: "deezer",
            link: deezerIframeUrl,
            id: getRandomId(),
            position: 1,
          }
        : null,
      spotifyUrl: spotifyIframeUrl
        ? {
            text: "spotify",
            link: spotifyIframeUrl,
            id: getRandomId(),
            position: 2,
          }
        : null,
    };

    update("albums", [...pageContext.state.albums, album]);
    setOpen(false);
    form.reset();
  };

  return { formRef, form, onSubmit };
}
