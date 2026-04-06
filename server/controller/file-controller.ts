import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { logger } from "@/lib/logger";
import type { ApiResponse, UploadFileReply, UploadImageReply } from "@/types/server";
import File from "../cloud/file";
import openStack from "../config/openStack";
import { Controller } from "./controller";

interface UploadImageRoute extends RouteGenericInterface {
  Reply: ApiResponse<UploadImageReply>;
}

interface UploadFileRoute extends RouteGenericInterface {
  Reply: ApiResponse<UploadFileReply>;
}

export default class FileController extends Controller {
  static async uploadImage(req: FastifyRequest, rep: FastifyReply<UploadImageRoute>) {
    try {
      const fileManager = new File(req);
      const [fileName] = await fileManager.uploadImage(openStack.IMAGES_CONTAINER_NAME);
      return rep.send({ success: true, body: { fileName } });
    } catch (err) {
      logger.error("Uploard image failed");
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Réessayez plus tard.",
        description: "Une erreur innatendue est survenue :/",
      });
    }
  }

  static async uploadFile(req: FastifyRequest, rep: FastifyReply<UploadFileRoute>) {
    try {
      const fileManager = new File(req);

      const [fileName] = await fileManager.uploadFile(openStack.IMAGES_CONTAINER_NAME);

      logger.info(`Fichier téléchargé avec succès : ${fileName}`);
      return rep.send({ success: true, body: { fileName } });
    } catch (err) {
      logger.error("Upload file failed");
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Échec de l'envoi du fichier.",
        description: "Une erreur inattendue est survenue lors de l'upload.",
      });
    }
  }

  static async getImage(req: FastifyRequest<{ Params: { filePath: string } }>, rep: FastifyReply) {
    try {
      logger.info("GET IMAGE REQUESTED");
      const imageRequested = req.params.filePath;
      if (!imageRequested) throw new Error("Pas de nom d'image dans les paramètres.");
      const fileManager = new File(req);
      const image = await fileManager.getImage(openStack.IMAGES_CONTAINER_NAME);
      rep.raw.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      logger.info("Cache-Control header:", rep.getHeader("Cache-Control"));
      return rep.type("image/webp").send(image);
    } catch (err) {
      logger.error("GET IMAGE FAILED");
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Réessayez plus tard.",
        description: "Une erreur innatendue est survenue :/",
      });
    }
  }

  static async getFile(req: FastifyRequest<{ Params: { filePath: string } }>, rep: FastifyReply) {
    try {
      const fileName = req.params.filePath;
      logger.info(`Récupération du fichier : ${fileName}`);

      if (!fileName) throw new Error("Nom du fichier manquant.");

      const fileManager = new File(req);

      const fileBuffer = await fileManager.getFile(openStack.IMAGES_CONTAINER_NAME);

      const extension = fileName.split(".").pop()?.toLowerCase();

      let contentType = "application/octet-stream";
      if (extension === "pdf") contentType = "application/pdf";
      else if (extension === "txt") contentType = "text/plain";
      else if (extension === "md") contentType = "text/markdown";

      rep.raw.setHeader("Cache-Control", "public, max-age=31536000, immutable");

      return rep.type(contentType).send(fileBuffer);
    } catch (err) {
      logger.error("GET FILE FAILED");
      console.trace(err);
      return FileController.sendError(rep as any, {
        message: "Fichier introuvable.",
        description: "Impossible d'accéder au document demandé.",
      });
    }
  }
}
