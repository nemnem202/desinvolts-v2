import { logger } from "@/lib/logger";
import PageController from "@/server/controller/get-page-controller";
import { BasePageContent } from "@/types/page-contents";

export const getAllPageStates = async (): Promise<(BasePageContent | undefined)[]> => {
  const data = await Promise.all([
    PageController.getHome(),
    PageController.getConnexion(),
    PageController.getContact(),
    PageController.getDates(),
    PageController.getDefault(),
    PageController.getGroupe(),
    PageController.getMedias(),
    PageController.getNousEcouter(),
  ]);
  logger.info("All pages requested");
  return data;
};
