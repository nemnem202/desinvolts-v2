import { Context, createContext } from "react";
import {
  BasePageContent,
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "./page-contents";
import { StateContent } from "@/providers/stateProvider";

export const DefaultStateContext = createContext<StateContent<any> | null>(null);
export const HomePageContext = createContext<StateContent<HomePageContent> | null>(null);
export const ConnexionPageContext = createContext<StateContent<ConnexionPageContent> | null>(null);
export const ContactPageContext = createContext<StateContent<ContactPageContent> | null>(null);
export const DatesPageContext = createContext<StateContent<DatesPageContent> | null>(null);
export const GroupePageContext = createContext<StateContent<GroupePageContent> | null>(null);
export const MediasPageContext = createContext<StateContent<MediasPageContent> | null>(null);
export const SonPageContext = createContext<StateContent<NousEcouterPageContent> | null>(null);

export const PageStateKey = [
  "home",
  "connexion",
  "contact",
  "dates",
  "groupe",
  "medias",
  "son",
  "default",
] as const;

export type PageRegistry = {
  home: HomePageContent;
  connexion: ConnexionPageContent;
  contact: ContactPageContent;
  dates: DatesPageContent;
  groupe: GroupePageContent;
  medias: MediasPageContent;
  son: NousEcouterPageContent;
  default: BasePageContent;
};

export type PageKey = keyof PageRegistry;

export const contexts: {
  [K in PageKey]: Context<StateContent<PageRegistry[K]> | null>;
} = {
  home: HomePageContext,
  connexion: ConnexionPageContext,
  contact: ContactPageContext,
  dates: DatesPageContext,
  groupe: GroupePageContext,
  medias: MediasPageContext,
  son: SonPageContext,
  default: DefaultStateContext,
};

export type PageContentMap = {
  [K in PageKey]: PageRegistry[K] | undefined;
};

export type AbstractPageState = {
  [K in PageKey]: {
    page: K;
    content: PageRegistry[K];
  };
}[PageKey];
