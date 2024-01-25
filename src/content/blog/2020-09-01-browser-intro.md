---
categories: ["learning"]
date: 2020-08-31
description: "A short introductary guide to Browsers, written for incoming interns at Clear Labs"
draft: false
heroImage: ""

pubDate: "2020-08-31"
published: false
tags: ["learning", "programming", "browsers"]
title: Browsers - An Introduction
---

The following was written for interns starting out with browsers at Clear Labs.

Javascript was initially developed as a scripting language for the browser. The language has expanded into servers, IoT devices, serverless functions. But let’s take it a step back and talk more about its initial use case with browsers.

Back in the early days of the Web, developers wanted to handle more than reading documents. Forms were introduced to start this interactivity, and soon, developers wanted more APIs. These set of APIs for browsers, known as [DOM APIs](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), became the way a developer could interact with the browser using Javascript. Over the years, this has matured into a large set of APIs.

You can find a separate wiki page for the DOM APIs that we use for our app.

## Performance

The DOM, or the document object model, is a representation of the HTML on the page. The browser parses the HTML and puts that HTML in a representation called the DOM. In addition, the browser also parses the CSS and places it in a similar representation known as the CSSDOM. When these two are complete, a paint event can occur which can be shown to the user.

For more information about CSSDOM, please read [Lin Clark](https://twitter.com/linclark?lang=en)’s post about [Firefox’s Quantum engine rendering CSS](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/).

Javascript’s execution is slightly different than HTML and CSS. If Javascript gets loaded prior to the CSSDOM completion, it could block the browser’s paint execution until that Javascript is loaded. This phenomenon, known as Blocking, has some effects on performance.

For a deeper dive into browser performance, here are two (paid) books.

- [High Performance Web Sites](https://learning.oreilly.com/curation/view/high-performance-web/9780596529307/) - Written in 2007, still holds value in how browsers run. Some syntax has been updated, but the general advice is sound. It is highly likely you can find this book for free
- [Even Faster Websites](https://learning.oreilly.com/curation/view/even-faster-web/9780596803773/) - Written in 2009, a good follow-up to “High Performance Web Sites” that tackles additional topics about Javascript, the Browser, and the Network

To understand blocking, you have to understand the event loop. The following resource is a great primer on the event loop.

[What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ) - A Youtube video conference talk on how the event loop works. It also goes over some special topics of multi-threading with Javascript.

<iframe width="420" height="315" src="https://www.youtube.com/embed/8aGhZQkoFbQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Event Handling

One of Javascript’s purposes is to handle [events](https://developer.mozilla.org/en-US/docs/Web/API/Event) from the user. You could write some code like this:

```js
var input = document.getElementById("input-text-username");
input.onchange((event) => {
  // Do something with the event
  console.log(event);
});
```

The `onchange` attribute is function that takes a callback. A callback is a function that gets triggered when the event is triggered. Any event that takes place on the DOM can include a callback, for example, focus in on the element or mouseover the element.
