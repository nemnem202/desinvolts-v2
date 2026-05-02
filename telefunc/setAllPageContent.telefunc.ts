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

    // Correction : success est vrai seulement si TOUS ont réussi
    const allSuccessful = promises.every((p) => p.success === true);
    return { success: allSuccessful };
  } catch (error) {
    logger.error("Erreur import backup", error);
    return { success: false };
  }
};
