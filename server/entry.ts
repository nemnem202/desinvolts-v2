import { telefuncHandler } from "./telefunc-handler";
import { apply, serve } from "@photonjs/fastify";
import fastify from "fastify";
import rawBody from "fastify-raw-body";
import fastifyCookie from "@fastify/cookie";
import { fileUploadHandler } from "./file-upload-handler";
import { seed } from "./config/seed";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default (await startApp()) as unknown;

async function startApp() {
  await seed();

  const app = fastify({
    forceCloseConnections: true,
  });

  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
  });

  app.register(fileUploadHandler);

  await app.register(rawBody);

  await apply(app, [telefuncHandler]);
  return serve(app, {
    port,
  });
}
