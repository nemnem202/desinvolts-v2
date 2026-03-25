import ApiHandler from "@/lib/apiHandler";
import { ConnexionReply } from "@/types/server";
import { FastifyReply } from "fastify";
import { getContext } from "telefunc";

export default async function onConnexion(username: string, password: string, remember: boolean) {
  const context = getContext();
  const res = await ApiHandler.post<
    { username: string; password: string; remember: boolean },
    ConnexionReply
  >(`http://backend:${process.env.BACKEND_PORT}/connexion`, {
    username,
    password,
    remember,
  });

  const { success, description, message } = res;

  if (success) {
    // @ts-ignore
    const reply = context.fastify.reply as FastifyReply;
    reply.setCookie("token", res.body.jwt, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: remember ? 365 * 24 * 3600 : 3600,
      sameSite: "lax",
    });
  }

  return { success, description, message };
}
