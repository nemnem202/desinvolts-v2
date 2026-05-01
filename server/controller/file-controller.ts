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
  private readonly file_folder = env.CLOUD_FILE_FOLDER_NAME;

  getDownloadUrl(secureUrl: string, filename?: string): string {
    const flag = filename ? `fl_attachment:${filename}` : "fl_attachment";
    return secureUrl.replace("/upload/", `/upload/${flag}/`);
  }

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

  async uploadFile(file: File): Promise<{ success: true; publicUrl: string } | { success: false }> {
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: this.file_folder, resource_type: "auto" },
          (error, res) => (error ? reject(error) : resolve(res!))
        );
        Readable.fromWeb(file.stream() as any).pipe(uploadStream);
      });
      return { success: true, publicUrl: this.getDownloadUrl(result.secure_url) };
      // ↑ secure_url, pas public_id
    } catch (error) {
      logger.error("File upload error", error);
      return { success: false };
    }
  }

  async getAllImages(): Promise<{ publicUrl: string }[]> {
    try {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: `${this.image_folder}/`,
        resource_type: "image",
      });

      return result.resources.map((resource: any) => ({
        publicUrl: resource.secure_url,
      }));
    } catch (error) {
      logger.error("Error fetching images from Cloudinary", error);
      return [];
    }
  }
}
