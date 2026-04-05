import fastifyMultipart from "@fastify/multipart";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { jwtVerify } from "jose";
import FileController from "./controller/file-controller";

async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const token = request.cookies?.token;

  if (!token) {
    reply.status(401).send({ error: "Non authentifié" });
    return;
  }

  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const { payload } = await jwtVerify(token, secret);
    (request as any).currentUser = { username: payload.username };
  } catch {
    reply.status(401).send({ error: "Token invalide" });
  }
}

export const fileUploadHandler = async (app: FastifyInstance) => {
  app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * 10,
    },
  });
  app.post("/image", { preHandler: requireAuth }, FileController.upload);
  app.get("/image/:filePath", FileController.get);
};
