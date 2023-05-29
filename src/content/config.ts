import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
    postType: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const log = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
    postType: z.string(),
  }),
});

const project = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    createdDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

const series = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    createdDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    endDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    tag: z.string(),
  }),
});

const library = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    // Transform string to Date object
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("book cover"),
    review: z.string(),
    link: z.string(),
  }),
});

const filmLibrary = defineCollection({
  schema: z.object({
    title: z.string(),
    director: z.string(),
    releaseYear: z
      .string()
      .or(z.number())
      .or(z.date().transform((val) => new Date(val))),
    // Transform string to Date object
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("Film Poster"),
    link: z.string(),
  }),
});

const lindy = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    heroImage: z.string().optional(),
    link: z.string(),
  }),
});

const resume = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  blog,
  filmLibrary,
  library,
  lindy,
  log,
  project,
  resume,
  series,
};
