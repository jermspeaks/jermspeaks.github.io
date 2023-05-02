---
category: blog
date: 2023-05-02
description: "Migrating from Jekyll to Astro"
draft: false
heroImage: ""
postType: "blog"
pubDate: "2023-05-02"
title: "Website Re-write 2023"
---

I decided to re-write my personal website back in 2017, when I was much more active in writing on my blog. However, that changed quickly when I abandoned making updates in 2018 when I started my job at [Clear Labs](https://clearlabs.com). There was no longer any time to write as we were working on their [Clear Safety product](https://www.clearlabs.com/clear-safety/).

I've had one or two failed attempts at doing a full re-write, and never fully committed to doing it until this past month. Part of the reason is I dreaded the migration from Jekyll. I knew most of my content was in markdown, but there was this fear in the back of my mind like it was an insurmountable task. Of course, that's a fallacy, and when you know you could do other things with your time, this project inevitable went into my backlog.

### Comeback with Astro

I've been itching to write again, and the urge trumped my fear of the migration. I decided to use [Astro](https://astro.build) as my static site generator, with plans to run it as a server as a future. I wrote a small project in Astro, and thought how delightful it was, so I decided to see what the starter had for its blog starter kit. I was pleasantly surprised. It had a great base foundation to start migrating over blog posts, as long as I followed their markdown frontmatter, typically written as Yaml. By taking a look at their base schema, I could easily re-adapt the posts and get something rendering on the page write away.

```ts
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
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

I needed additional metadata for my blog posts, like tags, post type, and a boolean for whether it was a draft.

I've created [Next.js](https://nextjs.org/) and [Remix](https://remix.run/) projects before, so the file-based routing system was intuitive. The preset included a `blog` folder with an `index.astro` and `[[...slug]].astro` file pre-filled. This made it super easy for my to figure out what was going on by reading the code and commenting the parts I didn't understand.

<!-- Note to self: write a blog post about reading code. Julia Evans has a great post about this in reference to debugging -->

After the blog posts migrated over, I quickly threw myself into the other pages that weren't migrated over, specifically the about page, projects, logs, and newsletter series. Each of those became their own schemas. I updated their markdown frontmatter as well, and the personal site started to look like my old site again.

### Deployment

The website was using Netlify, and while I personally would've preferred Vercel, it was a good choice. I setup some Github actions to continue to push to Github Pages as well. Netlify's migration was a pain, because the configuration and its cache were set to build to Jekyll's configuration. Migrating it over to Astro took some finagling to get the settings just right. I spent a good evening scratching my head until I found the correct environment variable to set it to.

### A Side Note about Git

I created my old blog back in 2014, and I was still using `master` branch as the main branch. With this migration, I moved it over to `main`. For configuration reasons, it was having trouble moving over in my CI pipeline the first two or three builds. So please remember to check your settings.

### Styling

At first, Astro gives you the css from the [Bear Blog](https://github.com/HermanMartinus/bearblog/blob/master/LICENSE.md). While the minimalism was great, that's not my type of styling. So I adapted it until it started the look the way I wanted it to. Quickly, I realized this isn't going to be scalable. While astro limits their styling to the component you're working on, it wasn't good enough. And the global styles weren't to my taste.

I knew I wanted to use Tailwind in a full project. Previously, I've only used it for tiny pet projects. I went full in immersion. At first, my global styles were being modified by the `base.css` injected styles from Tailwind. I put too much effort in trying to modify them when I realized, "I started from a base project, and I don't need these base style files". That's when I stopped caring about my blog's styling conventions and migrated over to Tailwind's conventions.

One thing that confused my initially was using Tailwind's

Sometimes, it's hard to break hard habits. The mantra of "Convention over configuration", as heralded by Ruby on Rails", was echoing in the back of my mind. While I am not fully migrated over to Tailwind yet, I plan to.

### Conclusion

There's a bunch of things left-over from this migration that I have to still work on.

- Analytics (ideally, an alternative to Google Analytics)
- Add filters for the writing so you can filter by tags
- Migrate over my Newsletter from TinyLetter to Buttondown

Overall though, I'm happy with my switch, and plan on working on my website more. Astro makes it incredible easy to add components from other libraries that I've worked with in the past (personally used React, Vue, Svelte, and Solid), so I plan on making more interactive blog posts and projects for this website in the future.

If you have any questions about the migration, want to give me feedback, or would like some help on your own Astro blog, feel free to email me. I'm always happy to help. (Email is in the footer of all pages).
