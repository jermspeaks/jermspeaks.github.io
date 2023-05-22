---
title: "YDKJS Part 1: Up & Going"
published: true
draft: false
categories: learning
tags: [javascript]
permalink: /:categories/:title.html
date: 2016-01-28
description: ""
pubDate: "2016-01-28"
heroImage: ""
postType: "learning"
---



## Pt. 1 - Up & Going

### Reader Note

I've been a Javascript developer for the past year and a half. By reading the "You don't Know Javascript" series, I'm hoping to hone my vanilla Javascript skills and have a deeper knowledge of the language.

In Up & Going, I'm hoping to review the basics and understand more deeply why the language has the set of tools it has, and perhaps a deeper understanding of why we write Javascript the way we do.

### Forward by [Jenn Lucas](http://jennlukas.com/)

* Lightbulb moment - the feeling when you got it.
  * Leading to this moment, you are frustrated

> When you strive to comprehend your code, you create better work and become better at what you do.

### Preface

> This You Don't Know JavaScript book series offers a contrary challenge: learn and deeply understand all of JavaScript, even and especially "The Tough Parts".

* I like this attitude as it focuses on the bits of the language I have to deal with time and time again. It helps me understand the behavior of Javascript without blindly looking at a **TypeError** with a quizzical expression.
  * i.e. Cut out the buzzwords. Learn the language

### Chapter 1: Into Programming

* Explains programming at a high level. I may skip large sections of this.
* *literal value* are values that are itself and are not stored. e.g. in the statement, `y = x + 4;`, 4 is a *literal value*.
* Expressions are the reference to variables, values, or set of variable(s) and value(s) combined with operators.
  * *Assignment expressions* assign a variable to another expression
  * I'm reviewing this because these basic building blocks can be fundamentally different. In **Go**, assignments can be completely different
* Review later: Javascript compiling in the first two chapters of *Scope & Closures*
* The `prompt()` function opens an alert with an input. You can assign the function with a variable. `age = prompt("What is your age?");`
* We take it for granted that specifying the variable in an assignment is typically on the left.
  * Side tangent: Are there languages that do the opposite?
* Some lesser known assignments in JS include
  * Remainder assignment `x %= y`
  * Shift assignments `x <<= y`
    * Shift bits left or right by a certain amount. The above example shifts bits to the left.
  * Bitwise assignments `x &= y` or `x = x & y`
    * The above example pertains to bits, using an AND logic.

#### AND logic table

| Bit | Bit | Result |
| --- | --- | ------ |
|  0  |  0  |    0   |
|  1  |  0  |    0   |
|  0  |  1  |    0   |
|  1  |  1  |    1   |

* values added to the source code are called *literals*
* **Implicit coersion** is when you're making a comparison against two different types. The `==` operation is 'loosely equal' and uses implicit coersion. For this reason, it should be avoided because it can cause unexpected bugs.
  * More on this later in Chapter 2 of this title & Chapter 4 of *Types & Grammar*
* Code comments help other humans understand your code. It's a communication point.

> Comments should explain why, not what. They can optionally explain how if that's particularly confusing.

* Note to self - focus on why, and less on what.
* *Static Typing* - variables adhere to *type enforcement*
* *Dynamic Typing* - allows a variable to represent a value regardless of type. Javascript adheres to this.
* *State* is tracking changes to values as the program runs. In redux, we keep a global state to track the user's progress through the application.
* Constants are declared once and don't change. In ES6, when you declare a constant once, it throws an error if there is an attempt to change it. This is like the static-tying type enforcement.
* A group of series of statements strung together are called a *block*. A *block* is contained within curly brackets. `{ .. }`
  * In *Ruby*, there are different ways to show a block. In fact, there are different types of blocks, like your general block, procs, and lambdas.
* Conditions throw an error if its expression between the parentheses are not a boolean.
* "Falsy" values are converted to the boolean `false`. "Truthy" values do the opposite. More on this in Chapter 4 of `Types & Grammar`
* An *iteration* occurs each time a block is called.

> **Warning:** For a variety of historical reasons, programming languages almost always count things in a zero-based fashion, meaning starting with 0 instead of 1. If you're not familiar with that mode of thinking, it can be quite confusing at first. Take some time to practice counting starting with 0 to become more comfortable with it!

* I rarely use `do..while` loops. Here's the syntax.

```js
do {
  console.log('How may I help you?');
  // Help the customer
  numOfCustomers = numOfCustomers - 1;
} while (numOfCustomer > 0);
```

* Like **C**, the Javascript for loop has three clauses.
  1. The initialization clause
  1. The conditional clause
  1. The update clause

* Reusable pieces of code can be gathered into a *function*
* The *lexical scope*, or *scope*, is the programming term to tell us where our variables can be accessed.

```js
function outer() {
    var a = 1;

    function inner() {
        var b = 2;

        // we can access both `a` and `b` here
        console.log( a + b );   // 3
    }

    inner();

    // we can only access `a` here
    console.log( a );           // 1
}

outer();
```

In the example, you can't call `inner();` on the outermost scope. It can only be called within the `outer` function scope, as shown.

* More on lexical scope in the first three chapters of *Scope & Closures*

### Chapter 2. Into Javascript

**Note:** After reading through the first chapter, I realize I don't really need to review too much. I'm going to skim this chapter and only note the things that I really think are worthwhile. Otherwise, I will keep notes on this chapter to a minimum.

* No value set type is `undefined`.
* I didn't know `null` is an object type. Weird bug probably will never get fixed.

> `typeof null` is an interesting case, because it errantly returns "object", when you'd expect it to return "null".

* To learn: Javascript's `symbols`. I'm well aware of **Ruby's** implementation of symbols like `:symbol_example`, which are used in many different contexts like classes. Will elaborate more on this in the ES6 portion.
* Arrays and functions are subtypes to objects. In my introduction to JS, I assumed "everything is an object".
* Built-In Type Methods extend the power of Javascript. These methods are like `String.prototype.toUpperCase`.
* *Coercion* comes in two forms: *explicit* and *implicit*
  * *explicit* is with both types the same.
  * *implicit* is when type conversion can happen.
* Coercion is not evil. There are times when you may need to convert types.
* List of falsy:
  * `""` (empty string)
  * `0`, `-0`, `NaN`
  * `null`, `undefined`
  * `false`
* Things that can be truthy
  * non-empty strings
  * non-zero, valid numbers
  * `true`
  * arrays, empty or non-empty
  * objects, empty or non-empty
  * functions
* `==` checks for value equality. Coercion allowed.
* `===` checks for value and type equality. Coercion not allowed. Also known as `strict equality`

Some simple rules for equality of when to use `==` or `===`.

> If either value (aka side) in a comparison could be the true or false value, avoid == and use ===.

> If either value in a comparison could be of these specific values (0, "", or [] -- empty array), avoid == and use ===.

> In all other cases, you're safe to use ==. Not only is it safe, but in many cases it simplifies your code in a way that improves readability.

* I've played it safe with this, but I may revisit using `==` more often, if it doesn't violate the rules. **Important note:** think critically before use.

> You might think that two arrays with the same contents would be == equal, but they're not

* This just confuses me. MDN breaks down the ["Abstract Equality Comparison Algorithm"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).
* Inequality operators follow implicit coercion
* When comparing numbers with strings, the strings get coerced into a number. When the string contains non-number characters, it gets converted to `NaN` and when comparing with `<` or `>`, `NaN` is neither greater nor less than a value, hence returns `false`.
* *Hoisting* is when a variable is moved to the top of the enclosing scope. (conceptually speaking)
* Okay to use a function before it is declared as function declarations are hoisted. Generally not good with variables.
* Use `let` for block scoped variables. For example, in an `if` block, you declare a variable you only want to be used within that block, use `let`.

```js
function foo() {
    var a = 1;

    if (a >= 1) {
        let b = 2;

        while (b < 5) {
            let c = b * 2;
            b++;

            console.log( a + c );
        }
    }
}

foo();
// 5 7 9
```

* `Strict mode` was introduced in **ES5**. Noted with `"use strict"`.
* Strict mode disallows implicit auto-global variable declaration from omitting the `var`.
* I feel computer science needs to put unnecessarily long titles to items. **Immediately invoked function expressions (IIFE)** are involved upon declaration.

```js
(function IIFE(){
    console.log( "Hello!" );
})();
// "Hello!"
```

* An example use case was with [Highcharts](http://www.highcharts.com/) and creating an options object. You can't always assign a key with a function, so this is one way around it.
* **Closure** is a way to "remember" and continue to access a function's scope.
  * I think of this as a way to tweak functions without having to write out more functions.
  * This is least understood by JS developers, and I think I know why. To me, it's a function generator, although that's an improper term because Javascript can create a generator function, which is a totally different topic.

> The most common usage of closure in Javascript is the module pattern. Modules let you define private implementation details (variables, functions) that are hidden from the outside world, as well as a public API that is accessible from the outside.

* Executing the module as a function creates an instance of that module.
* The `this` operator reference depends on how the function is called. That will determine what `this` is. There are four rules of how `this` gets set. More on this later in the `this & Object Prototype` book.
* Prototype links allow one object to delegate properties from another object. What this means is a property prototype linked is not attached to that object but to its original object (which could in turn, just be the __proto__ property of Object).
* Do not think of applying prototypes as inheritance. It follows a pattern called "behavior delegation", delegating one part of an object to another.
* Bring the old to new with **polyfiling** and **transpiling**.
  * A "polyfill" is to take a definition of a newer feature and produce a piece of code equivalent to the behavior for older JS environments.
    * An example is [lodash](https://lodash.com/) that has a bunch of features from ES5 and ES6 which some frameworks utilize, like `forEach` and `map`.
  * Careful writing your own polyfill as you should adhere closely to the specification.
  * Better yet, use the vetted ones.
  * Transpiling is great for new syntax. It is a tool that converts your code to older coding environments. You can break down the word "transpiling" into transforming + compiling.
* `arguments` can be used functions to determine which arguments were passed in. It is not a reserved word, so you can assign it to a different value. When calling it, it outputs an array.
* The book series doesn't cover Non-Javascript, like the DOM API. But you need to be aware of it. DOM API could actually be written by the browsers in **C/C++**.
* The `document` object is a "host object", a special object that has been implemented by the browser.

### Chapter 3: Into YDKJS

This chapter is a preface to the other books. I'll skip these notes as I'll be covering this in more detail in those posts.

See you next time!
