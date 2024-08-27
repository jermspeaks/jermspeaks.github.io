---
description: "The Mike Lynch mystery, follow-ups from Burn Book, FLUX.1, doing the hard work instead of trusting AI, effective changelogs, and asteroid mining seeing the light of day."
draft: false
heroImage: https://images.unsplash.com/photo-1506485338023-6ce5f36692df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80
heroImageAlt: Unsplash image from Jazmin Quaynor showing a weekly calendar
pubDate: "2024-08-27T00:00:00.000Z"
tags: ["weeknote", "ai", "notes", "postmortem", "memory"]
title: "2024 Week 34 - Weekly Notes"
---

Last week, I finished Burn Book, which I _ahem_ burned through. I found myself wanting to read faster when I borrow the book from the library. Shout out to [Libby](https://libbyapp.com)! The book introduced me to a play from Spalding Gray called "Interviewing the Audience" that I would love to watch a recording of, if they exist.

> Practice Makes Permanent Not Perfect  
> [Gareth J. Mole](https://condorperformance.com/practice-makes-permanent-not-perfect/)

### Around the Technosphere

- Person to follow - [Mitchell Hashimoto](https://mitchellh.com/) - This guy is crazy awesome, co-founding hashicorp and creating a terminal as a side-project
- [Announcing Black Forest Labs - Black Forest Labs](https://blackforestlabs.ai/announcing-black-forest-labs/) - They released FLUX.1 in three different models for image generation. A major competitor to StableDiffusion from some of their ex-employees
- [Why you need a "WTF Notebook"](https://www.simplermachines.com/why-you-need-a-wtf-notebook/?utm_source=substack&utm_medium=email)
  - I already started one, and it's amazing.

> Ultimately, we want to maximize quality time spent reading long-form documents, not substitute for it.
> Daniel Doyon, [Readwise](https://readwise.io/reader/update-july2024) July 2024 Updates

- [Do The Hard Work That's Required](https://www.dltn.io/posts/hard-work-ai?utm_source=substack&utm_medium=email) - AI is not a shortcut. Do the reading. Do the things required. Don't think that AI will just make something great.
  > AI tools should *help* you do the hard work that's required to make something great; AI tools should not *replace* the hard work that's required to make something great.
- Another way of putting it is [The Purpose of Things Isn't to Stop Doing Things.](https://www.youngmoney.co/p/the-purpose-of-things-isnt-to-stop)
  ![Comic showing the AI farce](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa9445b20-c857-4fd5-a3e0-69a3eef8ea4c_2042x1072.png)
- Jake Fuentes - [Lessons learned from a startup that didn’t make it](https://www.lennysnewsletter.com/p/lessons-learned-from-a-startup-that?r=4t43z&utm_source=substack&utm_medium=email)
- Tiny struggles - [Postmortem of my 9 year journey at Google](https://tinystruggles.com/posts/google_postmortem/?utm_source=tldrwebdev)
- On my to check out - [observablehq/framework: A static site generator for data apps, dashboards, reports, and more. Observable Framework combines JavaScript on the front-end for interactive graphics with any language on the back-end for data analysis.](https://github.com/observablehq/framework)
- Introducing Answer.AI - [A new old kind of R&D lab](https://www.answer.ai/posts/2023-12-12-launch.html) with Jeremy Howard (FastAPI, FastHTML) and Eric Ries (The Start-up Way)
- Chris Stjernlöf - [Practices of Reliable Software Design](https://two-wrongs.com/practices-of-reliable-software-design)
  - He jotted down eight practices that he’s adopted with experience and used while writing a fast, small, in-memory cache. They are:
    1. Use Off-The-Shelf
    2. Cost And Reliability Over Features
    3. Idea To Production Quickly
    4. Simple Data Structures
    5. Reserve Resources Early
    6. Set Maximums
    7. Make Testing Easy
    8. Embed Performance Counters
- [Harvesting, Fishing, Panning for Gold | Stay SaaSy](https://staysaasy.com/strategy/2024/08/18/harvesting-fishing-panning-for-gold.html)
  - More metaphors to live by
  - **Harvesting problems** have straightforward solutions and no shortcuts: You just get a big basket and pick every damn strawberry in the field. You solve these problems with pure perseverance, slogging away for weeks, months, or years until they are done.
  - **Some problems are like fishing.** You know that there are fish out there in the ocean, but you don't know exactly where. If a great fisherman knows where the hungriest fish are and how to set their lines just right, they might catch everything that they need in a few hours. Fishing problems can sometimes be solved shockingly fast by motivated teams with a bit of luck.
  - **Some problems are like panning for gold** - going out to a river or stream where there might be gold, getting your pan out, and seeing if you can find traces of the shiny stuff in the sediment. If you find gold, you can become generationally successful - think of the massive moats created by Google Search or the AirBnB network.
- [Select | Dasel](https://daseldocs.tomwright.me/commands/select) - CLI tool for selecting and updating JSON, CSV, and other one file data files

```sh
echo '{"name":{"first":"Tom","last":"Wright"}}' | dasel -r json 'name.first'
"Tom"
```

- [SWE-bench](https://www.swebench.com/)
  - I was learning more about this from Cosine Genie (and of course Devin was the first E2E I was hearing that looked ok)
- Grant Slatton - [Algorithms we develop software by](https://grantslatton.com/software-pathfinding?utm_source=tldrnewsletter)
- Sarah Constantin - [LLM Applications I Want To See](https://sarahconstantin.substack.com/p/llm-applications-i-want-to-see?utm_source=tldrnewsletter)
- xavd.id - [Effective Changelogs](https://xavd.id/blog/post/effective-changelogs/?utm_source=tldrnewsletter)
- [Watch this robot quickly install roof shingles | TechCrunch](https://techcrunch.com/2024/08/20/watch-this-robot-quickly-install-roof-shingles/?utm_source=tldrnewsletter)
- [Introducing Zed AI](https://zed.dev/blog/zed-ai?utm_source=tldrai)
- [The Silicon Valley Canon: On the Paıdeía of the American Tech Elite – The Scholar's Stage](https://scholars-stage.org/the-silicon-valley-canon-on-the-paideia-of-the-american-tech-elite/?utm_source=tldrnewsletter)
  - I feel like creating a page that collects these book collections.

### Around the World

- Collab Fund - [Fill The Bathtub](https://collabfund.com/blog/fill-the-bathtub/) - With all of the BS we are fed today, we want to get the facts and for politicians to tell it straight. Hence the term, "Fill the Bathtub".
- A reading list for the humanities. [Stupidity: A Reading List - by Ted Gioia](https://www.honest-broker.com/p/stupidity-a-reading-list?r=4t43z&triedRedirect=true&utm_source=substack&utm_medium=email)
- Florian Ulrich Jehn - [Societal Collapse](https://florianjehn.github.io/Societal_Collapse/)
- Columbia University Department of Psychiatry - [Why Forgetting is Good for Your Memory](https://www.columbiapsychiatry.org/news/why-forgetting-good-your-memory?utm_source=substack&utm_medium=email)
- [Shimmer | #1 ADHD Coaching Platform for Adults | Expert & Affordable](https://www.shimmer.care/)
- [The Onion’s new owners on escaping content farm hell and relaunching a newspaper - The Verge](https://www.theverge.com/24225592/the-onion-new-owners-print-newspaper-digital-media-gawker-ben-collins-decoder-interview)
- The New York Times - [Companies Hope Making Offices Like Hotels Will Lure Workers Back](https://www.nytimes.com/2024/08/18/business/office-design-work-resort.html?campaign_id=9&emc=edit_nn_20240819&instance_id=132067&nl=the-morning&regi_id=197092347&segment_id=175506&te=1&user_id=53888c42b17ce2b613ad43a8e73d64ef)
  - As someone who has been near this hotel, I really hope this won't be a full trend.
- [Why Not Just Learn from a Textbook, MIT OpenCourseWare, Khan Academy, etc.? - Justin Skycak](https://www.justinmath.com/why-not-just-learn-from-a-textbook/)
- This should really be around the universe
  - [Against all odds, an asteroid mining company appears to be making headway | Ars Technica](https://arstechnica.com/space/2024/08/against-all-odds-an-asteroid-mining-company-appears-to-be-making-headway/?utm_source=tldrnewsletter)
- Los Angeles Times - [What Los Angeles restaurant Botanica does with your dollar](https://www.latimes.com/food/story/2024-05-14/one-dollar-at-botanica-restaurant-los-angeles-heather-sperling)
  - I was listening to the Good Food podcast, and I am frankly appalled there's a scalping market for restaurants. But of course, it's not a black and white issue. But still, this shouldn't be the case.
- Alex Reichert - [On finishing things](https://www.alexreichert.com/blog/finishing?utm_source=tldrnewsletter)
- The New York Times - [Mike Lynch’s Body Is Found After Sicily Yacht Sinking, Official Says](https://www.nytimes.com/2024/08/22/world/europe/italy-sicily-yacht-bodies-found.html?campaign_id=9&emc=edit_nn_20240823&instance_id=132440&nl=the-morning&regi_id=197092347&segment_id=175890&te=1&user_id=53888c42b17ce2b613ad43a8e73d64ef)
  - If you haven't heard, Mike Lynch and Stephen Chamberlain died within. a week of each other after both being acquitted from fraud charges. The coincidence is telling but also tragic.
- The New York Times - [U.S. Accuses RealPage of Enabling Collusion on Rents in Antitrust Suit](https://www.nytimes.com/2024/08/23/business/economy/realpage-doj-antitrust-suit-rent.html?campaign_id=190&emc=edit_ufn_20240823&instance_id=132471&nl=from-the-times&regi_id=197092347&segment_id=175920&te=1&user_id=53888c42b17ce2b613ad43a8e73d64ef)

### Obits

- [Phil Donahue, Daytime Talk Show Host, Dies at 88](https://www.nytimes.com/2024/08/19/arts/television/phil-donahue-dead.html?campaign_id=190&emc=edit_ufn_20240819&instance_id=132083&nl=from-the-times&regi_id=197092347&segment_id=175526&te=1&user_id=53888c42b17ce2b613ad43a8e73d64ef)

### Videos

<iframe
  class="aspect-video w-full my-2"
  src="https://www.youtube.com/embed/_utGz9MPHQ0"
  title="People are now blurring their homes on Google Maps to deter potential burglars"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen></iframe>
