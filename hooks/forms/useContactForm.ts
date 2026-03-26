import { contactSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type ContactFormValues = z.infer<typeof contactSchema>;

export default function useContactForm() {
  const form = useForm({
    resolver: zodResolver(contactSchema) as Resolver<ContactFormValues>,
    defaultValues: {
      termsAccepted: false,
    },
  });

  const handleSubmit: SubmitHandler<ContactFormValues> = async (data: ContactFormValues) => {
    logger.info("Message soumis");
  };

  return { form, handleSubmit };
}
