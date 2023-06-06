import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://craftbyzen.com",
  markdown: {
    rehypePlugins: [
      // rehypeHeadingIds,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: {
            type: "element",
            tagName: "span",
            properties: { className: ["heading-link"] },
            children: [
              {
                type: "element",
                tagName: "svg",
                properties: {
                  width: 24,
                  height: 24,
                  version: 1.1,
                  viewBox: "0 0 16 16",
                  xlmns: "https://www.w3.org/2000/svg",
                },
                children: [
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      fillRule: "evenodd",
                      fill: "currentcolor",
                      d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          content: {
            type: "element",
            tagName: "img",
            properties: {
              src: "/images/external-link.svg",
              alt: "External link icon",
              width: "16",
            },
            children: [],
          },
          contentProperties: { className: ["external-link"] },
        },
      ],
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
