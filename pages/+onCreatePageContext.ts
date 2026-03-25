import { logger } from "@/lib/logger";
import getCurrentUserFromCookie from "@/server/middlewares/getCurrentUser";
import { PageContext } from "vike/types";

export async function onCreatePageContext(pageContext: PageContext) {
  return {
    ...pageContext,
  };
}
