import { defineCollection, z } from "astro:content";
// import { rssSchema } from "@astrojs/rss";

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    author: z.string().default("Jeremy Wong"),
    categories: z.array(z.string()).optional(),
    commentsUrl: z.string().optional(),
    customData: z.string().optional(),
    description: z.string(),
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    postType: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    minutesRead: z.string().optional(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

const log = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    description: z.string(),
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
    postType: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    title: z.string(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

const project = defineCollection({
  schema: z.object({
    // Transform string to Date object
    createdDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    description: z.string(),
    title: z.string(),
  }),
});

const series = defineCollection({
  schema: z.object({
    // Transform string to Date object
    createdDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    description: z.string(),
    endDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    tag: z.string(),
    title: z.string(),
    blurb: z.string().optional(),
  }),
});

const book = defineCollection({
  schema: z.object({
    author: z.string().default("Jeremy Wong"),
    bookAuthor: z.string(),
    categories: z.array(z.string()).optional(),
    customData: z.string().optional(),
    description: z.string().optional(),
    // Transform string to Date object
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("book cover"),
    link: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    title: z.string(),
    blurb: z.string().optional(),
  }),
});

const antiLibrary = defineCollection({
  schema: z.object({
    author: z.string().default("Jeremy Wong"),
    bookAuthor: z.string(),
    categories: z.array(z.string()).optional(),
    customData: z.string().optional(),
    description: z.string().optional(),
    // Transform string to Date object
    dateAdded: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("book cover"),
    link: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    title: z.string(),
    blurb: z.string().optional(),
  }),
});

const filmLibrary = defineCollection({
  schema: z.object({
    // Transform string to Date object
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    director: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("Film Poster"),
    link: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    releaseYear: z
      .string()
      .or(z.number())
      .or(z.date().transform((val) => new Date(val))),
    title: z.string(),
    blurb: z.string().optional(),
  }),
});

const lindy = defineCollection({
  schema: z.object({
    author: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    link: z.string(),
    title: z.string(),
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    blurb: z.string().optional(),
  }),
});

const about = defineCollection({
  schema: z.object({
    order: z.number(),
    title: z.string(),
  }),
});

const resume = defineCollection({
  schema: z.object({
    order: z.number(),
    title: z.string(),
  }),
});

const now = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    draft: z.boolean().optional(),
  }),
});

const curation = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    link: z.string(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  about,
  antiLibrary,
  blog,
  book,
  curation,
  filmLibrary,
  lindy,
  log,
  now,
  project,
  resume,
  series,
};
