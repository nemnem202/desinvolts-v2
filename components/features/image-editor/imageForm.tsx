import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useImageForm } from "@/hooks/forms/useImageForm";
import { formatDate } from "@/lib/utils";
import type { Image } from "@/prisma/generated/prisma/browser";
import { Button } from "../../ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "../../ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../../ui/input-group";
import { Spinner } from "../../ui/spinner";
import ImageCropper from "./imageCropper";

export interface ImageFormProps {
  image: File;
  setImage: Dispatch<SetStateAction<File | null>>;
  onImage: (image: Image) => void;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  loadImage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ImageForm(props: ImageFormProps) {
  const { image, loadImage } = props;
  const { form, handleSubmit, onError, formLoading, squareArea, setSquare } = useImageForm(props);
  return (
    <DialogContent className="flex items-start justify-center max-w-screen w-fit">
      <DialogDescription className="hidden">Un dialogue pour ajouter une image.</DialogDescription>
      <DialogTitle className="hidden">Image dialog</DialogTitle>
      <ImageCropper
        imageSrc={URL.createObjectURL(image)}
        squareArea={squareArea}
        setSquare={setSquare}
      />
      <div className="w-fit">
        <form
          id="form-rhf-image"
          onSubmit={(e) => {
            e.stopPropagation();
            form.handleSubmit(handleSubmit, onError)(e);
          }}
          className="w-[20rem]"
        >
          <FieldGroup>
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <p>
                    <span className="subtitle muted">Modifié le : </span>
                    <span className="paragraph italic">{formatDate(field.value)}</span>
                  </p>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-image-title" className="subtitle">
                    Titre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-image-title"
                    aria-invalid={fieldState.invalid}
                    placeholder={field.value}
                    autoComplete="off"
                    className="paragraph"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-image-content" className="subtitle">
                    Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-image-content"
                      placeholder="Une photo du groupe Désinvolts"
                      rows={6}
                      className="min-h-24 resize-none focus:border-none focus-visible:ring-offset-0 paragraph"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums paragraph-sm">
                        {field.value ? field.value.length : 0}/250 caractères
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldDescription className="paragraph">
                    La description d'une image permet une meilleure accessibilité pour les personnes
                    en situtation de handicap ainsi qu'un meilleur référencement par les moteurs de
                    recherche.
                  </FieldDescription>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field orientation={"horizontal"} className="justify-end">
              <Button
                form="form-rhf-image"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  loadImage(e);
                }}
                variant={"outline"}
              >
                Changer d'image
              </Button>
              <Button type="submit" form="form-rhf-image">
                {formLoading ? <Spinner /> : "Ajouter"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </DialogContent>
  );
}
