import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
// import netlify from "@astrojs/netlify/static";

import { asideAutoImport, astroAsides } from "./integrations/astro-asides";
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
    AutoImport({
      imports: [asideAutoImport],
    }),
    sitemap(),
    svelte(),
    tailwind({
      configFile: "./tailwind.config.js",
      applyBaseStyles: false,
    }),
    astroAsides(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, rehypeAutolinkConfig],
        [rehypeExternalLinks, rehypeExternalLinkConfig],
        rehypeFigure,
      ],
      remarkPlugins: [remarkReadingTime],
    }),
  ],
  // NOTE: Once we need redirects, we can use the adaptor
  // adapter: netlify(),
});
