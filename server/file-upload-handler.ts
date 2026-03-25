import fastifyMultipart from "@fastify/multipart";
import type { FastifyInstance } from "fastify";
import FileController from "./controller/file-controller";

export const fileUploadHandler = async (app: FastifyInstance) => {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
  });
  app.post("/image", FileController.upload);
  app.get("/image/:filePath", FileController.get);
};
