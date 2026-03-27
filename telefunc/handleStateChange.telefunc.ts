import { logger } from "@/lib/logger";
import SetPageController, { ServiceResult } from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import type { PageKey, PageRegistry } from "@/types/contexts";

const handlers = {
  home: (state: any) => SetPageController.setHome(state),
  connexion: (state: any) => SetPageController.setConnexion(state),
  contact: (state: any) => SetPageController.setContact(state),
  dates: (state: any) => SetPageController.setDates(state),
  groupe: (state: any) => SetPageController.setGroupe(state),
  medias: (state: any) => SetPageController.setMedias(state),
  son: (state: any) => SetPageController.setNousEcouter(state),
  default: (state: any) => SetPageController.setDefault(state),
} satisfies {
  [K in PageKey]: (state: PageRegistry[K]) => Promise<ServiceResult>;
};

const callHandler = async <K extends PageKey>(path: K, state: PageRegistry[K]) => {
  const handler = handlers[path] as (state: PageRegistry[K]) => Promise<ServiceResult>;
  return handler(state);
};

export const onHandleStateChange = async <K extends PageKey>(state: PageRegistry[K], path: K) => {
  try {
    logger.info("Handle state change called", "current user: ");

    const { isAuthenticated } = await authenticateUser();

    if (!isAuthenticated) throw new Error();

    await callHandler(path, state);
    await SetPageController.setNavlinks(state.navlinks);
    await SetPageController.setConfig(state.config);
    return { succes: true };
  } catch (err) {
    logger.error("Update state error", err);
    return null;
  }
};
