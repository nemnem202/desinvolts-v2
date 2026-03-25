import { FastifyReply, FastifyRequest } from "fastify";
import { ZodSchema } from "zod";

export const validateBody =
  <T>(schema: ZodSchema<T>) =>
  async (req: FastifyRequest, rep: FastifyReply) => {
    const result = schema.safeParse(req.body);
    console.log("try to verify schema...");

    if (!result.success) {
      console.log("schema failed for", req.url);
      console.log("ERROR : ", result.error);
      return rep.status(400).send({
        error: "Validation error",
        details: result.error,
      });
    }

    console.log("schema is ok !");
    req.body = result.data as any;
  };
