import { logger } from "@/lib/logger";
import type { Configuration, NavLink } from "@/prisma/generated/prisma/client";
import SetPageController, { type ServiceResult } from "@/server/controller/set-page-controller";
import authenticateUser from "@/server/middlewares/authenticateUser";
import type { PageKey, PageRegistry } from "@/types/contexts";
import type {
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "@/types/page-contents";

const handlers = {
  home: (state: HomePageContent) => SetPageController.setHome(state),
  connexion: (state: ConnexionPageContent) => SetPageController.setConnexion(state),
  contact: (state: ContactPageContent) => SetPageController.setContact(state),
  dates: (state: DatesPageContent) => SetPageController.setDates(state),
  groupe: (state: GroupePageContent) => SetPageController.setGroupe(state),
  medias: (state: MediasPageContent) => SetPageController.setMedias(state),
  son: (state: NousEcouterPageContent) => SetPageController.setNousEcouter(state),
  default: (state: { config: Configuration; navlinks: NavLink[] }) =>
    SetPageController.setDefault(state),
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
