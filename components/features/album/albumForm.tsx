import type { Dispatch, SetStateAction } from "react";
import Image from "@/components/common/image";
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAlbumForm } from "@/hooks/forms/useAlbumForm";

export interface AlbumFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AlbumForm({ setOpen }: AlbumFormProps) {
  const { form, formRef, onSubmit } = useAlbumForm({ setOpen });

  return (
    <DialogContent className="flex flex-col justify-center">
      <DialogTitle className="title text-center">Ajouter un album</DialogTitle>

      <DialogDescription className="hidden">
        Un dialogue qui permet d'ajouter un album
      </DialogDescription>
      <Form {...form}>
        <form
          id="albumform"
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-5 justify-between"
        >
          {/* IMAGE */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Image</FormLabel>

                <FormControl>
                  <div className="w-full flex flex-col items-center">
                    {field.value ? (
                      <div className="h-25 w-25">
                        <Image
                          width={200}
                          height={200}
                          imageProps={field.value}
                          onChange={(img) => field.onChange({ ...img, label: null })}
                        />
                      </div>
                    ) : (
                      <AddImageButton
                        onImage={(img) => {
                          field.onChange({ ...img, label: null });
                        }}
                      >
                        <Button>Ajouter une image</Button>
                      </AddImageButton>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* TITLE */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Titre</FormLabel>

                <FormControl>
                  <Input {...field} placeholder="Votre titre" className="italic paragraph" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="subtitle">Description</FormLabel>

                <FormControl>
                  <Textarea {...field} placeholder="Votre description" className="paragraph" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* URLS */}
          <div className="flex flex-col gap-2">
            <div className="title-sm">Url d'intégrations</div>

            <div className="rounded-lg border p-5 flex flex-col gap-4">
              <FormField
                control={form.control}
                name="spotifyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Spotify</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://open.spotify.com/album/..."
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deezerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Deezer</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://www.deezer.com/album/..."
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appleMusicUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="subtitle">Apple Music</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://music.apple.com/.../album/.../123456789"
                        className="italic paragraph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button form="albumform" type="submit">
              Envoyer
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
