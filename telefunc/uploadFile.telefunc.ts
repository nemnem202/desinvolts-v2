import { logger } from "@/lib/logger";
import FileController from "@/server/controller/file-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import { shield } from "telefunc";
const type = shield.type;

shield(onFileUpload, [type.any]);
export default async function onFileUpload(
  file: File
): Promise<{ success: true; publicUrl: string } | { success: false }> {
  try {
    logger.info("File upload", file);

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    return new FileController().uploadFile(file);
  } catch {
    return { success: false };
  }
}
