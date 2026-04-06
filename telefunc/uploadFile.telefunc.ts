import { logger } from "@/lib/logger";
import FileController from "@/server/controller/file-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";

export default async function onFileUpload(
  file: File
): Promise<{ success: true; publicUrl: string } | { success: false }> {
  try {
    logger.info("Image upload", file);

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    return new FileController().uploadFile(file);
  } catch {
    return { success: false };
  }
}
