import { logger } from "@/lib/logger";
import authenticateUser from "@/server/middlewares/authenticateUser";

export default async function onImageUpload(
  image: File
): Promise<{ success: true; publicUrl: string } | { success: false }> {
  try {
    logger.info("Image upload", image);

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    return {
      success: true,
      publicUrl: "sdfsdf",
    };
  } catch {
    return { success: false };
  }
}
