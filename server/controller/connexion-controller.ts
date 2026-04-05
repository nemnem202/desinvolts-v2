import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma-client";
import { Controller } from "./controller";

export default class ConnexionController extends Controller {
  static async login(
    username: string,
    password: string,
    remember: boolean
  ): Promise<{ success: true; jwt: string } | { success: false; error: string }> {
    console.log("[CONNEXION CONTOLLER CALL]");
    try {
      if (!username) return { success: false, error: "Veuillez fournir un nom d'utilisateur." };

      if (!password) return { success: false, error: "Veuillez fournir un nom mot de passe." };

      const admin = await prisma.adminAccount.findFirst({
        where: {
          username: username,
        },
      });

      if (!admin) return { success: false, error: "Mot de passe ou nom d'utilisateur incorrect." };

      const passwordIsValid = await argon2.verify(admin.passwordHash, password);

      if (!passwordIsValid)
        return { success: false, error: "Mot de passe ou nom d'utilisateur incorrect." };

      const secret = new TextEncoder().encode(process.env.SECRET_KEY);

      const jwt = await new SignJWT({ username: admin.username })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(remember ? "3w" : "1h")
        .sign(secret);

      return { success: true, jwt };
    } catch (err) {
      logger.error("Connexion attempt failed", err);
      return { success: false, error: "Une erreur innatendue est survenue :/" };
    }
  }
}
