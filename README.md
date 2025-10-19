# Website for Craft By Zen

[![Netlify Status](https://api.netlify.com/api/v1/badges/ba48845b-90cf-4096-a2a5-816539b2e5a6/deploy-status)](https://app.netlify.com/sites/jermspeaks/deploys)
![Github Pages Build](https://github.com/jermspeaks/jermspeaks.github.io/actions/workflows/astro.yml/badge.svg)

- [Website](https://craftbyzen.com)

## Tech Stack

- Astro, Github Pages, MDX, and Netlify
- Previously used Jekyll, Sass, and Bourbon, and Neat

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                                                             | Action                                           |
| :------------------------------------------------------------------ | :----------------------------------------------- |
| `npm install`                                                       | Installs dependencies                            |
| `npm run dev`                                                       | Starts local dev server at `localhost:4321`      |
| `npm run build`                                                     | Build your production site to `./dist/`          |
| `npm run preview`                                                   | Preview your build locally, before deploying     |
| `npm run astro ...`                                                 | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help`                                           | Get help using the Astro CLI                     |
| `npm run create:writing -- "Your Post Title" [...tags (optional)]`  | Creates a new writing file                       |
| `npm run create:stream -- "Your Stream Title" [...tags (optional)]` | Creates a new stream file                        |
| `npm run metadata:extract`                                            | Extract cached link metadata for manual overrides |
| `npm run metadata:extract "url"`                                      | Extract metadata for specific URL                 |

## Link Metadata Caching

The site uses a caching system for link metadata to handle sites that block requests during build time (like YouTube). Here's the workflow:

### 1. Development Mode
Run `npm run dev` and visit pages with `LinkPreview` components. This populates the cache with metadata.

### 2. Extract Metadata
Run `npm run metadata:extract` to see all cached metadata formatted as ready-to-copy Astro components:

```bash
# View all cached metadata
npm run metadata:extract

# Search for specific URL
npm run metadata:extract "youtube.com/watch?v=ABC123"
```

### 3. Update MDX Files
Copy the formatted components and paste them into your MDX files with manual overrides:

```astro
<!-- Before -->
<LinkPreview url="https://www.youtube.com/watch?v=ABC123" />

<!-- After -->
<LinkPreview 
  url="https://www.youtube.com/watch?v=ABC123"
  title="Video Title"
  image="https://i.ytimg.com/vi/ABC123/maxresdefault.jpg"
  description="Video description"
/>
```

### 4. Commit and Deploy
Commit your updated MDX files (not the cache). GitHub Actions builds will use the manual overrides for reliable builds.

## Deployment

If you have the netlify CLI installed, you can run the following command to deploy the site:

```sh
netlify deploy --build --prod
```
