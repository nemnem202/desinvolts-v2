import emailjs from "@emailjs/nodejs";
import fastifyCookie from "@fastify/cookie";
import { apply, serve } from "@photonjs/fastify";
import fastify from "fastify";
import { logger } from "@/lib/logger";
import { seed } from "./config/seed";
import { telefuncHandler } from "./telefunc-handler";
import fastifyMultipart from "@fastify/multipart";
import { env } from "@/lib/env";

const port = env.PORT;

export default (await startApp()) as unknown;

async function startApp() {
  try {
    await seed();

    const { EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY } = env;

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
      secret: env.COOKIE_SECRET,
    });

    app.register(fastifyMultipart, {
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
    });

    await apply(app, [telefuncHandler]);

    // await app.register(rawBody);
    return serve(app, {
      port,
    });
  } catch (err) {
    logger.error("Failed to init fastify", err);
  }
}
