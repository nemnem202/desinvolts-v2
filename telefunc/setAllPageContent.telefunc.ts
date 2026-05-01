import { logger } from "@/lib/logger";
import SetPageController from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";

export const setAllPages = async (dataFile: File): Promise<{ success: boolean }> => {
  try {
    const { isAuthenticated } = await authenticateUser();
    if (!isAuthenticated) throw new Error();

    const text = await dataFile.text();
    const data = JSON.parse(text);

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
  } catch (error) {
    logger.error("Une erreur est survenue lors de l'importation d'une sauvegares", error);
    return { success: false };
  }
};
