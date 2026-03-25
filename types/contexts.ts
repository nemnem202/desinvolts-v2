import { Context, createContext } from "react";
import {
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

export const contexts: Record<string, Context<StateContent<any> | null>> = {
  home: HomePageContext,
  connexion: ConnexionPageContext,
  contact: ContactPageContext,
  dates: DatesPageContext,
  groupe: GroupePageContext,
  medias: MediasPageContext,
  son: SonPageContext,
  default: DefaultStateContext,
};

export const PageStateKey = [
  "home",
  "connexion",
  "contact",
  "dates",
  "group",
  "medias",
  "son",
  "default",
] as const;

type ExtractContent<C> = C extends Context<StateContent<infer T> | null> ? T : never;

export type PageContentMap = {
  [K in keyof typeof contexts]: ExtractContent<(typeof contexts)[K]>;
};

export type AbstractPageState = {
  [K in keyof PageContentMap]: {
    page: K;
    content: PageContentMap[K];
  };
}[keyof PageContentMap];
