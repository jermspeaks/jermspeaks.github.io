---
tags: ["essay", "blog", "post", "programming"]
title: Single Responsibility
date: 2017-01-26
pubDate: "2017-01-26"
description: ""
heroImage: ""

---



Single responsibility means one unit of code does one thing.
It should not be responsibility for many different things.
In other words, it adheres to "separation of concerns".

In dynamic languages like Javascript, there's no typechecking what a function can return.
So, a function could take any arguments of any type and return any type.

In general, we want to avoid this. Take the following code example.

```js
const PLAYER_BEHAVIORS = [{
  code: 0,
  displayName: 'Autoplay'
}, {
  code: 1,
  displayName: 'Click to play'
}];

function getPlayerBehavior(index = -1) {
  if (index !== -1) {
    return PLAYER_BEHAVIORS.find(playerBehavior => playerBehavior.id === index).name;
  } else {
    return PLAYER_BEHAVIORS.map(playerBehavior => playerBehavior.name);
  }
}
```

Our function, `getPlayerBehavior`, takes one input that should be a number
However, the first `return` statement returns a type `String`,
while the second `return` returns a type `Array`.

This is an example where the function is doing two different things in one
unit of code. We want to avoid this behavior and evaludate what this function should do.
Should it pass back the list of behavior names
or should it find the behavior given the index.

Take the following solution as a guideline.

```js
// Same constant
function getPlayerBehaviors() {
  return PLAYER_BEHAVIORS.map(playerBehavior => playerBehavior.name);
}

function findPlayerBehavior(index) {
  if (Number.isInteger(index)) {
    const playerBehavior = PLAYER_BEHAVIORS.find(playerBehaviour => playerBehaviour.id === index);
    if (playerBehavior) {
      return playerBehavior.name;
    } else {
      // Could not find player behavior
      return '';
    }
  } else {
    throw new Error('index should be type Number:Integer');
  }
}
```

In this example, we have separated the function into two functions because they are doing two separate things.
Depending on how we called this function before, we will have to determine
which function to use before we make the function call.
