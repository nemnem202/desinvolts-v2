import { logger } from "@/lib/logger";
import SetPageController from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import type { PageContentMap } from "@/types/contexts";

export const setAllPages = async (data: PageContentMap): Promise<{ success: boolean }> => {
  try {
    logger.info("Handle state change called", "current user: ");

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

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
  } catch {
    return { success: false };
  }
};
