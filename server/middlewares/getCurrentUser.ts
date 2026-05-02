import { jwtVerify } from "jose";
import { logger } from "@/lib/logger";
import { env } from "@/lib/env";

function parseCookie(str: string): Record<string, string> {
  return Object.fromEntries(
    str.split(";").map((p) => {
      const idx = p.indexOf("=");
      return [
        decodeURIComponent(p.slice(0, idx).trim()),
        decodeURIComponent(p.slice(idx + 1).trim()),
      ];
    })
  );
}

export default async function getCurrentUserFromCookie(
  cookie: string
): Promise<{ username: string } | null> {
  const token = parseCookie(cookie).token;

  let currentUser: { username: string } | null = null;

  logger.info("User token: ", token ? `${token.slice(0, 5)}...` : "absent");

  if (token) {
    try {
      const secret = new TextEncoder().encode(env.TOKEN_SECRET_KEY);
      const { payload, protectedHeader } = await jwtVerify(token, secret);
      if (!payload.username) throw new Error("No username in payload");
      currentUser = { username: payload.username as string };
    } catch (err) {
      logger.error("Failed to decode user token", err);
      currentUser = null;
    }
  }

  logger.info("USER CONNECT: ", currentUser);

  return currentUser;
}
