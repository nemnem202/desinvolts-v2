import { RouteGenericInterface, FastifyRequest, FastifyReply } from "fastify";
import { Controller } from "./controller";
import { prisma } from "@/lib/prisma-client";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { ApiResponse, ConnexionReply } from "@/types/server";

interface ConnexionRoute extends RouteGenericInterface {
  Reply: ApiResponse<ConnexionReply>;
}

export default class ConnexionController extends Controller {
  static async login(req: FastifyRequest, rep: FastifyReply<ConnexionRoute>) {
    console.log("[CONNEXION CONTOLLER CALL]");
    try {
      const { username, password, remember } = req.body as {
        username: string;
        password: string;
        remember: boolean;
      };

      if (!username)
        return this.sendError(rep, {
          message: "Veuillez fournir un nom d'utilisateur.",
          status: 400,
        });

      if (!password)
        return this.sendError(rep, {
          message: "Veuillez fournir un nom mot de passe.",
          status: 400,
        });

      const admin = await prisma.adminAccount.findFirst({
        where: {
          username: username,
        },
      });

      if (!admin)
        return this.sendError(rep, {
          message: "Mot de passe ou nom d'utilisateur incorrect.",
          status: 400,
        });

      const passwordIsValid = await argon2.verify(admin.passwordHash, password);

      if (!passwordIsValid)
        return this.sendError(rep, {
          message: "Mot de passe ou nom d'utilisateur incorrect.",
          status: 400,
        });

      const secret = new TextEncoder().encode(process.env.SECRET_KEY);

      const jwt = await new SignJWT({ userId: "123" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(remember ? "3w" : "1h")
        .sign(secret);

      return rep.status(200).send({
        success: true,
        body: {
          connected: true,
          jwt,
        },
        message: "Bienvenue !",
        description: "Vous êtes connecté.",
      });
    } catch (err) {
      console.error(err);
      return this.sendError(rep, {
        message: "Réessayez plus tard.",
        description: "Une erreur innatendue est survenue :/",
      });
    }
  }
}
