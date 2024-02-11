import { defineCollection, reference, z } from "astro:content";
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
    minutesRead: z.string().optional(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
  }),
});

const log = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    previousEntry: reference("log").optional(),
    nextEntry: reference("log").optional(),
    description: z.string(),
    draft: z.boolean().optional(),
    heroImage: z
      .string()
      .default(
        "https://images.unsplash.com/photo-1623265300797-4a3541e29a60?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ),
    heroImageAlt: z
      .string()
      .default(
        "Written list on a legal pad, photographed by Torbjørn Helgesen"
      ),
    blurb: z.string().optional(),
    creator: z.string().default("Jeremy Wong"),
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
    image: z.string().optional(),
    imageAlt: z.string().optional(),
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
      .transform((val) => new Date(val))
      .or(z.null()),
    heroImage: z.string().optional(),
    tag: z.string(),
    title: z.string(),
    blurb: z.string().optional(),
  }),
});

const book = defineCollection({
  schema: z.object({
    author: z.string().default("Jeremy Wong"),
    creator: z.string().default("Anonymous"),
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
    creator: z.string().default("Anonymous"),
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
    blurb: z.string().optional(),
    country: z.string().optional(),
    // Transform string to Date object
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    creator: z.string().default("Anonymous"),
    director: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().default("Film Poster"),
    language: z.string().optional(),
    link: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    releaseYear: z
      .string()
      .or(z.number())
      .or(z.date().transform((val) => new Date(val))),
    runtime: z.string().optional(),
    title: z.string(),
  }),
});

const lindy = defineCollection({
  schema: z.object({
    creator: z.string().default("Anonymous"),
    author: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    link: z.string(),
    title: z.string(),
    dateConsumed: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    pubDate: z
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
