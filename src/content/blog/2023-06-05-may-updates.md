---
date: 2023-06-05
description: "Major website updates, new collections, fixed bugs, and more!"
draft: false
heroImage: "https://images.unsplash.com/photo-1536849460588-696219a9e98d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1431&q=80"
postType: "blog"
pubDate: "2023-06-05"
title: "This month at Craft By Zen, May 2023"
tags: ["review", "daily", "habits"]
---

Over the past month, I have been making small enhancements to make the website 1% better. I’m excited to talk about many of them, some noticeable, some under the hood.

## Major Updates

### Tailwind, 🌑 Dark Mode, and Solving My Woes with Styling

Some major updates are around styling. Previously, I was using some CSS files to style the different pages. However, after a lot of tinkering with Tailwind, I went full in. And boy has it made it easier to update styling, especially around media queries.

I hate to think about media queries, write a quick template or some variables, when tailwind makes that super easy. Add to your classes, `sm:` or `md:`, or `lg:` and you're good to go for what you want to style at a specific breakpoint. What it means is, you have to think about your smallest width first, then move on to where you want your next breakpoint and add that utility class.

Where I immediately saw this benefit was a bug I found with a list of navigation links. With a little bit of tinkering, I was able to make the classes from `flex` with a default of no wrapping, to `flex-wrap` then `md:flex-no-wrap` to get that desired effect.

Another super helpful thing was immediately adding dark mode support. With the prefix, `dark:`, it made my life so much easier. I saw some initial places where I needed to modify the website immediately, and having this utility class prefix allowed me to get straight to styling vs. thinking about CSS selectors and rules. That said, having a background in CSS is a huge help, and even if I had to write only CSS, I'd still be operable.

Also, you may now notice there are links next to headings. That's all thanks to installing my first [rehype](https://github.com/rehypejs/rehype) plugin! I had no idea there was such a rich community of rehype and remark plugins for all different use cases. I'm excited to explore more of them.

Lastly, my RSS feed has been updated. The books and films are added to the main feed, as well as styling the feed page itself. I didn't know it used a `.xsl` file, and I used a [generic template](https://github.com/genmon/aboutfeeds/blob/main/tools/pretty-feed-v3.xsl).

### New Collections 📚 🎥

I expanded on my library. The films, anti-library, and book reviews have been added. The lindy library is passable and needs a bit more design and explanation. I'm proud of adding the log alongside the movies and books. I plan to link the log back to those pages too, where I can.

A lot of tinkering with Tailwind helped make this a lot easier too. I knew the design needed to look a little different, so for the past month, I've been browsing the pages on my own until they looked the way I wanted.

### Content Updates

My resume, about page, now page, and many, many other pages have been updated. This was a long time coming. For years, I've kept the same about page, being about the "brief" version vs. the Twitter version vs. the LinkedIn version. I don't think that represented me well. After some inspiration from [Derek Sivers](https://sive.rs/about)' about page, I restarted the process from scratch. I thought more about it as an autobiography, rather than a professional LinkedIn page. It's a lot more personal, and hopefully, that shines than the corporate version that I wince at.

### Search 🔍

I installed the Algolia Crawler earlier in the month and finally had time to add a search component over the weekend. A little more refinement is needed to get the search results to display correctly (specifically removing the navigation text), but we'll get there.

### Under the hood 🚘

Getting the initial setup with Netlify was a major lift. Everything else has felt like a smaller lift, but also necessary. For example, dependabot wasn't installed, so I made sure dealing with package updates was automated. I included meta tags that were missing for SEO purposes, verifying Twitter cards and Open Graph links (like LinkedIn) to work correctly.

### What's next?

Honestly, I'm going to take a step back and work on the content. While I'd love to update the Lindy Library, I'd much rather do what I do best, and write more blog posts. I have been working on a personal content pipeline to gather ideas, slowly work through books, and put my own take out there.

If there are any issues you find with the website, feel free to [open an issue](https://github.com/jermspeaks/jermspeaks.github.io/issues) on GitHub. Ta ta for now 👋.

### Changelog

- `#43` Add Github Actions to automatically tag the repository by semantic versioning
- `#45` Migrate from vanilla CSS to Tailwind CSS
- `#48` Dark Mode added!
- `#50` Additions to "Logs" - Add concert and musical for 2023
- `#51` Addition to "Library" - Add a brief lindy library
- `#54` Install Dependabot to Github project
- `#60`, `#61` Add first rehype plugin to add relative links to headings
- `#62` Netlify configuration - add security headers and update timezone
- `#66` Added top navigation for blog
- `#75` Expand on the films section and add them to the main page enhancement
- `#76` Extend press to include more talks, papers, and updated formatting enhancement
- `#82` Updated meta tags for SEO. Twitter cards and Open Graph links should correctly render updated hero images
- `#86` RSS page styled, should make it a lot more readable
- `#91` Migate blog posts with book reviews to the library book detailed pages
- `#92` Add films and books to rss feed
- `#93` Create anti-library page. Install Umami Analytics
- `#94` Add a "now" page
- `#99` Updated resume content
- `#103` Include quick algolia search enhancement
