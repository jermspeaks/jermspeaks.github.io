---
title: Javascript - An Introduction
published: false
draft: false
categories: ["learning"]
tags: ["audit", "checklist"]
date: 2020-09-01
description: "A short introductary guide to Javascript, written for incoming interns at Clear Labs"
pubDate: "2020-09-01"
heroImage: ""
postType: "learning"
---

The following was written for interns starting out with Javascript at Clear Labs.

## Base Foundation

Whether this is your first time with Javascript or as a seasoned developer, you should have some base knowledge prior to working with React. While you can learn a framework, it’s more beneficial to understand the language it is written in. For example, what are promises and how does javascript handle asynchronous actions? What is the event loop? And how does Javascript fit in?

Here are some resources to get you started

- [Freecodecamp](https://www.freecodecamp.org/) - if you have no foundational knowledge of Javascript or need a refresher for the Javascript syntax, start here
- [MDN Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Mozilla’s documentation on where to get started with Javascript
- [MDN Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) - Mozilla’s documentation on promises
- [Async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) - Mozilla’s documentation on handling promises using async functions
- [Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) - Mozilla’s documentation about browser javascript errors

## Going Deeper

Many developers find Javascript hard because it started as a scripting language, the syntax looks ugly, and you get these TypeErrors if you’re not careful. That said, with some major changes to the language since Node.js and Google’s V8 engine, Javascript has become a more seasoned programming language. You can develop classes, write generator functions, handle asynchronous events, and enumerate over lists much easier.

Once you’ve started with the basics above, feel free to continue to hone your skills with a deeper understanding of Javascript.

- ES2015+ - a new set of functionality in Javascript that allows you to write more effective code. See the [Ecmascript](#ecmascript) section below for more information.
- [You Don’t Know JS](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/README.md) - A series of books written by [Kyle Simpson](https://twitter.com/getify) that talks about diving deep into the core mechanisms of Javascript

### Ecmascript

JavaScript is a subset of ECMAScript. JavaScript is basically ECMAScript at its core but builds upon it. Languages such as ActionScript, JavaScript, JScript all use ECMAScript as its core. As a comparison, AS/JS/JScript are 3 different cars, but they all use the same engine... each of their exteriors is different though, and there have been several modifications done to each to make it unique.

The history is, Brendan Eich created Mocha which became LiveScript, and later JavaScript. Netscape presented JavaScript to Ecma International, which develops standards and it was renamed to ECMA-262 aka ECMAScript.

It's important to note that Brendan Eich's "JavaScript" is not the same JavaScript that is a dialect of ECMAScript. He built the core language which was renamed to ECMAScript, which differs from the JavaScript which browser-vendors implement nowadays.

- [Wikipedia Reference](https://en.wikipedia.org/wiki/ECMAScript)
- [Reference from StackOverflow](https://stackoverflow.com/questions/4269150/what-is-ecmascript)

### ES2015 / ES6

If your base understanding of Javascript is prior to ES6, you'll want to read up on the basics. To start, arrow functions, classes, let and const statements are used throughout the app.

### Arrow Functions

Often times we have nested functions in which we would like to preserve the context of this from its lexical scope. An example is shown below:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(function (character) {
    return this.name + character; // Cannot read property 'name' of undefined
  });
};
```

One common solution to this problem is to store the context of this using a variable:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  var that = this; // Store the context of this
  return arr.map(function (character) {
    return that.name + character;
  });
};
```

We can also pass in the proper context of this:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(function (character) {
    return this.name + character;
  }, this);
};
```

As well as bind the context:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map(
    function (character) {
      return this.name + character;
    }.bind(this)
  );
};
```

Using Arrow Functions, the lexical value of this isn't shadowed and we can re-write the above as shown:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.prefixName = function (arr) {
  return arr.map((character) => this.name + character);
};
```

Best Practice: Use Arrow Functions whenever you need to preserve the lexical value of this.

Arrow Functions are also more concise when used in function expressions which simply return a value:

```js
const arr = [1, 2, 3];
const mappedArr = arr.map((number) => number + 3);
console.log(mappedArr); // => [4, 5, 6]
```

Best Practice: Use Arrow Functions in place of function expressions when possible.

Template Literals

Using Template Literals, we can now construct strings that have special characters in them without needing to escape them explicitly.

```js
var text = 'This string contains "double quotes" which are escaped.';
let text = `This string contains "double quotes" which don't need to be escaped anymore.`;
```

Template Literals also support interpolation, which makes the task of concatenating strings and values:

```js
var name = "Tiger";
var age = 13;

console.log("My cat is named " + name + " and is " + age + " years old.");
```

Much simpler:

```js
const name = "Tiger";
const age = 13;

console.log(`My cat is named ${name} and is ${age} years old.`);
```

In ES5, we handled new lines as follows:

```js
var text = "cat\n" + "dog\n" + "nickelodeon";
```

Or:

```js
var text = ["cat", "dog", "nickelodeon"].join("\n");
```

Template Literals will preserve new lines for us without having to explicitly place them in:

```js
let text = `cat
dog
nickelodeon`;
```

Template Literals can accept expressions, as well:

```js
let today = new Date();
let text = `The time and date is ${today.toLocaleString()}`;
```

Classes

Prior to ES6, we implemented Classes by creating a constructor function and adding properties by extending the prototype:

```js
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

Person.prototype.incrementAge = function () {
  return (this.age += 1);
};
```

And created extended classes by the following:

```js
function Personal(name, age, gender, occupation, hobby) {
  Person.call(this, name, age, gender);
  this.occupation = occupation;
  this.hobby = hobby;
}

Personal.prototype = Object.create(Person.prototype);
Personal.prototype.constructor = Personal;
Personal.prototype.incrementAge = function () {
  Person.prototype.incrementAge.call(this);
  this.age += 20;
  console.log(this.age);
};
```

ES6 provides much needed syntactic sugar for doing this under the hood. We can create Classes directly:

```js
class Person {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  incrementAge() {
    this.age += 1;
  }
}
```

And extend them using the extends keyword:

```js
class Personal extends Person {
  constructor(name, age, gender, occupation, hobby) {
    super(name, age, gender);
    this.occupation = occupation;
    this.hobby = hobby;
  }

  incrementAge() {
    super.incrementAge();
    this.age += 20;
    console.log(this.age);
  }
}
```

Best Practice: While the syntax for creating classes in ES6 obscures how implementation and prototypes work under the hood, it is a good feature for beginners and allows us to write cleaner code.

### Let / Const

Besides var, we now have access to two new identifiers for storing values —let and const. Unlike var, let and const statements are not hoisted to the top of their enclosing scope.

An example of using var:

```js
var snack = "Meow Mix";

function getFood(food) {
  if (food) {
    var snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false); // undefined
```

However, observe what happens when we replace var using let:

```js
let snack = "Meow Mix";

function getFood(food) {
  if (food) {
    let snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false); // 'Meow Mix'
```

This change in behavior highlights that we need to be careful when refactoring legacy code which uses var. Blindly replacing instances of var with let may lead to unexpected behavior.

Note: let and const are block scoped. Therefore, referencing block-scoped identifiers before they are defined will produce a ReferenceError.

```js
console.log(x); // ReferenceError: x is not defined

let x = "hi";
```

Best Practice: Leave var declarations inside of legacy code to denote that it needs to be carefully refactored. When working on a new codebase, use let for variables that will change their value over time, and const for variables which cannot be reassigned.

### Destructuring

[MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

Destructuring allows us to extract values from arrays and objects (even deeply nested) and store them in variables with a more convenient syntax.

Destructuring Arrays

```js
var arr = [1, 2, 3, 4];
var a = arr[0];
var b = arr[1];
var c = arr[2];
var d = arr[3];
let [a, b, c, d] = [1, 2, 3, 4];

console.log(a); // 1
console.log(b); // 2
```

Destructuring Objects

```js
var luke = { occupation: "jedi", father: "anakin" };
var occupation = luke.occupation; // 'jedi'
var father = luke.father; // 'anakin'
let luke = { occupation: "jedi", father: "anakin" };
let { occupation, father } = luke;

console.log(occupation); // 'jedi'
console.log(father); // 'anakin'
```

### Parameters

In ES5, we had varying ways to handle functions which needed default values, indefinite arguments, and named parameters. With ES6, we can accomplish all of this and more using more concise syntax.

Default Parameters

```js
function addTwoNumbers(x, y) {
  x = x || 0;
  y = y || 0;
  return x + y;
}
```

In ES6, we can simply supply default values for parameters in a function:

```js
function addTwoNumbers(x = 0, y = 0) {
  return x + y;
}
addTwoNumbers(2, 4); // 6
addTwoNumbers(2); // 2
addTwoNumbers(); // 0
```

### Symbols

Symbols have existed prior to ES6, but now we have a public interface to using them directly. Symbols are immutable and unique and can be used as keys in any hash.

```js
Symbol();
```

Calling Symbol() or Symbol(description) will create a unique symbol that cannot be looked up globally. A Use case for Symbol() is to patch objects or namespaces from third parties with your own logic, but be confident that you won't collide with updates to that library. For example, if you wanted to add a method refreshComponent to the React.Component class, and be certain that you didn't trample a method they add in a later update:

```js
const refreshComponent = Symbol();

React.Component.prototype[refreshComponent] = () => {
  // do something
};

Symbol.for(key);
```

Symbol.for(key) will create a Symbol that is still immutable and unique, but can be looked up globally. Two identical calls to Symbol.for(key) will return the same Symbol instance. NOTE: This is not true for Symbol(description):

```js
Symbol("foo") === Symbol("foo"); // false
Symbol.for("foo") === Symbol("foo"); // false
Symbol.for("foo") === Symbol.for("foo"); // true
```

A common use case for Symbols, and in particular with Symbol.for(key) is for interoperability. This can be achieved by having your code look for a Symbol member on object arguments from third parties that contain some known interface. For example:

```js
function reader(obj) {
  const specialRead = Symbol.for("specialRead");
  if (obj[specialRead]) {
    const reader = obj[specialRead]();
    // do something with reader
  } else {
    throw new TypeError("object cannot be read");
  }
}
```

And then in another library:

```js
const specialRead = Symbol.for("specialRead");

class SomeReadableType {
  [specialRead]() {
    const reader = createSomeReaderFrom(this);
    return reader;
  }
}
```

A notable example of Symbol use for interoperability is Symbol.iterator which exists on all iterable types in ES6: Arrays, strings, generators, etc. When called as a method it returns an object with an Iterator interface.

### Maps

[MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Maps is a much needed data structure in JavaScript. Prior to ES6, we created hash maps through objects:

```js
var map = new Object();
map[key1] = "value1";
map[key2] = "value2";
```

However, this does not protect us from accidentally overriding functions with specific property names:

```js
> getOwnProperty({ hasOwnProperty: 'Hah, overwritten'}, 'Pwned');
> TypeError: Property 'hasOwnProperty' is not a function
```

Actual Maps allow us to set, get and search for values (and much more).

```js
let map = new Map();
> map.set('name', 'david');
> map.get('name'); // david
> map.has('name'); // true
```

The most amazing part of Maps is that we are no longer limited to just using strings. We can now use any type as a key, and it will not be type-cast to a string.

```js
let map = new Map([
  ["name", "david"],
  [true, "false"],
  [1, "one"],
  [{}, "object"],
  [function () {}, "function"],
]);

for (let key of map.keys()) {
  console.log(typeof key);
  // > string, boolean, number, object, function
}
```

Note: Using non-primitive values such as functions or objects won't work when testing equality using methods such as map.get(). As such, stick to primitive values such as Strings, Booleans and Numbers.

We can also iterate over maps using .entries():

```js
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
```

### Promises

Promises allow us to turn our horizontal code (callback hell):

```js
func1(function (value1) {
  func2(value1, function (value2) {
    func3(value2, function (value3) {
      func4(value3, function (value4) {
        func5(value4, function (value5) {
          // Do something with value 5
        });
      });
    });
  });
});
```

Into vertical code:

```js
func1(value1)
  .then(func2)
  .then(func3)
  .then(func4)
  .then(func5, (value5) => {
    // Do something with value 5
  });
```

Prior to ES6, we used bluebird or Q. Now we have Promises natively:

```js
new Promise((resolve, reject) =>
  reject(new Error("Failed to fulfill Promise"))
).catch((reason) => console.log(reason));
```

Where we have two handlers, resolve (a function called when the Promise is fulfilled) and reject (a function called when the Promise is rejected).

Benefits of Promises: Error Handling using a bunch of nested callbacks can get chaotic. Using Promises, we have a clear path to bubbling errors up and handling them appropriately. Moreover, the value of a Promise after it has been resolved/rejected is immutable - it will never change.

Here is a practical example of using Promises:

```js
var request = require("request");

return new Promise((resolve, reject) => {
  request.get(url, (error, response, body) => {
    if (body) {
      resolve(JSON.parse(body));
    } else {
      resolve({});
    }
  });
});
```

We can also parallelize Promises to handle an array of asynchronous operations by using Promise.all():

```js
let urls = [
  "/api/commits",
  "/api/issues/opened",
  "/api/issues/assigned",
  "/api/issues/completed",
  "/api/issues/comments",
  "/api/pullrequests",
];

let promises = urls.map((url) => {
  return new Promise((resolve, reject) => {
    $.ajax({ url: url }).done((data) => {
      resolve(data);
    });
  });
});

Promise.all(promises).then((results) => {
  // Do something with results of all our promises
});
```

### Generators

Similar to how Promises allow us to avoid callback hell, Generators allow us to flatten our code - giving our asynchronous code a synchronous feel. Generators are essentially functions which we can pause their execution and subsequently return the value of an expression.

A simple example of using generators is shown below:

```js
function* sillyGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

var generator = sillyGenerator();
> console.log(generator.next()); // { value: 1, done: false }
> console.log(generator.next()); // { value: 2, done: false }
> console.log(generator.next()); // { value: 3, done: false }
> console.log(generator.next()); // { value: 4, done: false }
```

Where next will allow us to push our generator forward and evaluate a new expression. While the above example is extremely contrived, we can utilize Generators to write asynchronous code in a synchronous manner:

// Hiding asynchronousity with Generators

```js
function request(url) {
  getJSON(url, function (response) {
    generator.next(response);
  });
}
```

And here we write a generator function that will return our data:

```js
function* getData() {
  var entry1 = yield request("https://some_api/item1");
  var data1 = JSON.parse(entry1);
  var entry2 = yield request("https://some_api/item2");
  var data2 = JSON.parse(entry2);
}
```

By the power of yield, we are guaranteed that entry1 will have the data needed to be parsed and stored in data1.

While generators allow us to write asynchronous code in a synchronous manner, there is no clear and easy path for error propagation. As such, as we can augment our generator with Promises:

```js
function request(url) {
  return new Promise((resolve, reject) => {
    getJSON(url, resolve);
  });
}
```

And we write a function which will step through our generator using next which in turn will utilize our request method above to yield a Promise:

```js
function iterateGenerator(gen) {
  var generator = gen();
  (function iterate(val) {
    var ret = generator.next();
    if (!ret.done) {
      ret.value.then(iterate);
    }
  })();
}
```

By augmenting our Generator with Promises, we have a clear way of propagating errors through the use of our Promise .catch and reject. To use our newly augmented Generator, it is as simple as before:

```js
iterateGenerator(function* getData() {
  var entry1 = yield request("https://some_api/item1");
  var data1 = JSON.parse(entry1);
  var entry2 = yield request("https://some_api/item2");
  var data2 = JSON.parse(entry2);
});
```

We were able to reuse our implementation to use our Generator as before, which shows their power. While Generators and Promises allow us to write asynchronous code in a synchronous manner while retaining the ability to propagate errors in a nice way, we can actually begin to utilize a simpler construction that provides the same benefits: async-await.

### Async Await

While this is actually an upcoming ES2016 feature, async await allows us to perform the same thing we accomplished using Generators and Promises with less effort:

```js
var request = require("request");

function getJSON(url) {
  return new Promise(function (resolve, reject) {
    request(url, function (error, response, body) {
      resolve(body);
    });
  });
}

async function main() {
  var data = await getJSON();
  console.log(data); // NOT undefined!
}

main();
```

Under the hood, it performs similarly to Generators. I highly recommend using them over Generators + Promises. A great resource for getting up and running with ES7 and Babel can be found here.

### Getter and setter functions

ES6 has started supporting getter and setter functions within classes. Using the following example:

```js
class Employee {
  constructor(name) {
    this._name = name;
  }

  get name() {
    if (this._name) {
      return "Mr. " + this._name.toUpperCase();
    } else {
      return undefined;
    }
  }

  set name(newName) {
    if (newName == this._name) {
      console.log("I already have this name.");
    } else if (newName) {
      this._name = newName;
    } else {
      return false;
    }
  }
}

var emp = new Employee("James Bond");

// uses the get method in the background
if (emp.name) {
  console.log(emp.name); // Mr. JAMES BOND
}

// uses the setter in the background
emp.name = "Bond 007";
console.log(emp.name); // Mr. BOND 007
```

Latest browsers are also supporting getter/setter functions in Objects and we can use them for computed properties, adding listeners and preprocessing before setting/getting:

```js
var person = {
  firstName: "James",
  lastName: "Bond",
  get fullName() {
    console.log("Getting FullName");
    return this.firstName + " " + this.lastName;
  },
  set fullName(name) {
    console.log("Setting FullName");
    var words = name.toString().split(" ");
    this.firstName = words[0] || "";
    this.lastName = words[1] || "";
  },
};

person.fullName; // James Bond
person.fullName = "Bond 007";
person.fullName; // Bond 007
```

### ES6 Modules

Prior to ES6, we used libraries such as Browserify to create modules on the client-side, and require in Node.js. With ES6, we can now directly use modules of all types (AMD and CommonJS).

Exporting in ES6

With ES6, we have various flavors of exporting. We can perform Named Exports:

```js
export let name = 'David';
export let age  = 25;​​
```

As well as exporting a list of objects:

```js
function sumTwo(a, b) {
  return a + b;
}

function sumThree(a, b, c) {
  return a + b + c;
}

export { sumTwo, sumThree };
```

We can also export functions, objects and values (etc.) simply by using the export keyword:

```js
export function sumTwo(a, b) {
  return a + b;
}

export function sumThree(a, b, c) {
  return a + b + c;
}
```

And lastly, we can export default bindings:

```js
function sumTwo(a, b) {
  return a + b;
}

function sumThree(a, b, c) {
  return a + b + c;
}

let api = {
  sumTwo,
  sumThree,
};

export default api;

/* Which is the same as
 * export { api as default };
 */
```

Best Practices: Always use the export default method at the end of the module. It makes it clear what is being exported, and saves time by having to figure out what name a value was exported as. More so, the common practice in CommonJS modules is to export a single value or object. By sticking to this paradigm, we make our code easily readable and allow ourselves to interpolate between CommonJS and ES6 modules.

### Importing in ES6

ES6 provides us with various flavors of importing. We can import an entire file:

```js
import "underscore";
```

It is important to note that simply importing an entire file will execute all code at the top level of that file.

Similar to Python, we have named imports:

```js
import { sumTwo, sumThree } from "math/addition";
```

We can also rename the named imports:

```js
import {
  sumTwo as addTwoNumbers,
  sumThree as sumThreeNumbers,
} from "math/addition";
```

In addition, we can import all the things (also called namespace import):

```js
import * as util from "math/addition";
```

Lastly, we can import a list of values from a module:

```js
import * as additionUtil from "math/addition";
const { sumTwo, sumThree } = additionUtil;
```

Importing from the default binding like this:

```js
import api from "math/addition";
// Same as: import { default as api } from 'math/addition';
```

While it is better to keep the exports simple, but we can sometimes mix default import and mixed import if needed. When we are exporting like this:

```js
// foos.js
export { foo as default, foo1, foo2 };
```

We can import them like the following:

```js
import foo, { foo1, foo2 } from "foos";
```

When importing a module exported using commonjs syntax (such as React) we can do:

```js
import React from "react";
const { Component, PropTypes } = React;
```

This can also be simplified further, using:

```js
import React, { Component, PropTypes } from "react";
```

Note: Values that are exported are bindings, not references. Therefore, changing the binding of a variable in one module will affect the value within the exported module. Avoid changing the public interface of these exported values.

### Additional Resources

In addition to those features of ES6+, you'll notice other features that you can incrementally learn as you go along. Here's an incomplete list.

- [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
