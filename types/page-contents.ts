import type { Configuration, Image, NavLink, Video } from "@/prisma/generated/prisma/client";
import type {
  Album,
  Carousel,
  DateEvent,
  DownloadableFile,
  EditableParagraphContent,
  EditableTextContent,
  ParagraphInGroup,
  PostData,
  TrombinoscopeElement,
  WindowProps,
} from "./db";

type JsonObject = Record<string, unknown>;

export interface BasePageContent extends JsonObject {
  navlinks: NavLink[];
  config: Configuration;
}
export interface HomePageContent extends BasePageContent {
  title: EditableTextContent;
  subtitle: EditableTextContent;
  banner: Image;
  presentationParagraph: EditableParagraphContent;
  presentationImage: Image;
  actualityTitle: EditableTextContent;
  posts: PostData[];
  carousel: Carousel;
}
export interface ConnexionPageContent extends BasePageContent {
  title: EditableTextContent;
  config: Configuration;
  navlinks: NavLink[];
}
export interface ContactPageContent extends BasePageContent {
  title: EditableTextContent;
  paragraph: EditableParagraphContent;
  subtitle: EditableTextContent;
  files: DownloadableFile[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface GroupePageContent extends BasePageContent {
  title: EditableTextContent;
  presentation_image: Image;
  first_section_paragraphs: ParagraphInGroup[];
  second_section_paragraphs: ParagraphInGroup[];
  trombinoscope: TrombinoscopeElement[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface MediasPageContent extends BasePageContent {
  title: EditableTextContent;
  video_section_title: EditableTextContent;
  pictures_section_title: EditableTextContent;
  videos: Video[];
  windows: WindowProps[];
  config: Configuration;
  navlinks: NavLink[];
}
export interface DatesPageContent extends BasePageContent {
  title: EditableTextContent;
  dates: DateEvent[];
  prevTitle: EditableTextContent;
  nextTitle: EditableTextContent;
  config: Configuration;
  navlinks: NavLink[];
}
export interface NousEcouterPageContent extends BasePageContent {
  title: EditableTextContent;
  albums: Album[];
  config: Configuration;
  navlinks: NavLink[];
}
