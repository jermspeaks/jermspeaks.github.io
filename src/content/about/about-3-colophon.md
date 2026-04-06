---
title: "🧑🏽‍💻 / Colophon"
order: 3
lastUpdated: "2024-07-25T22:11:20.587Z"
---

In printmaking, this is a brief statement at the end of a book or manuscript, typically used to describe the details of its production. For this website, it is how the site is made.

### Tech Stack

This website is built with [Astro](https://astro.build/), [Tailwind](https://tailwindcss.com/), [Github Pages](https://pages.github.com/), and [Netlify](https://www.netlify.com/). Interactive components are written in [Svelte](https://svelte.dev/). Analytics are captured in [Umami](https://umami.is/), which is an alternative to Google Analytics, is [open source](https://github.com/umami-software/umami), and [privacy-focused](https://umami.is/privacy).

The previous site was built using Jekyll, Sass, Bourbon, Neat, and Netlify. I wrote a short blog post about this [here](/blog/2023-05-02-website-rewrite/).

The [newsletter](/curation/newsletter) is powered by [Buttondown](https://buttondown.email/).

The domain is registered with [Hover](https://www.hover.com/).

### Typography

This website uses “Brother 1816”, a font by Ignacio Corbo and Fernando Díaz of [TipoType](https://tipotype.com/). The previous font we used for decorating the newsletter was Festivo LC Basic Dots by [Ahmet Altun](https://www.fontspring.com/foundry/ahmet-altun).

I love using Futura when I have time to go to the letterpress shop at [San Francisco Centter for the Book](https://sfcb.org/).

<!-- https://www.happyhues.co/palettes/11 -->

### Timestamps

All timestamps are in `America/Los_Angeles` timezone. This is because I am predominantly U.S. West coast-based, so PST/PDT is where all of my posts are central to. There are some exceptions when it comes to content I've written in other parts of the world. I've been flip-flopping, deciding whether or not showcasing the time things were posted are important, but for now, we will leave this as a footnote.

### Design system

This section documents the tokens and layout conventions used on the site. Long-form markdown is styled with the `.prose` classes in [`src/styles/global.css`](https://github.com/jermspeaks/jermspeaks.github.io/blob/main/src/styles/global.css) instead of the Tailwind Typography plugin.

**Type.** Body copy uses Brother 1816 (see above). A modular scale is defined as CSS custom properties on `:root`:

| Token | Default (mobile) | Wide (≥800px) |
| ----- | ---------------- | ------------- |
| `--font-size-1` | 1rem | 1rem |
| `--font-size-2` | 1.2rem | 1.333rem |
| `--font-size-3` | 1.44rem | 1.777rem |
| `--font-size-4` | 1.728rem | 2.369rem |
| `--font-size-5` | 2.074rem | 3.157rem |
| `--font-size-6` | 2.488rem | 4.209rem |

The ratio is **1.2** by default and **1.33** from 800px up. Article headings inside `.prose` map to these steps where it makes sense; feed titles on the homepage use explicit Tailwind sizes so they stay larger than excerpts.

**Color.** Base palette variables (also in `:root`):

- `--color-page-bg` — page background (`#f9f4ef` light; dark mode uses `#1C1B1A`)
- `--color-content` — primary text on the older variable-based flow (`#444`)
- `--color-header` — `#222`
- `--color-link` — `#3273dc`
- `--color-code-bg` — `#f2f2f2`
- `--color-blockquote-border` / `--color-blockquote-content` — blockquote chrome

Many screens also use Tailwind’s slate/gray scales and **interaction** accents that are not yet variables: hover links often shift to purple (`text-purple-500` / `dark:text-purple-400`), visited links to amber/purple depending on context.

**Layout.** The main feed column is `max-w-xl` with `md:max-w-2xl`, centered (`mx-auto`), matching [`HomePagePosts.astro`](https://github.com/jermspeaks/jermspeaks.github.io/blob/main/src/components/HomePagePosts.astro).

**Source of truth.** Global font faces, page background, and the type scale live in `global.css`. Shared UI colors and radii extend the Tailwind theme in `tailwind.config.js`. The colophon is the human-readable contract for those files; if they drift, update this section.
