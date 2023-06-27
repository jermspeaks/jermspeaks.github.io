import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import rehypeAutolinkConfig from "./plugins/rehype-autolink-heading-config";
import rehypeExternalLinkConfig from "./plugins/rehype-external-link-config";
import rehypeFigure from "./plugins/rehype-figure";
import remarkReadingTime from "./plugins/remark-reading-time";

// https://astro.build/config
export default defineConfig({
  site: "https://craftbyzen.com",
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkConfig],
      [rehypeExternalLinks, rehypeExternalLinkConfig],
      rehypeFigure,
    ],
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, rehypeAutolinkConfig],
        [rehypeExternalLinks, rehypeExternalLinkConfig],
        rehypeFigure,
      ],
      remarkPlugins: [remarkReadingTime],
    }),
    sitemap(),
    svelte(),
    tailwind({
      configFile: "./tailwind.config.cjs",
      applyBaseStyles: true,
    }),
  ],
  adapter: netlify(),
});
