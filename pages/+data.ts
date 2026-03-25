import { PageContext } from "vike/types";
import { UAParser } from "ua-parser-js";
import { ScreenSizeType } from "@/providers/screenSizeProvider";
import { BasePageContent } from "@/types/page-contents";
import { logger } from "@/lib/logger";
import { PageStateKey } from "@/types/contexts";
import PageController from "@/server/controller/get-page-controller";

async function getScreen(pageContext: PageContext): Promise<ScreenSizeType> {
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

export async function data(pageContext: PageContext): Promise<{
  screen: ScreenSizeType;
  stateKey: (typeof PageStateKey)[number];
  page: BasePageContent | undefined;
}> {
  const screen = await getScreen(pageContext);
  let stateKey: (typeof PageStateKey)[number];
  let page: BasePageContent | undefined;

  switch (pageContext.urlPathname) {
    case "/":
      stateKey = "home";
      const homeContent = await PageController.getHome();
      if (homeContent) convertToDates(homeContent.posts);
      page = homeContent;

      break;
    case "/connexion":
      stateKey = "connexion";
      page = await PageController.getConnexion();
      break;
    case "/contact":
      stateKey = "contact";
      const contactContent = await PageController.getContact();
      if (contactContent) convertToDates(contactContent.files);
      page = contactContent;
      break;
    case "/dates":
      stateKey = "dates";
      const datesContent = await PageController.getDates();
      if (datesContent) convertToDates(datesContent.dates);
      page = datesContent;
      break;
    case "/groupe":
      // @ts-ignore
      stateKey = "groupe";
      page = await PageController.getGroupe();
      break;
    case "/médias":
    case "/medias":
      stateKey = "medias";
      page = await PageController.getMedias();
      break;
    case "/nous-écouter":
    case "/son":
      stateKey = "son";
      page = await PageController.getNousEcouter();
      break;
    default:
      stateKey = "default";
      page = await PageController.getDefault();
  }
  return { screen, stateKey, page };
}
export type Data = Awaited<ReturnType<typeof data>>;
