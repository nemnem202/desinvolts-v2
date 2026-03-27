import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma-client";
import { Configuration, NavLink, Video } from "@/prisma/generated/prisma/client";
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

    return this.execute(async () => {
      await prisma.$transaction(async (tx) => {
        await tx.homePage.deleteMany();
        await tx.homePage.create({
          data: {
            id: 1,
            title: this.mapText(data.title),
            subtitle: this.mapText(data.subtitle),
            actualityTitle: this.mapText(data.actualityTitle),
            paragraph: this.mapText(data.presentationParagraph),
            banner: this.mapImg(data.banner),
            pres_image: this.mapImg(data.presentationImage),
            carousel: {
              create: {
                images: {
                  create: data.carousel.images.map((img) => ({
                    position: img.position,
                    image: this.mapImg(img.image),
                  })),
                },
              },
            },
            posts: {
              create: data.posts.map((p) => ({
                date: p.date,
                title: this.mapText(p.title),
                images: {
                  create: p.images.map((i) => ({
                    position: i.position,
                    image: this.mapImg(i.image),
                  })),
                },
                paragraphs: this.mapParagraphs(p.paragraphs),
              })),
            },
          },
        });
      });
    });
  }

  static async setConnexion(data: ConnexionPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
      await prisma.connexionPage.deleteMany();
      await prisma.connexionPage.create({
        data: { id: 1, title: this.mapText(data.title) },
      });
    });
  }

  static async setContact(data: ContactPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
      await prisma.contactPage.deleteMany();
      await prisma.contactPage.create({
        data: {
          id: 1,
          title: this.mapText(data.title),
          subtitle: this.mapText(data.subtitle),
          paragraph: this.mapText(data.paragraph),
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

    return this.execute(async () => {
      await prisma.datesPage.deleteMany();
      await prisma.datesPage.create({
        data: {
          id: 1,
          title: this.mapText(data.title),
          prevTitle: this.mapText(data.prevTitle),
          nextTitle: this.mapText(data.nextTitle),
          dates: {
            create: data.dates.map((date) => ({
              date: date.date,
              adress: this.mapText(date.adress),
              city: this.mapText(date.city),
              image: this.mapImg(date.image),
              title: this.mapText(date.title),
              paragraphs: this.mapParagraphs(date.paragraphs),
            })),
          },
        },
      });
    });
  }

  static async setGroupe(data: GroupePageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
      await prisma.groupPage.deleteMany();
      await prisma.groupPage.create({
        data: {
          id: 1,
          title: this.mapText(data.title),
          image: this.mapImg(data.presentation_image),
          firstSectionParagraphs: {
            create: data.first_section_paragraphs.map((p) => ({
              position: p.position,
              paragraph: this.mapText(p.paragraph),
            })),
          },
          secondSectionParagraphs: {
            create: data.second_section_paragraphs.map((p) => ({
              position: p.position,
              paragraph: this.mapText(p.paragraph),
            })),
          },
          trombinoscropeItems: {
            create: data.trombinoscope.map((item) => ({
              position: item.position,
              color: item.color,
              title: this.mapText(item.title),
              image: this.mapImg(item.image),
              paragraphs: this.mapParagraphs(item.paragraphs),
            })),
          },
        },
      });
    });
  }

  static async setMedias(data: MediasPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
      await prisma.mediasPage.deleteMany();
      await prisma.mediasPage.create({
        data: {
          id: 1,
          title: this.mapText(data.title),
          picturesTitle: this.mapText(data.pictures_section_title),
          videoTitle: this.mapText(data.video_section_title),
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
              image: d.image ? this.mapImg(d.image) : undefined,
              video: d.video ? this.mapVideo(d.video) : undefined,
            })),
          },
        },
      });
    });
  }

  static async setNousEcouter(data: NousEcouterPageContent | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
      await prisma.sonPage.deleteMany();
      await prisma.sonPage.create({
        data: {
          id: 1,
          title: this.mapText(data.title),
          albums: {
            create: data.albums.map((a) => ({
              cover: this.mapImg(a.cover),
              paragraphs: this.mapParagraphs(a.paragraphs),
              title: this.mapText(a.title),
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

    return this.execute(async () => {
      await prisma.$transaction(async (tx) => {
        await tx.configuration.deleteMany();
        await tx.configuration.create({ data });
      });
    });
  }

  static async setNavlinks(data: NavLink[] | undefined): Promise<ServiceResult> {
    if (!data) return { success: false, error: "Undefined data" };

    return this.execute(async () => {
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
      this.setConfig(data.config),
      this.setNavlinks(data.navlinks),
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
