import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify/functions";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://craftbyzen.com",
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
