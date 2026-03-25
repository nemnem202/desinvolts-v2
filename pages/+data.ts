import { PageContext } from "vike/types";
import { UAParser } from "ua-parser-js";
import { ScreenSizeType } from "@/providers/screenSizeProvider";
import {
  BasePageContent,
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "@/types/page-contents";
import ApiHandler from "@/lib/apiHandler";
import { logger } from "@/lib/logger";
import { PageStateKey } from "@/types/contexts";

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

async function getPage<T>(path: string): Promise<T | null> {
  const page = await ApiHandler.get<T>(`http://backend:${process.env.BACKEND_PORT}/${path}`);
  if (page.success) {
    return page.body;
  }
  return null;
}

function convertToDates<T extends { date: Date }>(elements: T[]) {
  elements.forEach((e) => {
    e.date = new Date(e.date);
  });
}

export async function data(pageContext: PageContext): Promise<{
  screen: ScreenSizeType;
  stateKey: (typeof PageStateKey)[number];
  page: BasePageContent | null;
  updatePath: string;
}> {
  const screen = await getScreen(pageContext);
  let stateKey: (typeof PageStateKey)[number];
  let page: BasePageContent | null;
  let updatePath: string;

  switch (pageContext.urlPathname) {
    case "/":
      stateKey = "home";
      const homeContent = await getPage<HomePageContent>("home");
      if (homeContent) convertToDates(homeContent.posts);
      page = homeContent;
      updatePath = "home";
      break;
    case "/connexion":
      stateKey = "connexion";
      page = await getPage<ConnexionPageContent>("connexion");
      updatePath = "connexion-page";
      break;
    case "/contact":
      stateKey = "contact";
      const contactContent = await getPage<ContactPageContent>("contact");
      if (contactContent) convertToDates(contactContent.files);
      page = contactContent;
      updatePath = "contact";
      break;
    case "/dates":
      stateKey = "dates";
      const datesContent = await getPage<DatesPageContent>("dates");
      if (datesContent) convertToDates(datesContent.dates);
      page = datesContent;
      updatePath = "dates";
      break;
    case "/groupe":
      // @ts-ignore
      stateKey = "groupe";
      page = await getPage<GroupePageContent>("group");
      updatePath = "group";
      break;
    case "/médias":
    case "/medias":
      stateKey = "medias";
      page = await getPage<MediasPageContent>("medias");
      updatePath = "medias";
      break;
    case "/nous-écouter":
    case "/son":
      stateKey = "son";
      page = await getPage<NousEcouterPageContent>("son");
      updatePath = "son";
      break;
    default:
      stateKey = "default";
      page = await getPage<BasePageContent>("default");
      updatePath = "default";
  }
  return { screen, stateKey, page, updatePath };
}
export type Data = Awaited<ReturnType<typeof data>>;
