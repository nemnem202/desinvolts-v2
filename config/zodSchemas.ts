import { z } from "zod";

const MAX_ARRAY_SIZE = 1000;
const MSG_TROP_D_ELEMENTS =
  "Holà ! On a dépassé la limite des 1000 éléments. C'est déjà une sacrée liste, non ?";
const MSG_TEXTE_TROP_LONG = (max: number) =>
  `Oups, ce texte est un peu trop bavard ! Essayons de rester sous les ${max} caractères.`;
const MSG_URL_INVALIDE =
  "Mince, cette adresse web semble avoir perdu son chemin. Elle n'est pas valide !";
const MSG_EMAIL_INVALIDE =
  "On dirait que cette adresse email fait une fausse note. Peux-tu la vérifier ?";
const MSG_NOMBRE_ENTIER = "Ici, on a besoin d'un nombre entier, pas de virgules s'il vous plaît !";

export const ContactInfoSchema = z.object({
  id: z.number().int().default(1),
  email: z
    .string()
    .email({ message: MSG_EMAIL_INVALIDE })
    .max(254, { message: MSG_TEXTE_TROP_LONG(254) })
    .nullable()
    .optional(),
  phone: z
    .string()
    .max(50, { message: MSG_TEXTE_TROP_LONG(50) })
    .nullable()
    .optional(),
  deezerUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
  spotifyUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
  appleMusicUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
  bandlabUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
  itunesUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
});

export const AdminAccountSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Il nous faut un petit nom pour cet admin !" })
    .max(50, { message: MSG_TEXTE_TROP_LONG(50) }),
  passwordHash: z
    .string()
    .max(200, { message: "Le mot de passe est un peu trop complexe pour nos serveurs !" }),
});

export const FileSchema = z.object({
  id: z.number().int().default(1),
  downloadUrl: z.url({ message: MSG_URL_INVALIDE }).max(50).nullable().optional(),
  filename: z.string().max(50, { message: MSG_TEXTE_TROP_LONG(254) }),
  date: z.date(),
});

export const ConfigurationSchema = z.object({
  id: z.number().int(MSG_NOMBRE_ENTIER),
  showActualityPanel: z
    .boolean({ error: "C'est soit 'oui', soit 'non' (booléen) !" })
    .nullable()
    .optional(),
  mediaImagesContainerHeight: z.int({ message: "mediaImagesContainerHeight est requis" }),
});

export const NavLinkSchema = z.object({
  id: z.number().int(MSG_NOMBRE_ENTIER),
  text: z.string().max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
  link: z.string().max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
  position: z.number().int({ message: "La position doit être un rang précis (entier)." }),
});

export const ImageSchema = z.object({
  id: z.number().int(),
  alt: z
    .string()
    .max(5000, { message: MSG_TEXTE_TROP_LONG(5000) })
    .nullable()
    .optional(),
  source: z
    .string({ message: "L'image a besoin d'un lien (URL) valide pour s'afficher." })
    .max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
});

export const VideoSchema = z.object({
  id: z.number().int(),
  url: z.string().url({ message: MSG_URL_INVALIDE }).max(5000).nullable().optional(),
  description: z
    .string()
    .max(5000, { message: MSG_TEXTE_TROP_LONG(5000) })
    .nullable()
    .optional(),
});

export const HyperlinkSchema = z.object({
  id: z.number().int(),
  text: z.string().min(1, "Un lien sans texte, c'est un peu triste !").max(5000),
  link: z.string().url({ message: MSG_URL_INVALIDE }).max(5000),
});

export const EditableTextContentSchema = z.object({
  id: z.number().int(),
  content: z.string().max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
  hyperlinks: z.array(HyperlinkSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const EditableParagraphContentSchema = z.object({
  id: z.number().int(),
  content: z.string().max(8000, { message: MSG_TEXTE_TROP_LONG(8000) }),
  hyperlinks: z.array(HyperlinkSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const ParagraphInGroupSchema = z.object({
  position: z.number().int(MSG_NOMBRE_ENTIER),
  paragraph: EditableParagraphContentSchema,
});

export const DownloadableFileSchema = z.object({
  id: z.number().int(),
  filename: z.string().max(50, { message: MSG_TEXTE_TROP_LONG(50) }),
  downloadUrl: z.string().url({ message: MSG_URL_INVALIDE }).max(500),
  date: z.coerce.date({
    error: "Oups, cette date n'a pas l'air d'exister sur nos calendriers.",
  }),
});

export const PostDataSchema = z.object({
  id: z.number().int(),
  date: z.coerce.date(),
  title: z.object({
    id: z.number(),
    content: z.string().max(5000, { message: "Le titre de l'actu est un peu trop long." }),
  }),
  images: z
    .array(
      z.object({
        position: z.number().int(),
        image: ImageSchema,
      })
    )
    .max(MAX_ARRAY_SIZE, { message: "Ça fait beaucoup d'images pour un seul post, non ?" }),
  videos: z
    .array(
      z.object({
        video: VideoSchema,
      })
    )
    .max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
  paragraphs: z.array(ParagraphInGroupSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const CarouselSchema = z.object({
  images: z
    .array(
      z.object({
        position: z.number().int(),
        image: ImageSchema,
      })
    )
    .max(MAX_ARRAY_SIZE, {
      message: "Le carrousel va finir par avoir le vertige avec autant d'images !",
    }),
  videos: z
    .array(
      z.object({
        position: z.number().int(),
        video: VideoSchema,
      })
    )
    .max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const AlbumLinkSchema = z.object({
  id: z.number().int(MSG_NOMBRE_ENTIER),
  text: z.string().max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
  link: z.string().max(5000, { message: MSG_TEXTE_TROP_LONG(5000) }),
  position: z.number().int({ message: "La position doit être un rang précis (entier)." }),
});

export const AlbumSchema = z.object({
  id: z.number().int(),
  cover: ImageSchema,
  title: EditableTextContentSchema,
  paragraphs: z.array(ParagraphInGroupSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
  spotifyUrl: AlbumLinkSchema.nullable(),
  appleMusicUrl: AlbumLinkSchema.nullable(),
  deezerUrl: AlbumLinkSchema.nullable(),
});

export const DateEventSchema = z.object({
  id: z.number().int(),
  title: EditableTextContentSchema,
  date: z.coerce.date({
    message: "On a besoin d'une date valide pour savoir quand venir vous voir !",
  }),
  city: EditableTextContentSchema,
  adress: EditableTextContentSchema,
  image: ImageSchema,
  paragraphs: z.array(ParagraphInGroupSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const TrombinoscopeElementSchema = z.object({
  id: z.number().int(),
  color: z
    .string()
    .max(50, { message: "Le nom de la couleur est un peu trop exotique (max 50) !" })
    .nullable(),
  position: z.number().int(),
  image: ImageSchema,
  title: z.object({ id: z.number(), content: z.string().max(5000) }),
  paragraphs: z.array(ParagraphInGroupSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const FloatingWindowSchema = z.object({
  id: z
    .number({
      message: "L'identifiant doit être un nombre.",
    })
    .int({ message: "L'identifiant doit être un nombre entier." }),

  zIndex: z
    .number({
      message: "Le zIndex doit être un nombre.",
    })
    .int({ message: "Le zIndex doit être un entier." }),

  zIndexPriorityFactor: z
    .number({
      message: "Le facteur de priorité doit être un nombre.",
    })
    .int({ message: "Le facteur de priorité doit être un entier." }),

  image: ImageSchema,

  x: z.number({
    message: "La position X doit être un nombre.",
  }),

  y: z.number({
    message: "La position Y doit être un nombre.",
  }),

  width: z
    .number({
      message: "La largeur doit être un nombre.",
    })
    .min(0, { message: "La largeur doit être d'au moins 1 unité." })
    .max(2000, { message: "La largeur ne peut pas dépasser 2000 unités." }),

  height: z
    .number({
      message: "La hauteur doit être un nombre.",
    })
    .min(0, { message: "La hauteur doit être d'au moins 1 unité." })
    .max(2000, { message: "La hauteur ne peut pas dépasser 2000 unités." }),
});

export const BasePageContentSchema = z.object({
  navlinks: z
    .array(NavLinkSchema)
    .max(MAX_ARRAY_SIZE, { message: "On risque de manquer de place dans le menu !" }),
  config: ConfigurationSchema,
});

export const HomePageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  subtitle: EditableTextContentSchema,
  banner: ImageSchema,
  presentationParagraph: EditableParagraphContentSchema,
  presentationImage: ImageSchema,
  actualityTitle: EditableTextContentSchema,
  posts: z
    .array(PostDataSchema)
    .max(MAX_ARRAY_SIZE, { message: "Il se passe trop de choses sur cette page !" }),
  carousel: CarouselSchema,
});

export const MediasPageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  video_section_title: EditableTextContentSchema,
  pictures_section_title: EditableTextContentSchema,
  videos: z
    .array(VideoSchema)
    .max(MAX_ARRAY_SIZE, { message: "C'est un vrai festival de vidéos ici !" }),
  windows: z.array(FloatingWindowSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const DatesPageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  dates: z.array(DateEventSchema).max(MAX_ARRAY_SIZE, {
    message: "Quelle tournée incroyable ! Mais on est limités à 1000 dates.",
  }),
  prevTitle: EditableTextContentSchema,
  nextTitle: EditableTextContentSchema,
});

export const NousEcouterPageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  albums: z
    .array(AlbumSchema)
    .max(MAX_ARRAY_SIZE, { message: "C'est toute une discographie ! (max 1000 albums)" }),
});

export const ConnexionpageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
});

export const ContactPageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  paragraph: EditableParagraphContentSchema,
  subtitle: EditableTextContentSchema,
  files: z.array(FileSchema).max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});

export const GroupePageContentSchema = BasePageContentSchema.extend({
  title: EditableTextContentSchema,
  presentation_image: ImageSchema,
  first_section_paragraphs: z
    .array(ParagraphInGroupSchema)
    .max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
  second_section_paragraphs: z
    .array(ParagraphInGroupSchema)
    .max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
  trombinoscope: z
    .array(TrombinoscopeElementSchema)
    .max(MAX_ARRAY_SIZE, { message: MSG_TROP_D_ELEMENTS }),
});
