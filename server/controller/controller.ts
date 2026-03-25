import { ApiResponse } from "@/types/server";
import { FastifyReply, RouteGenericInterface } from "fastify";

interface DefaultResponseRoute extends RouteGenericInterface {
  Reply: ApiResponse<any>;
}

export abstract class Controller {
  static sendError = (
    rep: FastifyReply<DefaultResponseRoute>,
    options?: { message?: string; description?: string; status?: number },
  ) => {
    console.warn("An error occured", options);
    return rep.status(options?.status ?? 500).send({
      message: options?.message ?? "Unhandled error occured",
      success: false,
    });
  };
}
