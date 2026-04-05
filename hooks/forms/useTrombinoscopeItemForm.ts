import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { type Resolver, useForm } from "react-hook-form";
import type z from "zod";
import type { AddTrombinoscopeItemProps } from "@/components/features/trombinoscope/addTrombinoscopeItem";
import { trombinoscopeItemSchema } from "@/config/frontendFormSchemas";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import type { TrombinoscopeElement } from "@/types/db";

type AddTrombinoscopeItemFormValues = z.infer<typeof trombinoscopeItemSchema>;

export function useTrombinoscopeItemForm(props: AddTrombinoscopeItemProps) {
  const { setOpen, elements, onItem } = props;
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<AddTrombinoscopeItemFormValues>({
    resolver: zodResolver(trombinoscopeItemSchema) as Resolver<AddTrombinoscopeItemFormValues>,
  });

  const onSubmit = (values: AddTrombinoscopeItemFormValues) => {
    const { description, title, image, color } = values;

    const maxPosition =
      elements.length > 0 ? elements.sort((a, b) => b.position - a.position)[0].position : 0;

    const newPosition = maxPosition + 1;

    if (!image) return;

    const item: TrombinoscopeElement = {
      id: getRandomId(),
      color,
      image,
      paragraphs: convert_text_area_input_to_paragraph_array(description),
      position: newPosition,
      title: {
        content: title,
        id: getRandomId(),
      },
    };
    onItem(item);
    setOpen(false);
  };

  return { form, onSubmit, formRef };
}
