import type { FastifyReply, RouteGenericInterface } from "fastify";
import { logger } from "@/lib/logger";
import type { ApiResponse } from "@/types/server";

interface DefaultResponseRoute extends RouteGenericInterface {
  Reply: ApiResponse<any>;
}

export abstract class Controller {
  static sendError = (
    rep: FastifyReply<DefaultResponseRoute>,
    options?: { message?: string; description?: string; status?: number }
  ) => {
    logger.error("An error occured", options);
    return rep.status(options?.status ?? 500).send({
      message: options?.message ?? "Unhandled error occured",
      success: false,
    });
  };
}
