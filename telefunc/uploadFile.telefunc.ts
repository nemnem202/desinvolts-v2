import { logger } from "@/lib/logger";

export default async function onFileUpload(
  file: File
): Promise<{ success: true; publicUrl: string } | { success: false; error: string }> {
  logger.info("Image upload", file);
  return {
    success: true,
    publicUrl: "sdfsdf",
  };
}
