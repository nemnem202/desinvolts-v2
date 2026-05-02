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
      const buffer = await file.arrayBuffer(); // résout le LazyBlob avant tout

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: this.file_folder, resource_type: "auto" },
          (error, res) => (error ? reject(error) : resolve(res!))
        );

        const readable = Readable.from(Buffer.from(buffer));
        readable.on("error", reject); // capture les erreurs stream
        uploadStream.on("error", reject); // capture les erreurs cloudinary stream
        readable.pipe(uploadStream);
      });

      logger.info("File uploaded successfully at", result.secure_url);
      return { success: true, publicUrl: this.getDownloadUrl(result.secure_url) };
    } catch (error) {
      logger.error("File upload error", error);
      return { success: false };
    }
  }
  async getAllImages(): Promise<{ publicUrl: string }[]> {
    try {
      const allResources: any[] = [];
      let nextCursor: string | undefined = undefined;

      do {
        const result = await cloudinary.api.resources({
          type: "upload",
          prefix: `${this.image_folder}/`,
          resource_type: "image",
          max_results: 500,
          ...(nextCursor ? { next_cursor: nextCursor } : {}),
        });

        allResources.push(...result.resources);
        nextCursor = result.next_cursor;
      } while (nextCursor);

      return allResources.map((resource: any) => ({
        publicUrl: resource.secure_url,
      }));
    } catch (error) {
      logger.error("Error fetching images from Cloudinary", error);
      return [];
    }
  }
  async deleteFile(publicUrl: string): Promise<{ success: boolean }> {
    try {
      // 1. On sépare l'URL par "/"
      const parts = publicUrl.split("/");

      const uploadIndex = parts.indexOf("upload");
      if (uploadIndex === -1) throw new Error("Invalid Cloudinary URL");

      const pathParts = parts.slice(uploadIndex + 2);
      const lastPart = pathParts.pop()?.split(".")[0];

      if (!lastPart) throw new Error("Could not extract filename");
      const publicId = pathParts.length > 0 ? `${pathParts.join("/")}/${lastPart}` : lastPart;

      const result = await cloudinary.uploader.destroy(publicId);

      logger.info("Image deletion attempt", { result, publicId });
      return { success: result.result === "ok" };
    } catch (error) {
      logger.error("Cloudinary delete error", error);
      return { success: false };
    }
  }
}
