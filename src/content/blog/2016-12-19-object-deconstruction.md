---
tags: ["essay", "blog", "post", "programming", "learning"]
title: Object Deconstruction in Javascript
date: 2016-12-19
pubDate: "2016-12-19"
description: ""
heroImage: ""

---



## Writing cleaner Javascript

The Javascript ES2015 spec introduces object destructing. Object destructing used to pass a single object parameter instead of long argument lists to functions. Take the following code example.

**Bad Code:**

```js
function enableListFilter(option, filterName, filterIndex, activeAccessTypeIndex) {
  // Do Something
}

enableListFilter(option, filterName, filterIndex, activeAccessTypeIndex);
```

The function requires the developer to know the order of the parameters passed into the function.
When this is one argument, that's easy.
When it gets to 2 or more arguments, this can get difficult since that stretches a developer's [working memory](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2657600/) a la "yet another thing to remember".
Here's an alternative.

**Better Code:**

```js
function enableListFilter({ option, filterName, filterIndex, activeAccessTypeIndex }) {
  // Do Something
}

enableListFilter({
  option: option,
  filterName: filterName,
  filterIndex: filterIndex,
  activeAccessTypeIndex: activeAccessTypeIndex
});
```

If you want to reduce the number of lines, you can use the object parameter shorthand.
Note: A caveat of this approach your argument names must be the same name.
In most cases, an explicit approach of writing out object keys is better.

```js
enableListFilter({ option, filterName, filterIndex, activeAccessTypeIndex });
```
