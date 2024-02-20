---
description: "Instructions on changing remote and local git branches from master to main"
draft: false
pubDate: "2024-02-20"
tags: ["TIL", "git", "programming"]
title: TIL how to rename my master branch to main
coverImage: '../../images/TIL.png'
heroImageAlt: Image from Boston University showing Today I learned
---

For my GitHub repo, I wanted to rename the remote `master` branch to `main`. 

[These instructions](https://github.com/github/renaming) helped the process.

Go to **Settings**, then **Branches**, then edit the `master` branch. Rename them to `main`.

![Renaming the default branch dialog](https://github.com/github/renaming/raw/main/rename-default-branch-dialog.png)

You will have to do it locally as well. The command for local machine is as follows.

```sh
git branch -m master main
```

Afterward, you may need to reattach `main` to `origin/main`. Follow the instructions 
on the terminal as necessary.

### Why change to `main`?

This ZDNet article covers [GitHub to replace "master" with alternative term to avoid slavery references](https://www.zdnet.com/article/github-to-replace-master-with-alternative-term-to-avoid-slavery-references/). It took them awhile, so many of my old repos haven't been updated accordingly.
