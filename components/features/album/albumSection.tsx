import { ArrowDownUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import EditableText from "@/components/common/editableText";
import Image from "@/components/common/image";
import ParagraphGroup from "@/components/layout/paragraphGroup";
import ButtonMinus from "@/components/ui/buttonMinus";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { useAdmin } from "@/providers/adminProvider";
import type { Album } from "@/types/db";
import AlbumTabsTigger from "./albumTabsTrigger";
import MusicUrlForm from "./musicUrlForm";

export default function AlbumSection({
  album,
  albums,
  setAlbums,
}: {
  album: Album;
  albums: Album[];
  setAlbums: (newAlbums: Album[]) => void;
}) {
  const { isAdminDisplay } = useAdmin();
  const [dialogOpen, setDialogOpen] = useState(false);

  const availableUrls = [album.spotifyUrl, album.appleMusicUrl, album.deezerUrl].filter(
    (url) => url !== null
  );

  const [currentTag, setCurrentTag] = useState<"spotify" | "deezer" | "applemusic">(
    availableUrls[0]?.text.toLowerCase() as "spotify" | "deezer" | "applemusic"
  );

  const reindexAlbums = (albums: Album[]) =>
    albums.map((album, index) => ({
      ...album,
      position: index,
    }));

  const moveAlbum = (albums: Album[], albumId: number, direction: "up" | "down") => {
    const sorted = [...albums].sort((a, b) => a.position - b.position);

    const index = sorted.findIndex((a) => a.id === albumId);

    if (index === -1) return albums;

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    // garde-fous
    if (targetIndex < 0 || targetIndex >= sorted.length) return albums;

    const newAlbums = [...sorted];

    // swap immutable
    [newAlbums[index], newAlbums[targetIndex]] = [newAlbums[targetIndex], newAlbums[index]];

    return reindexAlbums(newAlbums);
  };

  const updateAlbum = (updates: Partial<Album>) => {
    const updated = albums.map((alb) => (alb.id === album.id ? { ...alb, ...updates } : alb));

    setAlbums(updated);
  };

  const removeAlbum = () => {
    const filtered = albums.filter((alb) => alb.id !== album.id);
    setAlbums(reindexAlbums(filtered));
  };

  const moveUp = () => {
    setAlbums(moveAlbum(albums, album.id, "up"));
  };

  const moveDown = () => {
    setAlbums(moveAlbum(albums, album.id, "down"));
  };

  return (
    <section className="pt-[2.5rem] flex flex-col gap-[3rem] min-h-0 items-center relative w-full">
      {isAdminDisplay && (
        <div className="absolute left-[-4rem] flex flex-col gap-2">
          <button type="button" onClick={moveUp} className="cursor-pointer rounded-full">
            <ChevronUp className="hover:stroke-primary" />
          </button>

          <ButtonMinus onClick={removeAlbum} />

          <button type="button" onClick={moveDown} className="cursor-pointer rounded-full">
            <ChevronDown className="hover:stroke-primary" />
          </button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center md:flex-row md:items-start gap-[2rem] w-full">
        <div className="w-[20rem] aspect-square shrink-0 rounded-md overflow-hidden">
          <Image
            width={320}
            height={320}
            imageProps={album.cover}
            onChange={(newImage) => updateAlbum({ cover: newImage })}
          />
        </div>

        <div className="flex flex-col gap-4 items-top w-[60%] max-w-[35rem]">
          <EditableText
            as="h2"
            content={album.title}
            setContent={(newtitle) => updateAlbum({ title: newtitle })}
            className="headline text-center md:text-left shrink-0"
          />
          <div className="flex flex-col gap-3">
            <ParagraphGroup
              as="p"
              content={album.paragraphs}
              onChange={(newParagraphs) => updateAlbum({ paragraphs: newParagraphs })}
              classNameForEachParagraph="text-center md:text-left paragraph"
            />
          </div>
        </div>
      </div>
      <Tabs
        defaultValue={currentTag}
        className="w-full"
        onValueChange={(value) => setCurrentTag(value as "spotify" | "deezer" | "applemusic")}
      >
        <div className="w-full flex justify-center">
          <TabsList className="rounded-full">
            {availableUrls.map((url, index) => (
              // biome-ignore lint/correctness/useJsxKeyInIterable: intentional
              <AlbumTabsTigger availableUrls={availableUrls} index={index} url={url} />
            ))}
          </TabsList>
        </div>

        {availableUrls.map((url) => (
          <TabsContent
            key={url.text}
            value={url.text}
            forceMount
            className="data-[state=inactive]:hidden relative"
          >
            {isAdminDisplay && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <div className="absolute right-[-3rem]">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full aspect-square"
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <ArrowDownUp className="hover:stroke-primary" />
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <MusicUrlForm
                    currentTag={currentTag}
                    album={album}
                    updateAlbum={updateAlbum}
                    setDialogOpen={setDialogOpen}
                  />
                </DialogContent>
              </Dialog>
            )}

            <iframe
              title="Album"
              src={url.link}
              width="100%"
              height="500"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
