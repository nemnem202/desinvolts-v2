import { logger } from "@/lib/logger";
import ConnexionController from "@/server/controller/connexion-controller";
import { FastifyReply } from "fastify";
import { getContext } from "telefunc";

export default async function onConnexion(
  username: string,
  password: string,
  remember: boolean,
): Promise<{ success: true } | { success: false; error: string }> {
  const context = getContext();

  const res = await ConnexionController.login(username, password, remember);

  if (res.success) {
    const secure = process.env.NODE_ENV === "production";
    logger.info("Token generated, is it secure? :", secure);
    // @ts-ignore
    const reply = context.fastify.reply as FastifyReply;
    reply.setCookie("token", res.jwt, {
      httpOnly: true,
      secure,
      path: "/",
      maxAge: remember ? 365 * 24 * 3600 : 3600,
      sameSite: "lax",
    });

    return { success: true };
  }
  return { success: false, error: res.error };
}
