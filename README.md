# Website for Craft By Zen

## All Website Data Pertaining to Craft by Zen

[Website](https://craftbyzen.com)

## Tasks

- [x] Add `postType` to blog posts
- [x] Add Newsletter posts
- [x] Add `postType` to Newsletter posts
- [x] Add Learning posts
- [x] Add `postType` to Learning posts
- [x] Update favicon
- [x] Add email
- [x] Add resume
- [x] Add [RSS feed](https://docs.astro.build/en/guides/rss/) to Astro
- [x] Add Media page (which includess press, papers, other writings on other websites)
- [x] Add Logs page (for books, film, notable podcasts) that I've listened to
- [x] Add Coding and other projects Page
- [ ] Links on the About page missing
- [ ] Update CI on Netlify
- [ ] Add Library / Anti-library
- [ ] Add simple analytics
- [ ] Make components out of resume
- [ ] Add [tailwind for updaing CSS](https://straffesites.com/en/blog/integrate-prettier-astro-tailwindcss)
- [ ] Add a set of buttons to filter the posts
- [ ] Add Fruit Fly Paper on the media page
- [ ] Button Down for newsletter? Instead of Substack? - https://buttondown.email/
- [ ] For "Writing", change the dates to "Time Since" (e.g. 2 days ago)
- [ ] Add an interactive React component
- [ ] Add an interactive Svelte component
- [ ] Updated Logs for movies between 2019 through 2021
- [ ] Group specific blog posts into series: Season 1, Season 2, Season 3, Learning Modules, etc. See "learning" folder, then remove it
- [ ] Migrate other learning items to the main blog: http://jermspeaks.github.io/continued-learning/

### Legacy Tasks

- [x] Add a projects page
  - [x] Add WebVR Demo Page
  - [x] Add FamiliesUSA
  - [ ] Clinical Trials Visualization
  - [x] Remembrance
  - [x] Spark - Facebook Light
- [x] Fix Favicon
- [x] Move craftbyzen.com Domain Over
- [x] Add social icons
- [x] Add About.me Page
- [x] Migration of About Me Page
- [x] Migration of old blog posts to new blog templates
- [ ] Create a new Resume Page (web appropriate, not for print)
- [x] Migration of Projects Page
- [x] Transfer domain to this page
- [ ] Create Page for Movie and Book Data (Quantified Self Page)
- [ ] Hookup Google Analytics
- [ ] Add personalized font (non-generic from type foundry)
- [ ] Create sections on the index page for the different projects and sites on my page

#### Abandoned Goals

- ~~Migration of Resume Page~~
- ~~Create Jekyll Template~~

---

```
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://user-images.githubusercontent.com/4677417/186189140-4ef17aac-c3c9-4918-a8c2-ce86ba1bb394.png)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
