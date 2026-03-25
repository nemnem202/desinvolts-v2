import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAlbumUrlForm } from "@/hooks/forms/useAlbumUrlForm";
import { Album } from "@/types/db";
import { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";

export interface MusicUrlForm {
  currentTag: "spotify" | "deezer" | "applemusic";
  album: Album;
  updateAlbum: (updates: Partial<Album>) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function MusicUrlForm(props: MusicUrlForm) {
  const { currentTag } = props;
  const { form, formValue, handleUrlChange, onSubmit } = useAlbumUrlForm(props);

  return (
    <>
      <DialogTitle className="hidden">Un formulaire d'url</DialogTitle>
      <DialogDescription className="hidden">Un formulaire d'url</DialogDescription>
      <form
        id="musicurlform"
        onClick={(e) => e.stopPropagation()}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className="subtitle mb-5">Url de l'album {currentTag}</FieldLabel>

              <Input
                placeholder={`https://${currentTag}.com/...`}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleUrlChange(e.currentTarget.value);
                }}
                aria-invalid={fieldState.invalid}
              />

              {formValue && (
                <iframe
                  src={formValue}
                  width="100%"
                  height="500"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="mt-2"
                />
              )}

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex justify-end">
          <Button form="musicurlform" type="submit" className="mt-2">
            Ajouter
          </Button>
        </div>
      </form>
    </>
  );
}
