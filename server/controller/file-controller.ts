import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import File from "../cloud/file";
import { ApiResponse, ImageReply, UploadImageReply } from "@/types/server";
import { Controller } from "./controller";
import openStack from "../config/openStack";
import { logger } from "@/lib/logger";

interface UploadImageRoute extends RouteGenericInterface {
  Reply: ApiResponse<UploadImageReply>;
}

interface GetImageRoute extends RouteGenericInterface {
  Reply: ApiResponse<ImageReply>;
}

export default class FileController extends Controller {
  static async upload(req: FastifyRequest, rep: FastifyReply<UploadImageRoute>) {
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

  static async get(req: FastifyRequest<{ Params: { filePath: string } }>, rep: FastifyReply) {
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
}
