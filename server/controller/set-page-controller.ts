import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma-client";
import type { Configuration, NavLink, Video } from "@/prisma/generated/prisma/client";
import type {
  BasePageContent,
  ConnexionPageContent,
  ContactPageContent,
  DatesPageContent,
  GroupePageContent,
  HomePageContent,
  MediasPageContent,
  NousEcouterPageContent,
} from "@/types/page-contents";
export type ServiceResult = { success: true } | { success: false; error: unknown };

export default class SetPageController {
  private static mapText = (tl: any) => ({
    create: {
      content: tl.content,
      hyperlinks: {
        create:
          tl.hyperlinks?.map((h: any) => ({
            text: h.text,
            link: h.link,
          })) || [],
      },
    },
  });

  private static mapImg = (img: any) => ({
    connectOrCreate: {
      where: { source: img.source },
      create: { source: img.source, alt: img.alt },
    },
  });

  private static mapVideo = (video: Video) => ({
    connectOrCreate: {
      where: { url: video.url },
      create: { url: video.url, description: video.description },
    },
  });

  private static mapFile = (file: any) => ({
    connectOrCreate: {
      where: { downloadUrl: file.downloadUrl },
      create: { filename: file.filename, downloadUrl: file.downloadUrl },
    },
  });

  private static mapParagraphs = (paragraphs: any[]) => ({
    create: paragraphs.map((p) => ({
      position: p.position,
      paragraph: this.mapText(p.paragraph),
    })),
  });

  private static async execute(fn: () => Promise<void>): Promise<ServiceResult> {
    try {
      await fn();

      return { success: true };
    } catch (error) {
      logger.error("Service error", error);
      return { success: false, error };
    }
  }

  static async setHome(data: HomePageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.$transaction(async (tx) => {
        await tx.homePage.deleteMany();
        await tx.homePage.create({
          data: {
            id: 1,
            title: SetPageController.mapText(data.title),
            subtitle: SetPageController.mapText(data.subtitle),
            actualityTitle: SetPageController.mapText(data.actualityTitle),
            paragraph: SetPageController.mapText(data.presentationParagraph),
            banner: SetPageController.mapImg(data.banner),
            pres_image: SetPageController.mapImg(data.presentationImage),
            carousel: {
              create: {
                images: {
                  create: data.carousel.images.map((img) => ({
                    position: img.position,
                    image: SetPageController.mapImg(img.image),
                  })),
                },
              },
            },
            posts: {
              create: data.posts.map((p) => ({
                date: p.date,
                title: SetPageController.mapText(p.title),
                images: {
                  create: p.images.map((i) => ({
                    position: i.position,
                    image: SetPageController.mapImg(i.image),
                  })),
                },
                paragraphs: SetPageController.mapParagraphs(p.paragraphs),
              })),
            },
          },
        });
      });
    });
  }

  static async setConnexion(data: ConnexionPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.connexionPage.deleteMany();
      await prisma.connexionPage.create({
        data: { id: 1, title: SetPageController.mapText(data.title) },
      });
    });
  }

  static async setContact(data: ContactPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.contactPage.deleteMany();
      await prisma.contactPage.create({
        data: {
          id: 1,
          title: SetPageController.mapText(data.title),
          subtitle: SetPageController.mapText(data.subtitle),
          paragraph: SetPageController.mapText(data.paragraph),
          files: {
            create: data.files.map((f) => ({
              date: f.date,
              downloadUrl: f.downloadUrl,
              filename: f.filename,
            })),
          },
        },
      });
    });
  }

  static async setDates(data: DatesPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.datesPage.deleteMany();
      await prisma.datesPage.create({
        data: {
          id: 1,
          title: SetPageController.mapText(data.title),
          prevTitle: SetPageController.mapText(data.prevTitle),
          nextTitle: SetPageController.mapText(data.nextTitle),
          dates: {
            create: data.dates.map((date) => ({
              date: date.date,
              adress: SetPageController.mapText(date.adress),
              city: SetPageController.mapText(date.city),
              image: SetPageController.mapImg(date.image),
              title: SetPageController.mapText(date.title),
              paragraphs: SetPageController.mapParagraphs(date.paragraphs),
            })),
          },
        },
      });
    });
  }

  static async setGroupe(data: GroupePageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.groupPage.deleteMany();
      await prisma.groupPage.create({
        data: {
          id: 1,
          title: SetPageController.mapText(data.title),
          image: SetPageController.mapImg(data.presentation_image),
          firstSectionParagraphs: {
            create: data.first_section_paragraphs.map((p) => ({
              position: p.position,
              paragraph: SetPageController.mapText(p.paragraph),
            })),
          },
          secondSectionParagraphs: {
            create: data.second_section_paragraphs.map((p) => ({
              position: p.position,
              paragraph: SetPageController.mapText(p.paragraph),
            })),
          },
          trombinoscropeItems: {
            create: data.trombinoscope.map((item) => ({
              position: item.position,
              color: item.color,
              title: SetPageController.mapText(item.title),
              image: SetPageController.mapImg(item.image),
              paragraphs: SetPageController.mapParagraphs(item.paragraphs),
            })),
          },
        },
      });
    });
  }

  static async setMedias(data: MediasPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.mediasPage.deleteMany();
      await prisma.mediasPage.create({
        data: {
          id: 1,
          title: SetPageController.mapText(data.title),
          picturesTitle: SetPageController.mapText(data.pictures_section_title),
          videoTitle: SetPageController.mapText(data.video_section_title),
          videos: {
            create: data.videos.map((v) => ({
              description: v.description,
              url: v.url,
            })),
          },
          windows: {
            create: data.windows.map((d) => ({
              height: d.height,
              width: d.width,
              x: d.x,
              y: d.y,
              zIndex: d.zIndex,
              zIndexPriorityFactor: d.zIndexPriorityFactor,
              image: d.image ? SetPageController.mapImg(d.image) : undefined,
              video: d.video ? SetPageController.mapVideo(d.video) : undefined,
            })),
          },
        },
      });
    });
  }

  static async setNousEcouter(data: NousEcouterPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.sonPage.deleteMany();
      await prisma.sonPage.create({
        data: {
          id: 1,
          title: SetPageController.mapText(data.title),
          albums: {
            create: data.albums.map((a) => ({
              position: a.position,
              cover: SetPageController.mapImg(a.cover),
              paragraphs: SetPageController.mapParagraphs(a.paragraphs),
              title: SetPageController.mapText(a.title),
              spotifyUrl: a.spotifyUrl
                ? {
                    create: {
                      text: a.spotifyUrl.text,
                      link: a.spotifyUrl.link,
                      position: a.spotifyUrl.position,
                    },
                  }
                : undefined,
              deezerUrl: a.deezerUrl
                ? {
                    create: {
                      text: a.deezerUrl.text,
                      link: a.deezerUrl.link,
                      position: a.deezerUrl.position,
                    },
                  }
                : undefined,
              appleMusicUrl: a.appleMusicUrl
                ? {
                    create: {
                      text: a.appleMusicUrl.text,
                      link: a.appleMusicUrl.link,
                      position: a.appleMusicUrl.position,
                    },
                  }
                : undefined,
            })),
          },
        },
      });
    });
  }

  static async setConfig(data: Configuration | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.$transaction(async (tx) => {
        await tx.configuration.deleteMany();
        await tx.configuration.create({ data });
      });
    });
  }

  static async setNavlinks(data: NavLink[] | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return SetPageController.execute(async () => {
      await prisma.$transaction(async (tx) => {
        await tx.navLink.deleteMany();
        await tx.navLink.createMany({
          data: data.map(({ id, ...rest }) => rest),
        });
      });
    });
  }

  static async setDefault(data: BasePageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    const [config, nav] = await Promise.all([
      SetPageController.setConfig(data.config),
      SetPageController.setNavlinks(data.navlinks),
    ]);

    if (!config.success || !nav.success) {
      return {
        success: false,
        error: {
          config: config.success ? null : config.error,
          nav: nav.success ? null : nav.error,
        },
      };
    }

    return { success: true };
  }
}
