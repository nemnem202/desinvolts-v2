import { logger } from "@/lib/logger";
import PageController from "@/server/controller/get-page-controller";
import { PageContentMap } from "@/types/contexts";

export const getAllPageStates = async (): Promise<PageContentMap> => {
  const [home, connexion, contact, dates, def, groupe, medias, son] = await Promise.all([
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

  return {
    home,
    connexion,
    contact,
    dates,
    default: def,
    groupe,
    medias,
    son,
  };
};
