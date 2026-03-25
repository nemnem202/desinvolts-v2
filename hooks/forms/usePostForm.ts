import { PostFormProps } from "@/components/features/posts/post-form";
import { postSchema } from "@/config/frontendFormSchemas";
import { logger } from "@/lib/logger";
import { convert_text_area_input_to_paragraph_array } from "@/lib/utils";
import { PostData } from "@/types/db";
import getRandomId from "@giapspzoo/get-random-id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type PostFormValues = z.infer<typeof postSchema>;

export function usePostForm({ onPost, setDialogOpen }: PostFormProps) {
  const [post, setPost] = useState<null | PostData>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema) as Resolver<PostFormValues>,
    defaultValues: {
      images: [],
    },
  });

  const images = form.watch("images");

  const handleSubmit: SubmitHandler<PostFormValues> = (data: PostFormValues) => {
    setPost({
      date: new Date(),
      id: getRandomId(),
      images: data.images.map((img, index) => ({
        image: img,
        position: index,
      })),
      paragraphs: convert_text_area_input_to_paragraph_array(data.content),
      title: {
        content: data.title,
        id: getRandomId(),
      },
      videos: [],
    });

    setDialogOpen(false);
  };

  useEffect(() => {
    if (!post) return;
    onPost(post);
    form.reset();
    setPost(null);
  }, [post]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      logger.info("Form values:", values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    logger.warn("Form errors:", form.formState.errors);
  }, [form.formState.errors]);

  return { post, setPost, handleSubmit, images, form };
}
