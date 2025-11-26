import { defineCollection, reference, z } from "astro:content";
// import { rssSchema } from "@astrojs/rss";

const writing = defineCollection({
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      author: z.string().default("Jeremy Wong"),
      categories: z.array(z.string()).optional(),
      description: z.string(),
      draft: z.boolean().optional(),
      coverImage: image().optional(),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().default("Cover image for blog post"),
      minutesRead: z.string().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      tags: z.array(z.string()).default([]),
      title: z.string(),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      kind: z.string().default("writing"),
    }),
});

const log = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    previousEntry: reference("log").optional(),
    nextEntry: reference("log").optional(),
    // previousEntry: z.string().optional(),
    // nextEntry: z.string().optional(),
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
    kind: z.string().default("log"),
  }),
});

const project = defineCollection({
  schema: ({ image }) =>
    z.object({
      // Transform string to Date object
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      createdDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      coverImage: image().optional(),
      description: z.string(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      title: z.string(),
      kind: z.string().default("project"),
    }),
});

const series = defineCollection({
  schema: ({ image }) =>
    z.object({
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
      coverImage: image().optional(),
      heroImage: z.string().optional(),
      heroImageAlt: z.string().optional(),
      tag: z.string(),
      title: z.string(),
      blurb: z.string().optional(),
      kind: z.string().default("series"),
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
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    title: z.string(),
    blurb: z.string().optional(),
    kind: z.string().default("books"),
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
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    title: z.string(),
    blurb: z.string().optional(),
    kind: z.string().default("antibooks"),
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
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    releaseYear: z
      .string()
      .or(z.number())
      .or(z.date().transform((val) => new Date(val))),
    runtime: z.string().optional(),
    title: z.string(),
    kind: z.string().default("films"),
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
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    blurb: z.string().optional(),
    kind: z.string().default("lindy"),
  }),
});

const creator = defineCollection({
  schema: z.object({
    blurb: z.string().optional(),
    creator: z.string(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    link: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    title: z.string(),
    kind: z.string().default("creators"),
  }),
});

const about = defineCollection({
  schema: z.object({
    order: z.number(),
    title: z.string(),
    lastUpdated: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    kind: z.string().default("about"),
  }),
});

const resume = defineCollection({
  schema: z.object({
    order: z.number(),
    title: z.string(),
    printVersion: z.boolean(),
    kind: z.string().default("resume"),
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
    kind: z.string().default("now"),
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
    kind: z.string().default("curation"),
  }),
});

const classified = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    expired: z.boolean().optional(),
    referrer: z.string(),
    link: z.string(),
    location: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    kind: z.string().default("classified"),
  }),
});

const inspiration = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    title: z.string(),
    description: z.string().optional(),
    kind: z.string().default("inspiration"),
  }),
});

const stream = defineCollection({
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
    kind: z.string().default("stream"),
  }),
});

const catalogueBook = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      isbn: z.string().optional(),
      ASIN: z.string().optional(),
      bookAuthor: z.string().optional(),
      authors: z.array(z.string()).optional(),
      publishers: z.array(z.string()).optional(),
      publishDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
      pages: z.number().optional(),
      coverImage: image().optional(),
      rating: z
        .union([z.string(), z.number()])
        .optional()
        .refine(
          (val) => {
            if (val === undefined) return true;
            const num = typeof val === "string" ? parseInt(val) : val;
            return num >= 1 && num <= 6;
          },
          { message: "Rating must be between 1 and 6" }
        ),
      reviewDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((val) => (val ? new Date(val) : undefined)),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      description: z.string().optional(),
      draft: z.boolean().optional(),
      kind: z.string().default("catalogueBook"),
    }),
});

export const collections = {
  about,
  antiLibrary,
  book,
  catalogueBook,
  classified,
  creator,
  curation,
  filmLibrary,
  inspiration,
  lindy,
  log,
  now,
  project,
  resume,
  series,
  stream,
  writing,
};
