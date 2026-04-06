import { logger } from "@/lib/logger";

export default async function onImageUpload(
  image: File
): Promise<{ success: true; publicUrl: string } | { success: false; error: string }> {
  logger.info("Image upload", image);
  return {
    success: true,
    publicUrl: "sdfsdf",
  };
}
