import { z } from "zod";

export const imageSchema = z.object({
  id: z
    .number({
      error: "L'identifiant de l'image doit être un nombre.",
    })
    .int({ error: "L'identifiant doit être un entier." })
    .nonnegative({ error: "L'identifiant ne peut pas être négatif." }),

  source: z.string({
    error: "La source de l'image est requise.",
  }),

  label: z
    .string({
      error: "Le label doit être une chaîne de caractères.",
    })
    .nullable(),

  alt: z
    .string({
      error: "Le texte alternatif doit être une chaîne de caractères.",
    })
    .nullable(),
});

export const postSchema = z.object({
  title: z.string({
    error: "Le titre est requis.",
  }),

  content: z
    .string({
      error: "Le contenu doit être une chaîne de caractères.",
    })
    .optional(),

  images: z
    .array(imageSchema, {
      error: "Les images doivent être un tableau valide.",
    })
    .default([]),
});

export const imagePropsSchema = z.object({
  title: z.string({
    error: "Le titre est requis.",
  }),

  description: z.string({
    error: "La description doit être une chaîne de caractères.",
  }),

  date: z.date({
    error: "La date doit être valide.",
  }),
});

export const trombinoscopeItemSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),

  description: z.string({ error: "La description est requise." }),

  image: imageSchema.optional().refine((val) => val !== undefined, {
    message: "L'image est requise.",
  }),

  color: z.string({ error: "La couleur est requise." }),
});

export const albumSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),
  description: z.string({ error: "La description est requise." }),
  spotifyUrl: z.string().optional(),
  deezerUrl: z.string().optional(),
  appleMusicUrl: z.string().optional(),
  cover: imageSchema.optional().refine((val) => val !== undefined, {
    message: "La cover est requise.",
  }),
});

export const albumUrlSchema = z.object({
  url: z.string({ error: "L'url est requise." }),
});

export const connexionSchema = z.object({
  username: z.string({ error: "Le nom d'utilisateur est requis." }),
  password: z.string({ error: "Le mot de passe est requis" }),
  remember: z.boolean(),
});

export const dateEventSchema = z.object({
  title: z.string({ error: "Le titre est requis." }),
  description: z.string().optional(),
  date: z.date(),
  city: z.string({ error: "L'adresse est requise." }),
  adress: z.string({ error: "L'adresse est requise." }),
  image: imageSchema.optional().refine((val) => val !== undefined, {
    message: "L'image est requise.",
  }),
});

export const videoSchema = z.object({
  description: z.string().optional(),
  url: z.url(),
});
