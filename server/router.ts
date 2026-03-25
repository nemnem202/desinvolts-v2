import { FastifyInstance } from "fastify";
import { validateBody } from "./middlewares/validateBody";
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
import {
  BasePageContentSchema,
  ConnexionpageContentSchema,
  ContactPageContentSchema,
  DatesPageContentSchema,
  GroupePageContentSchema,
  HomePageContentSchema,
  MediasPageContentSchema,
  NousEcouterPageContentSchema,
} from "@/config/zodSchemas";
import ConnexionController from "./controller/connexion-controller";
import PageController from "./controller/get-page-controller";
import SetPageController from "./controller/set-page-controller";

const router = (app: FastifyInstance) => {
  app.post("/connexion", ConnexionController.login);
  app.get("/home", PageController.getHome);
  app.get("/connexion", PageController.getConnexion);
  app.get("/contact", PageController.getContact);
  app.get("/dates", PageController.getDates);
  app.get("/group", PageController.getGroupe);
  app.get("/medias", PageController.getMedias);
  app.get("/son", PageController.getNousEcouter);
  app.get("/default", PageController.getDefault);

  app.post(
    "/home",
    {
      preHandler: validateBody(HomePageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setHome(req.body as HomePageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/connexion-page",
    {
      preHandler: validateBody(ConnexionpageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setConnexion(req.body as ConnexionPageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/contact",
    {
      preHandler: validateBody(ContactPageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setContact(req.body as ContactPageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/dates",
    {
      preHandler: validateBody(DatesPageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setDates(req.body as DatesPageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/group",
    {
      preHandler: validateBody(GroupePageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setGroupe(req.body as GroupePageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/medias",
    {
      preHandler: validateBody(MediasPageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setMedias(req.body as MediasPageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/son",
    {
      preHandler: validateBody(NousEcouterPageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setNousEcouter(req.body as NousEcouterPageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
  app.post(
    "/default",
    {
      preHandler: validateBody(BasePageContentSchema),
    },
    async (req, rep) => {
      await SetPageController.setDefault(req.body as BasePageContent);
      await SetPageController.setConfig((req.body as BasePageContent).config);
      await SetPageController.setNavlinks((req.body as BasePageContent).navlinks);
      return rep.status(200).send();
    },
  );
};

export default router;
