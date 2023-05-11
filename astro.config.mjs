import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import { autolinkConfig } from "./plugins/rehype-autolink-config";

// https://astro.build/config
export default defineConfig({
  site: "https://craftbyzen.com",
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      // This adds links to headings
      [rehypeAutolinkHeadings, autolinkConfig],
    ],
  },
  integrations: [
    mdx(),
    sitemap(),
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  adapter: netlify(),
});
