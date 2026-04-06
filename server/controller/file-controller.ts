import { Readable } from "node:stream";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

cloudinary.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
  secure: true,
});

export default class FileController {
  private readonly image_folder = env.CLOUD_IMAGE_FOLDER_NAME;

  async uploadFileAsImage(
    image: File
  ): Promise<{ success: true; publicUrl: string } | { success: false }> {
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: this.image_folder, format: "webp", resource_type: "image" },
          (error, res) => (error ? reject(error) : resolve(res!))
        );

        Readable.fromWeb(image.stream() as any).pipe(uploadStream);
      });
      return { success: true, publicUrl: result.secure_url };
    } catch (error) {
      logger.error("File upload error", error);
      return { success: false };
    }
  }
}
