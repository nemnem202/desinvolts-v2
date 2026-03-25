import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { Controller } from "./controller";
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
import { prisma } from "@/lib/prisma-client";

const GET_TEXT = { include: { hyperlinks: true } };

const GET_IMAGES = {
  include: { image: true },
};

const GET_VIDEOS = {
  include: { video: true },
};

const GET_MEDIA = {
  images: GET_IMAGES,
  videos: GET_VIDEOS,
};

const GET_CAROUSEL = {
  include: GET_MEDIA,
};

const GET_PARAGRAPHS = {
  include: {
    paragraph: {
      include: {
        hyperlinks: true,
      },
    },
  },
};

const GET_POST = {
  include: {
    title: true,
    images: GET_IMAGES,
    videos: GET_VIDEOS,
    paragraphs: GET_PARAGRAPHS,
  },
};
const GET_FILE = {
  include: {
    file: true,
  },
};

const GET_DATES = {
  include: {
    event: {
      include: {
        title: { include: { hyperlinks: true } },
        image: true,
        paragraphs: GET_PARAGRAPHS,
      },
    },
  },
};

const GET_TROMBINOSCOPE = {
  include: {
    items: {
      include: {
        image: true,
        paragraphs: GET_PARAGRAPHS,
        title: true,
      },
    },
  },
};

const GET_ALBUMS = {
  include: {
    album: {
      include: {
        cover: true,
        paragraphs: GET_PARAGRAPHS,
        title: GET_TEXT,
      },
    },
  },
};

export default class PageController extends Controller {
  static async getHome() {
    const content = await prisma.homePage.findFirst({
      include: {
        title: GET_TEXT,
        subtitle: GET_TEXT,
        actualityTitle: GET_TEXT,
        paragraph: GET_TEXT,
        banner: true,
        pres_image: true,
        posts: GET_POST,
        carousel: GET_CAROUSEL,
      },
    });

    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: HomePageContent = {
      navlinks,
      config,
      ...content,
      presentationParagraph: content.paragraph,
      presentationImage: content.pres_image,
    };

    return page;
  }

  static async getConnexion() {
    const content = await prisma.connexionPage.findFirst({
      include: {
        title: GET_TEXT,
      },
    });
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: ConnexionPageContent = {
      config,
      navlinks,
      ...content,
    };
    return page;
  }

  static async getContact() {
    const content = await prisma.contactPage.findFirst({
      include: {
        paragraph: GET_TEXT,
        subtitle: GET_TEXT,
        title: GET_TEXT,
        files: true,
      },
    });
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;
    const page: ContactPageContent = {
      config,
      navlinks,
      ...content,
    };

    return page;
  }
  static async getDates() {
    const content = await prisma.datesPage.findFirst({
      omit: {
        id: true,
        nextTitleId: true,
        prevTitleId: true,
        titleId: true,
      },
      include: {
        dates: {
          include: {
            adress: GET_TEXT,
            city: GET_TEXT,
            image: true,
            title: GET_TEXT,
            paragraphs: GET_PARAGRAPHS,
          },
          omit: {
            datePageId: true,
            imageId: true,
            titleId: true,
            addressId: true,
            cityId: true,
          },
        },

        title: GET_TEXT,
        nextTitle: GET_TEXT,
        prevTitle: GET_TEXT,
      },
    });
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: DatesPageContent = {
      config,
      navlinks,
      ...content,
    };

    return page;
  }
  static async getGroupe() {
    const content = await prisma.groupPage.findFirst({
      include: {
        firstSectionParagraphs: GET_PARAGRAPHS,
        secondSectionParagraphs: GET_PARAGRAPHS,
        image: true,
        title: GET_TEXT,
        trombinoscropeItems: {
          include: {
            image: true,
            paragraphs: GET_PARAGRAPHS,
            title: GET_TEXT,
          },
        },
      },
    });
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: GroupePageContent = {
      config,
      navlinks,
      first_section_paragraphs: content.firstSectionParagraphs,
      second_section_paragraphs: content.secondSectionParagraphs,
      presentation_image: content.image,
      title: content.title,
      trombinoscope: content.trombinoscropeItems,
    };

    return page;
  }
  static async getNousEcouter() {
    console.log("Nous écouter");
    const content = await prisma.sonPage.findFirst({
      include: {
        title: GET_TEXT,
        albums: {
          include: {
            appleMusicUrl: true,
            deezerUrl: true,
            spotifyUrl: true,
            cover: true,
            paragraphs: GET_PARAGRAPHS,
            title: GET_TEXT,
          },
        },
      },
    });

    console.log("CONTENT", content);

    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: NousEcouterPageContent = {
      config,
      navlinks,
      title: content.title,
      albums: content.albums,
    };

    console.log(page);

    return page;
  }
  static async getMedias() {
    const content = await prisma.mediasPage.findFirst({
      omit: {
        titleId: true,
        picturesTitleId: true,
        videoTitleId: true,
      },
      include: {
        title: GET_TEXT,
        picturesTitle: GET_TEXT,
        videoTitle: GET_TEXT,
        videos: true,
        windows: {
          include: {
            image: true,
            video: true,
          },
        },
      },
    });
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!content || !config) return;

    const page: MediasPageContent = {
      config,
      navlinks,
      title: content.title,
      pictures_section_title: content.picturesTitle,
      video_section_title: content.videoTitle,
      windows: content.windows,
      videos: content.videos,
    };

    return page;
  }

  static async getDefault() {
    const navlinks = await prisma.navLink.findMany();
    const config = await prisma.configuration.findFirst();

    if (!config) return;

    const page: BasePageContent = {
      config,
      navlinks,
    };

    return page;
  }
}
