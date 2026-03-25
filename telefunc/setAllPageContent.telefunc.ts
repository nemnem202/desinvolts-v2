import { logger } from "@/lib/logger";
import SetPageController from "@/server/controller/set-page-controller";
import { PageContentMap } from "@/types/contexts";

export const setAllPages = async (data: PageContentMap): Promise<{ success: boolean }> => {
  const promises = await Promise.all([
    SetPageController.setHome(data.home),
    SetPageController.setConnexion(data.connexion),
    SetPageController.setContact(data.contact),
    SetPageController.setDates(data.dates),
    SetPageController.setDefault(data.default),
    SetPageController.setGroupe(data.groupe),
    SetPageController.setMedias(data.medias),
    SetPageController.setNousEcouter(data.son),
  ]);
  logger.info("All pages requested");

  return { success: promises.some((promise) => promise.success === false) };
};
