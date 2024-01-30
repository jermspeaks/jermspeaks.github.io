---
description: "Setting up the Obsidian QuickAdd plugin with a custom book plugin"
draft: false
pubDate: "2024-01-30"
tags: ["pkm", "programming"]
title: Using my custom book macro for Obsidian QuickAdd Plugin 
heroImage: https://obsidian.md/images/obsidian-logo-gradient.svg
heroImageAlt: Obsidian Logo
---

I started taking notes on Morgan Housel's book,
[The Psychology of Money](https://www.harriman-house.com/psychologyofmoney), and
I wanted to have an automatic note created in my [Obsidian](https://obsidian.md/)
vault.

I have [Nick Milo's Ideaverse](https://www.linkingyourthinking.com/ideaverse-pro)
installed and wanted to take advantage of the 
[QuickAdd plugin](https://quickadd.obsidian.guide/). The example they give for
the [BookFinder script](https://quickadd.obsidian.guide/docs/Examples/Macro_BookFinder)
was easy to follow and extend.

I created [a gist](https://gist.github.com/jermspeaks/209c47e99ee6e32ef83e9e2da40c3e36)
for it. The original script did not have much error handling. Something to expand
on in the future is to have that error handling within Obsidian, which I would
like to see.

Also, I used the [`suggester` API](https://quickadd.obsidian.guide/docs/QuickAddAPI#suggester-displayitems-string--value-string-index-number-arr-string--string-actualitems-string-promisestring)
to give the user options on which returned item they care about using the Google
Books API.

And here's my personal template using Obsidian properties.

```md
---
by: "{{VALUE:authors}}"
title: "{{VALUE:title}}"
tags:
  - "#highlights/waiting"
in:
  - "[[Books]]"
year: {{VALUE:year}}
published: "{{VALUE:publishedDate}}"
related: 
category: "{{VALUE:categories}}"
pages: "{{VALUE:pageCount}}"
publisher: "{{VALUE:publisher}}"
isbn10: "{{VALUE:isbn10}}"
isbn13: "{{VALUE:isbn13}}"
created: "{{date:YYYY-MM-DD}}"
---

# {{VALUE:title}}

![poster]({{VALUE:Poster}})  

- Subtitle: {{VALUE:subtitle}}

### My Notes  


  
### Details  

{{VALUE:description}}
```

If you have any questions about the script, please let me know. I may create a
personal repo of different Macros that fetch data from other APIs.
