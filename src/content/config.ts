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

export const collections = { blog, project, log };
