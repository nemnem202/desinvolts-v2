import { type Context, createContext } from "react";
import type { StateContent } from "@/providers/stateProvider";
import type {
  BasePageContent,
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "./page-contents";

export const DefaultStateContext = createContext<StateContent<"default"> | null>(null);
export const HomePageContext = createContext<StateContent<"home"> | null>(null);
export const ConnexionPageContext = createContext<StateContent<"connexion"> | null>(null);
export const ContactPageContext = createContext<StateContent<"contact"> | null>(null);
export const DatesPageContext = createContext<StateContent<"dates"> | null>(null);
export const GroupePageContext = createContext<StateContent<"groupe"> | null>(null);
export const MediasPageContext = createContext<StateContent<"medias"> | null>(null);
export const SonPageContext = createContext<StateContent<"son"> | null>(null);

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
  [K in PageKey]: Context<StateContent<K> | null>;
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
