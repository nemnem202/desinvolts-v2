import { enhance, type UniversalHandler } from "@universal-middleware/core";
import { telefunc } from "telefunc";
import getCurrentUserFromCookie from "./middlewares/getCurrentUser";

export const telefuncHandler: UniversalHandler = enhance(
  async (request, context, runtime) => {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const currentUser = await getCurrentUserFromCookie(cookieHeader);

    const httpResponse = await telefunc({
      request,
      context: {
        ...context,
        ...runtime,
        currentUser,
        request,
      },
    });

    const { body, statusCode, contentType } = httpResponse;

    const headers = new Headers({ "content-type": contentType });

    return new Response(body, { status: statusCode, headers });
  },
  {
    name: "desinvolts:telefunc-handler",
    path: `/_telefunc`,
    method: ["GET", "POST"],
    immutable: false,
  }
);
