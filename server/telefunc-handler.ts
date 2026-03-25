import { logger } from "@/lib/logger";
import { enhance, type UniversalHandler } from "@universal-middleware/core";
import { jwtVerify } from "jose";
import { telefunc } from "telefunc";

function parseCookie(str: string): Record<string, string> {
  return Object.fromEntries(
    str.split(";").map((p) => {
      const idx = p.indexOf("=");
      return [
        decodeURIComponent(p.slice(0, idx).trim()),
        decodeURIComponent(p.slice(idx + 1).trim()),
      ];
    }),
  );
}

export const telefuncHandler: UniversalHandler = enhance(
  async (request, context, runtime) => {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const token = parseCookie(cookieHeader)["token"];

    let currentUser: { username: string } | null = null;

    logger.info("User token: ", token ? token.slice(0, 5) + "..." : "absent");

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const { payload, protectedHeader } = await jwtVerify(token, secret);
        if (!payload.username) throw new Error("No username in payload");
        currentUser = { username: payload.username as string };
      } catch (err) {
        logger.error("Failed to decode user token", err);
        currentUser = null;
      }
    }

    logger.info("USER CONNECT: ", currentUser);

    const httpResponse = await telefunc({
      url: new URL(request.url.toString()).pathname,
      method: request.method,
      body: await request.text(),
      context: {
        ...context,
        ...runtime,
        currentUser,
      },
    });
    const { body, statusCode, contentType } = httpResponse;
    return new Response(body, {
      status: statusCode,
      headers: {
        "content-type": contentType,
      },
    });
  },
  {
    name: "desinvolts:telefunc-handler",
    path: `/_telefunc`,
    method: ["GET", "POST"],
    immutable: false,
  },
);
