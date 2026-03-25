import { logger } from "@/lib/logger";
import SetPageController from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import type { PageKey } from "@/types/contexts";

export const onHandleStateChange = async (state: any, path: PageKey) => {
  try {
    logger.info("Handle state change called", "current user: ");

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    switch (path) {
      case "home":
        return SetPageController.setHome(state);
      case "connexion":
        return SetPageController.setConnexion(state);
      case "contact":
        return SetPageController.setContact(state);
      case "dates":
        return SetPageController.setDates(state);
      case "default":
        return SetPageController.setDefault(state);
      case "groupe":
        return SetPageController.setGroupe(state);
      case "medias":
        return SetPageController.setMedias(state);
      case "son":
        return SetPageController.setNousEcouter(state);
    }
  } catch {
    return null;
  }
};
