import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Image from "@/components/common/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import AddImageButton from "@/components/features/image-editor/addImageButton";
import { PostData } from "@/types/db";
import { usePostForm } from "@/hooks/forms/usePostForm";
import { logger } from "@/lib/logger";

export interface PostFormProps {
  setDialogOpen: (open: boolean) => void;
  onPost: (post: PostData) => void;
}

export default function PostForm(props: PostFormProps) {
  const { handleSubmit, images, form } = usePostForm(props);

  return (
    <DialogContent>
      <DialogDescription className="hidden">
        Un dialogue pour ajouter un nouveau post.
      </DialogDescription>
      <DialogTitle className="hidden">Post dialog</DialogTitle>
      <Card className="unset-all">
        <CardHeader>
          <CardTitle className="title">Créer un post</CardTitle>
          <CardDescription className="paragraph">
            Partagez vos idées ou vos nouvelles publications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-rhf-post"
            onSubmit={(e) => {
              logger.info("POST FORM onSubmit triggered", e.target);
              form.handleSubmit(handleSubmit)(e);
            }}
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-post-title" className="subtitle">
                      Titre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-post-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Mon premier post"
                      autoComplete="off"
                      className="paragraph"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-post-content" className="subtitle">
                      Contenu
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-post-content"
                        placeholder="Écrivez ici votre contenu..."
                        rows={6}
                        className="min-h-24 resize-none focus:border-none focus-visible:ring-offset-0 paragraph"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums paragraph-sm">
                          {field.value ? field.value.length : 0}/500 caractères
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription className="paragraph">
                      Le contenu est optionnel.
                    </FieldDescription>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="images"
                control={form.control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <FieldLabel htmlFor="images" className="subtitle">
                      Images
                    </FieldLabel>
                    <div className="flex gap-3 items-center">
                      {field.value.map((field, index) => (
                        <div className="w-20 h-20">
                          <Image
                            width={200}
                            height={200}
                            imageProps={field}
                            onChange={(newImage) =>
                              form.setValue(
                                "images",

                                images.map((img) =>
                                  img.id === newImage.id ? { ...img, ...newImage } : img,
                                ),
                              )
                            }
                            key={index}
                          />
                        </div>
                      ))}
                      <div className="h-fit">
                        <AddImageButton
                          onImage={(newImage) => {
                            form.setValue("images", [...images, { ...newImage, label: null }]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Réinitialiser
            </Button>
            <Button type="submit" form="form-rhf-post">
              Envoyer
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </DialogContent>
  );
}
