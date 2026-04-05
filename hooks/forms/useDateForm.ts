import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type Resolver, useForm } from "react-hook-form";
import type z from "zod";
import { dateEventSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import type { DateEvent } from "@/types/db";

type DateFormValue = z.infer<typeof dateEventSchema>;
export default function useDateForm({ onDate }: { onDate: (date: DateEvent) => void }) {
  const form = useForm({
    resolver: zodResolver(dateEventSchema) as Resolver<DateFormValue>,
    defaultValues: {
      date: new Date(Date.now()),
    },
  });

  useEffect(() => {
    const subscription = form.watch((values) => {
      logger.info("Form values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    logger.warn("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  const onSubmit = async (value: DateFormValue) => {
    if (!value.image) return;
    const newDate: DateEvent = {
      id: getRandomId(),
      date: value.date,
      image: value.image,
      paragraphs: convert_text_area_input_to_paragraph_array(value.description),
      adress: {
        content: value.adress,
        id: getRandomId(),
        hyperlinks: [],
      },
      city: {
        content: value.city,
        id: getRandomId(),
        hyperlinks: [],
      },
      title: {
        content: value.title,
        id: getRandomId(),
        hyperlinks: [],
      },
    };
    onDate(newDate);
    form.reset();
  };

  return { form, onSubmit };
}
