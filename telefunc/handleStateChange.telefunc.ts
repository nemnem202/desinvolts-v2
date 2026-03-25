import SetPageController from "@/server/controller/set-page-controller";
import type { PageKey } from "@/types/contexts";

export const handleStateChange = async (state: any, path: PageKey) => {
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
};
