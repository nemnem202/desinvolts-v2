import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { type Resolver, type SubmitHandler, useForm } from "react-hook-form";
import type z from "zod";
import { contactSchema } from "@/config/frontendFormSchemas";
import { errorToast, successToast } from "@/lib/utils";
import onContact from "@/telefunc/contact.telefunc";

export type ContactFormValues = z.infer<typeof contactSchema>;

export default function useContactForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      termsAccepted: false,
    },
  });

  const handleSubmit: SubmitHandler<ContactFormValues> = async (data: ContactFormValues) => {
    setLoading(true);
    const res = await onContact(data);
    if (res.success) {
      successToast("Email envoyé", "Nous vous répondrons aussi rapidement que possible.");
    } else {
      errorToast(
        res.message ?? "Une erreur innatendue est survenue",
        "Essayez de nous contacter via notre adresse email."
      );
    }
    setLoading(false);
  };

  return { form, handleSubmit, loading };
}
