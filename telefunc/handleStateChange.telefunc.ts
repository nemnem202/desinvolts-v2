import { logger } from "@/lib/logger";
import SetPageController, { ServiceResult } from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import type { PageKey, PageRegistry } from "@/types/contexts";

const handlers = {
  home: SetPageController.setHome,
  connexion: SetPageController.setConnexion,
  contact: SetPageController.setContact,
  dates: SetPageController.setDates,
  groupe: SetPageController.setGroupe,
  medias: SetPageController.setMedias,
  son: SetPageController.setNousEcouter,
  default: SetPageController.setDefault,
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
  } catch (err) {
    logger.error("Update state error", err);
    return null;
  }
};
