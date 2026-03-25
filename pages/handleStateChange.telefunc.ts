import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";

export const handleStateChange = async (state: any, path: string) => {
  const fetchUrl = `/api/${path}`;
  logger.info("State change requested: ", fetchUrl);
  await ApiHandler.post(fetchUrl, state);
};
