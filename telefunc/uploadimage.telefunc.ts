import { logger } from "@/lib/logger";
import FileController from "@/server/controller/file-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";

export default async function onImageUpload(
  image: File
): Promise<{ success: true; publicUrl: string } | { success: false }> {
  try {
    logger.info("Image upload", image);

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    return new FileController().uploadFileAsImage(image);
  } catch {
    return { success: false };
  }
}

export async function onDeleteImage(
  publicUrl: string
): Promise<{ success: true } | { success: false }> {
  try {
    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    return new FileController().deleteFile(publicUrl);
  } catch {
    return { success: false };
  }
}
