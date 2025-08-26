---
description: "Saying goodbye to Arc Browser and saying hello to Zen Browser."
draft: false
heroImage: https://github.com/zen-browser/branding/blob/main/Official/PNG/Zen-3D-Colored.png?raw=true
heroImageAlt: Logo from Zen Browser
pubDate: "2025-08-25T08:00:00.000Z"
tags: ["tech", "migration"]
title: "Migrating from Arc to Zen Browser"
---

I started using Arc March 2023 and thought I'd never have to look back. It was a really exciting browser to use with so much potential. I loved watching videos they made about potential features that [could be extremely useful](https://youtu.be/edftwE_S0Ak).

Now that the Browser Company (BCNY) has gone all in with Dia Browser, the support for Arc has been just the essential, i.e. Chromium updates. I had a custom Chrome extension break a few weeks back, and I could see the writing on the wall. If this company doesn't want to fix their browser, then it's time to migrate. But where?

### The Alternatives

Really, there are a few browsers I thought are worth migrating to.

#### Dia Browser

For the same reason I don't want to use Comet (Perplexity's browser), I don't like these AI-forward web browsers. At least yet. There's the privacy concerns that get to me, especially around memory. And I just don't think they are ready for prime-time yet. Plus, I feel really slighted by BCNY pulling the rug from under us with Arc, and I don't know if I'm ready to migrate to a beta product from a well-established one.

#### Brave

I've used it extensively before around 2017. I think their Crypto play is strange, and I usually converted my BAT into BTC or ETH at the end of the day. But those Ads were really annoying. I eventually went back to Chrome.

#### Safari

I already use it as a mobile browser, and I've thought about doing it. They have the sidebar, but it doesn't feel as snappy and feature-tich as it should be.

#### Zen Browser

To be honest, I tried it last year, and couldn't bite the bullet to switch over. It felt like an incomplete product at the time, with alot of the things I loved about Arc just not there. That fear has since been squashed now that I've used it fresh again, and most things are there. The folders aren't there, but honestly, they aren't a priority for me as much as having access to my custom extensions. I made the push last week and have battle tested it. It's ready to go, and really snappy too.

## Migrating to Zen Browser

I'll walkthrough the different steps that I had to go through when migrating from Arc to Zen.

> [!Note] This section was AI assisted. How? I wrote an initial outline and checklist of all the things I had to do the migration. After checking off the essentials, I wrote up a bunch of gotchas and saved the links. After that, I shoved my note into Gemini 2.5 Pro and asked it to summarize this. After the initial generation, I edited the piece and made it sound more in my tone and language.

### 1. Import Bookmarks

The first step was a standard bookmark import from my previous browser. I used [this tool](https://github.com/ivnvxd/arc-export) to do the export from Arc since there's no native way to do it.

### 2. Create Spaces

I recreated my Arc-style workflow by setting up the following Spaces:

- Work Planning
- Work Focus (a programming space)
- Work Design
- Personal
- House Management
- Financial

### 3. Install Essential Extensions

I installed my core extensions:

- 1Password
- My personal "Markdown Copy Tool" that I have customized for specific sites
- uBlock Origin (this one is huge. Screw Chrome and the manifest v3 changes that cut-off a really good ad-blocker)
- Obsidian Webclipper (I also imported my existing settings for this)

### 4. Configure Browser Settings

- **Search Engine**: Switched the default to DuckDuckGo. (Maybe Kagi in the future)
- **Auto-Tab-Closing**: Actually never set this up, so reach out if you know how to do it.
- **UI/UX**: Tweaked various settings to make the experience feel more familiar to Arc.

### 5. Update Keyboard Shortcuts

- Mapped a shortcut to **Toggle Compact Mode**.
- Removed the default shortcut for "save page" to avoid conflicts.

### 6. Set Up Pinned Tabs

I pinned my frequently used sites:

- YouTube
- Spotify
- Calendar
- Readwise

### 7. Add Custom Search Completions

I added several custom search engines to the command palette for quick access:

- Perplexity
- Kagi
- ChatGPT
- Reddit
- Twitter/X
- Brave Search
- WikiVoyage

### 8. Join the Community

I subscribed to the [r/zen_browser](https://www.reddit.com/r/zen_browser/) subreddit to stay updated.

## Key Differences & Gotchas

Here are some of the notable differences and things to be aware of when moving from Arc.

- **Workspaces & Profiles (A Major Plus)**: Spaces can be tied to a profile, which functions as a Mozilla [Multi-Account Container](https://support.mozilla.org/en-US/kb/containers?as=u&utm_source=inproduct). This means you can be logged into different accounts (e.g., personal vs. work Google accounts) in different Spaces without conflict. Pinned tabs are also tied to the profile, allowing for different sets of pinned tabs per workspace.
- **Glance vs. Little Arc**: Zen's equivalent of Arc's "Little Arc" for previewing links is called "Glance".
- **Tab Management**: Dragging a tab to a different space does not work. You must use the context menu option to move it. On the plus side, **Tab Folders** are expected in the next release.
- **Command Palette Limitations**: The command palette is not as powerful as Arc's yet.
  - You cannot activate extensions from it.
  - It lacks actions like "Open Dev Tools" or "Take Screenshot".
- **Screenshot Tool**: Zen has a native screenshot tool (`Cmd+Shift+S`), but it currently lacks annotation features like drawing arrows or adding text.
- **No DRM Support**: Zen Browser does not have a Widevine license. This means DRM-protected content from services like Netflix or Hulu will not play. From the [FAQ](https://docs.zen-browser.app/faq):
  > Zen Browser currently lacks DRM support... This means DRM-protected media cannot be played in Zen Browser for the foreseeable future.
- **No "Boosts"**: There is no equivalent to Arc's "Boosts" feature for injecting custom CSS and JavaScript into websites.
- **Local Development**: `localhost` pages don't trigger a special "developer mode" UI with easy-access shortcuts, unlike Arc.

## Helpful Resources

- [Zen Browser MacOS Cheatsheet](https://rtuszik.github.io/KoalaKeys-Collection/zen_browser_macos_cheatsheet.html)
- [Reddit Post: Zen folders is done!](https://www.reddit.com/r/zen_browser/comments/1mi1ry7/zen_folders_is_done/)
- [GitHub Discussion: Shortcut for expanding Glance?](https://github.com/zen-browser/desktop/discussions/5079)
