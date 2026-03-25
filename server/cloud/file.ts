import type { FastifyRequest } from "fastify";
import type { storage } from "pkgcloud";
import OpenStackSDK from "./OpenStackSdk";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import "@fastify/multipart";
import streamToBuffer from "./streamToBuffer";
import openStack from "../config/openStack";

interface FileOptions {
  width?: number;
  height?: number;
  quality?: number;
  keepAspectRatio?: boolean;
}

interface FileUploadOptions {
  url?: string;
  width?: number;
  height?: number;
  quality?: number;
}

class File {
  private readonly fileSizeLimit: number = 1024 * 1024 * 10;
  private static readonly maxWidth: number = 2560;
  private static readonly maxHeight: number = 1440;
  private static readonly maxQuality: number = 100;
  private static readonly quality: number = 90;
  private request: FastifyRequest;

  constructor(request: FastifyRequest) {
    this.request = request;
  }

  static async getOpenStackContainer(containerName: string): Promise<storage.Container> {
    return await new Promise((resolve, reject) => {
      return OpenStackSDK.getContainer(
        containerName,
        (err: unknown, container: storage.Container) => {
          if (err) reject(err);
          else resolve(container);
        },
      );
    });
  }

  static generateRandomFileName(length: number = 24) {
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
    let result = "";

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
  }

  static async prepareImage(imageBuffer: Buffer, options: FileOptions): Promise<Buffer>;
  static async prepareImage(image: string | Buffer, options: FileOptions = {}): Promise<Buffer> {
    try {
      const sharpProcess = sharp(image);

      if (!options.height) options.height = File.maxHeight;
      if (!options.width) options.width = File.maxWidth;
      if (!options.quality) options.quality = File.quality;
      if (!options.keepAspectRatio) options.keepAspectRatio = true;

      if (options.width && (options.width > File.maxWidth || options.width <= 0)) {
        options.width = File.maxWidth;
      }

      if (options.height && (options.height > File.maxHeight || options.height <= 0)) {
        options.height = File.maxHeight;
      }

      if (options.quality && (options.quality > File.maxQuality || options.quality <= 0)) {
        options.quality = File.maxQuality;
      }

      const metadata = await sharpProcess.metadata();
      const originalWidth = metadata.width!;
      const originalHeight = metadata.height!;
      const aspectRatio = originalWidth / originalHeight;

      const heightTooBig = options.height > File.maxHeight;
      const widthTooBig = options.width > File.maxWidth;

      if (heightTooBig || widthTooBig) {
        if (heightTooBig && widthTooBig) {
          if (originalWidth > originalHeight) {
            options.width = File.maxWidth;
            options.height = Math.round(options.width / aspectRatio);
          } else {
            options.height = File.maxHeight;
            options.width = Math.round(options.height * aspectRatio);
          }
        } else if (options.width > File.maxWidth) {
          options.width = File.maxWidth;
          options.height = Math.round(options.width / aspectRatio);
        } else if (options.height > File.maxHeight) {
          options.height = File.maxHeight;
          options.width = Math.round(options.height * aspectRatio);
        }
      }

      sharpProcess.resize(options.width || null, options.height || null, {
        withoutEnlargement: true,
        fit: options.keepAspectRatio ? "outside" : "cover",
      });

      sharpProcess.webp({
        quality: options.quality || File.quality,
      });

      return await sharpProcess.toBuffer();
    } catch (error: unknown) {
      console.trace(error);

      if (image instanceof Buffer) return image;
      return Buffer.from(image);
    }
  }

  async uploadImage(
    containerName: string,
    options: FileUploadOptions = {},
    fieldName = "image",
  ): Promise<[string, string]> {
    const randomName = File.generateRandomFileName(20);
    const finalExtension = "webp";
    let originalName = "";
    let imageBuffer: Buffer | null = null;

    if (!(await File.getOpenStackContainer(containerName))) {
      throw new Error("No container found");
    }

    if (!options.url) {
      // Multiple files could be uploaded at once, get ONLY the file with the specified field name (fieldName)
      // in the multipart request

      let image = null;

      for await (const part of this.request.parts()) {
        if ("file" in part) {
          if (part.fieldname === fieldName) {
            originalName = part.filename;
            image = part.file;
            imageBuffer = await part.toBuffer();
            break;
          }

          part.file.resume();
        }
      }

      if (!image) throw new Error("No image provided");
    } else {
      const imageResponse = await fetch(options.url);
      if (!imageResponse.ok) throw new Error("Image not found");

      imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
      originalName = options.url.split("/").pop() || "";
    }

    if (!imageBuffer) throw new Error("No image provided");

    const convertedImage = await File.prepareImage(imageBuffer!, {
      width: options.width || File.maxWidth,
      height: options.height || File.maxHeight,
      quality: options.quality || File.maxQuality,
    });

    const imageFileName = `${randomName}.${finalExtension}`;
    const imageFilePath = path.join("temp", imageFileName);

    try {
      fs.writeFileSync(imageFilePath, convertedImage);

      await OpenStackSDK.uploadFile({
        container: containerName,
        filePath: path.join(imageFilePath),
        fileName: imageFileName,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    } finally {
      try {
        fs.unlinkSync(imageFilePath);
      } catch (error: unknown) {
        console.trace(error);
      }
    }

    return [imageFileName, originalName];
  }

  async uploadFile(containerName: string): Promise<string> {
    const file = await this.request.file({
      limits: { fileSize: this.fileSizeLimit },
    });

    if (!file) throw new Error("No file provided");

    const fileFileNameParts = [];
    fileFileNameParts.push("file");
    fileFileNameParts.push(File.generateRandomFileName(6));

    const extension = file.filename.split(".").pop();
    const fileFileName = `${fileFileNameParts.join("-")}.${extension}`;
    const tempFilePath = path.join("temp", fileFileName);

    fs.writeFileSync(tempFilePath, await file.toBuffer());

    try {
      await OpenStackSDK.uploadFile({
        container: containerName,
        filePath: tempFilePath,
        fileName: fileFileName,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    }

    return fileFileName;
  }

  async deleteFile(containerName: string): Promise<void> {
    const { imagePath } = this.request.params as { imagePath: string };

    if (!(await File.getOpenStackContainer(containerName))) {
      throw new Error("No container found");
    }

    try {
      await OpenStackSDK.deleteFile({
        container: containerName,
        fileName: imagePath,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error uploading file");
    }
  }

  async getFile(containerName: string): Promise<Buffer> {
    const { filePath } = this.request.params as { filePath: string };

    const fileResponse = await fetch(`${openStack.CONTAINER_URL}/${containerName}/${filePath}`);

    if (!fileResponse.ok) throw new Error("File not found");

    const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
    return fileBuffer;
  }

  async getImage(containerName: string): Promise<Buffer> {
    const { filePath } = this.request.params as { filePath: string };
    const { width, height, quality } = this.request.query as {
      width?: string;
      height?: string;
      quality?: string;
    };

    try {
      const file = OpenStackSDK.download({
        container: containerName,
        remote: filePath,
      });

      const buffer = (await new Promise((resolve, reject) => {
        streamToBuffer(file)
          .then((buffer) => resolve(buffer))
          .catch((error) => {
            console.trace(error);
            reject(false);
          });
      })) as Buffer;

      return await File.prepareImage(buffer, {
        width: width ? Number(width) : File.maxWidth,
        height: height ? Number(height) : File.maxHeight,
        quality: quality ? Number(quality) : File.quality,
      });
    } catch (error: unknown) {
      console.trace(error);
      throw new Error("Error getting image");
    } finally {
      // fs.unlinkSync(tempFilePath);
    }
  }
}

export default File;
