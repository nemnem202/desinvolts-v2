import { UAParser } from "ua-parser-js";
import type { PageContextServer } from "vike/types";
import { logger } from "@/lib/logger";
import type { ScreenSizeType } from "@/providers/screenSizeProvider";
import PageController from "@/server/controller/get-page-controller";
import getCurrentUserFromCookie from "@/server/middlewares/getCurrentUser";
import type { PageStateKey } from "@/types/contexts";
import type { BasePageContent } from "@/types/page-contents";

async function getScreen(pageContext: PageContextServer): Promise<ScreenSizeType> {
  const ua = pageContext.headers ? (pageContext.headers["user-agent"] ?? "") : "";
  logger.info("User agent: ", ua);
  const parser = new UAParser(ua);
  const device = parser.getDevice().type;
  logger.info("Device requested: ", device);
  if (device && ["mobile", "wearable", "embedded"].includes(device)) {
    return "sm";
  } else if (device === "tablet") {
    return "md";
  } else {
    return "lg";
  }
}

function convertToDates<T extends { date: Date }>(elements: T[]) {
  elements.forEach((e) => {
    e.date = new Date(e.date);
  });
}

async function getCurrentUser(pageContext: PageContextServer): Promise<{
  username: string;
} | null> {
  const cookie = pageContext.headers ? pageContext.headers.cookie : null;
  let currentUser: { username: string } | null = null;
  if (cookie) {
    logger.info("Page context cookie: ", `${cookie.slice(0, 15)}...`);
    currentUser = await getCurrentUserFromCookie(cookie);
  }
  return currentUser;
}

export async function data(pageContext: PageContextServer): Promise<{
  screen: ScreenSizeType;
  pageKey: (typeof PageStateKey)[number];
  page: BasePageContent | undefined;
  currentUser: {
    username: string;
  } | null;
}> {
  const screen = await getScreen(pageContext);
  let pageKey: (typeof PageStateKey)[number];
  let page: BasePageContent | undefined;
  const currentUser = await getCurrentUser(pageContext);
  switch (pageContext.urlPathname) {
    case "/": {
      pageKey = "home";
      const homeContent = await PageController.getHome();
      if (homeContent) convertToDates(homeContent.posts);
      page = homeContent;

      break;
    }
    case "/connexion":
      pageKey = "connexion";
      page = await PageController.getConnexion();
      break;
    case "/contact": {
      pageKey = "contact";
      const contactContent = await PageController.getContact();
      if (contactContent) convertToDates(contactContent.files);
      page = contactContent;
      break;
    }
    case "/dates": {
      pageKey = "dates";
      const datesContent = await PageController.getDates();
      if (datesContent) convertToDates(datesContent.dates);
      page = datesContent;
      break;
    }
    case "/groupe":
      // @ts-expect-error
      pageKey = "groupe";
      page = await PageController.getGroupe();
      break;
    case "/médias":
    case "/medias":
      pageKey = "medias";
      page = await PageController.getMedias();
      break;
    case "/nous-écouter":
    case "/son":
      pageKey = "son";
      page = await PageController.getNousEcouter();
      break;
    default:
      pageKey = "default";
      page = await PageController.getDefault();
  }
  return { screen, pageKey, page, currentUser };
}
export type Data = Awaited<ReturnType<typeof data>>;
