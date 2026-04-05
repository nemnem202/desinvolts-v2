import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import useContactForm from "@/hooks/forms/useContactForm";

export default function ContactForm() {
  const { form, handleSubmit, loading } = useContactForm();

  return (
    <form
      id="contactform"
      className="flex flex-col gap-6 rounded-xl border p-5 justify-between w-full md:w-xl"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup>
        <div className="flex gap-3">
          <Controller
            name="firstname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="firstname" className="subtitle">
                  Prénom
                </FieldLabel>
                <Input
                  {...field}
                  id="firstname"
                  placeholder="John"
                  className="italic paragraph"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="lastname"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="lastname" className="subtitle">
                  Nom de famille
                </FieldLabel>
                <Input
                  {...field}
                  id="lastname"
                  placeholder="Doe"
                  className="italic paragraph"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email" className="subtitle">
                Email
              </FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                className="italic paragraph"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="object" className="subtitle">
                Objet
              </FieldLabel>
              <Input
                {...field}
                id="object"
                placeholder="Objet"
                className="italic paragraph"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="message" className="subtitle">
                Message
              </FieldLabel>
              <Textarea
                {...field}
                id="message"
                placeholder="Votre message"
                className="italic paragraph"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="termsAccepted"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  className="mt-1"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="terms" className="text-muted-foreground text-sm paragraph">
                  J'accepte la transmission de ces informations par email au groupe Désinvolts,
                  conformément à la politique de confidentialité.
                </Label>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-end">
        <Button type="submit" form="contactform">
          {loading ? <Spinner /> : "Envoyer"}
        </Button>
      </div>
    </form>
  );
}
