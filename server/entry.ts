import emailjs from "@emailjs/nodejs";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";
import { telefuncHandler } from "./telefunc-handler";
import { apply, serve } from "@photonjs/express";
import cookieParser from "cookie-parser";
import express from "express";
const port = 3000;

export default (await startApp()) as unknown;

async function startApp() {
  try {
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

    const app = express();

    app.use(cookieParser());

    apply(app, [telefuncHandler]);

    return serve(app, {
      port,
    });
  } catch (err) {
    logger.error("Failed to init fastify", err);
  }
}
