import AddImageButton from "@/components/features/image-editor/addImageButton";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useRef } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import { TrombinoscopeElement } from "@/types/db";
import { useTrombinoscopeItemForm } from "@/hooks/forms/useTrombinoscopeItemForm";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import Image from "@/components/common/image";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";

export interface AddTrombinoscopeItemProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  elements: TrombinoscopeElement[];
  onItem: (item: TrombinoscopeElement) => void;
}

export default function AddTrombinoscopeItem(props: AddTrombinoscopeItemProps) {
  const { form, formRef, onSubmit } = useTrombinoscopeItemForm(props);

  return (
    <DialogContent className="flex flex-col justify-center">
      <DialogTitle className="title text-center">Ajouter un Element</DialogTitle>

      <DialogDescription className="hidden">
        Un dialogue qui permet d'ajouter un Element trombinoscope
      </DialogDescription>
      <form
        id="trombinoscopeitemform"
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 p-5 justify-between"
      >
        <FieldGroup>
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Image</FieldLabel>

                <div className="w-full flex flex-col items-center">
                  {field.value ? (
                    <div className="h-50 w-50">
                      <Image
                        width={320}
                        height={320}
                        imageProps={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  ) : (
                    <AddImageButton onImage={field.onChange}>
                      <div>Ajouter une image</div>
                    </AddImageButton>
                  )}
                </div>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Titre</FieldLabel>

                <Input
                  {...field}
                  placeholder="Votre titre"
                  className="italic paragraph"
                  aria-invalid={fieldState.invalid}
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
                <FieldLabel className="subtitle">Description</FieldLabel>

                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    placeholder="Votre description"
                    className="paragraph"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="subtitle">Couleur</FieldLabel>

                <HexColorPicker color={field.value} onChange={field.onChange} />

                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex justify-end">
          <Button type="submit" form="trombinoscopeitemform">
            Envoyer
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
