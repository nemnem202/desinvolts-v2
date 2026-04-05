import emailjs from "@emailjs/nodejs";
import fastifyCookie from "@fastify/cookie";
import { apply, serve } from "@photonjs/fastify";
import fastify from "fastify";
import rawBody from "fastify-raw-body";
import { logger } from "@/lib/logger";
import { seed } from "./config/seed";
import { fileUploadHandler } from "./file-upload-handler";
import { telefuncHandler } from "./telefunc-handler";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default (await startApp()) as unknown;

async function startApp() {
  try {
    await seed();

    const { EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = process.env;

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_PRIVATE_KEY)
      throw new Error(
        `Les variables d'environnement d'emailjs sont mal définies, public key: ${!!EMAILJS_PUBLIC_KEY}, private key: ${!!EMAILJS_PRIVATE_KEY}`
      );
    emailjs.init({
      publicKey: EMAILJS_PUBLIC_KEY,
      privateKey: EMAILJS_PRIVATE_KEY,
      limitRate: {
        id: "app",
        throttle: 10000,
      },
    });

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
  } catch (err) {
    logger.error("Failed to init fastify", err);
  }
}
