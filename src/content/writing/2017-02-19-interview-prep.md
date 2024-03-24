---
categories: ["learning"]
date: 2017-02-19
description: ""
draft: false
heroImage: ""

pubDate: "2017-02-19T08:00:00.000Z"
published: true
tags: ["learning", "interview", "prep"]
title: "Interview Prep"
---

A friend asked for my help with an upcoming interview she's preparing for,
so I thought it's a good time to write-up the interview preparation process.

## Interview Help Request

The following is the initial exchange of what areas she wanted to focus on.

> Here are the areas and key points (I know of) that they will be asking me about during the interview.

> For some additional context, the interview itself will have the interviewers seated and me standing in front of a whiteboard I can use when I am trying to explain a concept as well.
> Definitely meant to help them get a feel for how a candidate would present the information to a group of students.

### 1. **Explaining the HTTP Request and Response Cycle**

> *This is what [the interviewers] like to start with.*

> I should be able to comfortably navigate through the [HTTP Request & Response] cycle at its simplest.
> [For example, explain a GET request].

> Accurately describe major components:
- HTTP
- DNS
- the Client & Server
- HTTP request and response anatomy

> [And] note possible variations of a particular step.
> For example, naming a few common HTTP request and/or response headers that may be included and why.
> You must mention when & how a set-session token/key fits into this.

> Not sure whether or not I will need to get into the difference between handling a request for static content vs. a request requiring server-side processing.

> [They may want me to cover] server-side processing in the next topic.

> Additionally, I wouldn't be surprised if they wanted to test my general knowledge of the server setup.
> I would probably touch on this in my explanation, however they may want me to further clarify the role of the load balancer/proxy server software
> we typically install during deployment, such as Nginx/Phusion Passenger, and how its role differs from the server where the actual application/site resides.

> Or, just throw out a question to test that I know what it is.
> While listening to my presentation they will be making sure that I properly refer to the different parts and how they relate to each other.

> Interviewers are likely to interject asking for clarification on a point I glossed over, or if they want to see whether I have further knowledge of a component mentioned.
> From what I was told they try to make some questions somewhat similar to how a student may probe a new teacher during a lecture.

### 2. **Explaining MVC pattern architecture**

> I wasn't asked this in the first interview, however know I will be asked about this on the second.
> I am not sure exactly about the depth they will want me to go into. I think it mainly pertains to my understanding purpose of this architecture as well as being able to explain what each component/part does and how they interact.
> Finally, they will probably want my presentation to touch on request handling within an MVC pattern framework as well, definitely heard the motto "fat models, skinny controllers" a lot when I was being taught.

### 3. **OOP - 3 Pillars (Inheritance, Encapsulation & Polymorphism)**

> I think they want me to be able to provide a good 1-3 sentence definition of each of the three pillars. They will likely ask me to define some basic components and throw in trivial questions regarding classes, objects, method overriding, etc.
> In addition to above, they may want me to write out an example of one or possibly all the 3 pillars in Python/Ruby. (for this specific position, they will likely want some verbal/written examples to be provided for most of the topics mentioned)

### 4. **REST APIs & RESTful Routing**

> These areas I am more unsure about, in regards to what kind of information they would want.
> We didn't go very deeply into the concept of REST APIs during the bootcamp itself, any explanations were usually in optional sections of the platform.
> My best guess, based on the curriculum, is they would be satisfied with a well-rounded overview/definition of what REST is and why its used.
> Additionally, explaining implementation of RESTful Routing in a framework such as Rails or Django (more semi-RESTful for the latter).

> And there is a small chance they may ask me about APIs, which can be as general as "What is an API?" and "How are they used?" or as specific as providing an example of API usage with AJAX and jQuery.

### 5. **JavaScript Algorithms**

> There is a 75% chance they will ask me to do up to 2 of the following,
> however depending on the interviewer there is an off-chance I can get an algorithm I have never seen before or one they know I can't solve.

> Basic Data-type Manipulation (strings/arrays/dictionaries) - eg; reversing an array in place

> Popular Sorting Algorithms (Bubble, Selection, Insertion or Merge). *most likely culprits, but Quick Sort is on the table as well*

> Algorithms using Linked Lists or Binary Search Tree data structures. Could be Push/Shift/Unshift/Pop methods, linked lists algorithms & find/search with a BST

> Based on the advice I was given, they would first want me to explain how a particular algorithm works/show I understand the objective (eg, that the Push method would mean adding a node to the end of the linked list in question, or that I can explain how the Bubble sort actually sorts an array rather than how the Selection sort would accomplish that), next psuedo-code and say how I plan to approach the solution, then writing out the code (last two parts can be combined, like explaining as I write out the code).

## Sample Questions

From this scope, I'm taking a stab at formulating questions I would ask if I was interviewing this candidate.

### Questions about HTTP Request & Response Cycle

- Explain what happens when a user hits enter after typing a URL in a browser.
- What is the difference between latency and bandwidth?
- What is DNS?
- What is an IP address?
- Explain the HTTP request & response cycle
- Explain an AJAX request
- What are the drawbacks of using cookies? What are alternatives?
- What is session management?

#### Networking Questions

- What would you check if a website is slow?
- What is a load balancer? What are some examples of solutions?
- Explain long-polling. *Follow-up*: explain web-sockets.
[pubnub explanation](https://stackoverflow.com/questions/10028770/in-what-situations-would-ajax-long-short-polling-be-preferred-over-html5-websock)
- Explain WebRTC
- Explain Server Sent Events
- What is HTTP 1.1 and what is HTTP 2?
- What is an RFC (request for comments)? How about an ISO document?
[Sample RFC for HTTP 1.1](https://tools.ietf.org/html/rfc2616)
- What are some ways to optimize the payload sent from the server? (For example, gzip, uglfying js, minimizing css/js, shortening header content length, etc.)
- What is a CDN?

#### Security Questions

- What is CORS? What can you do with CORS to secure your website from cross-site request forgery (CSRF)?

### Questions about MVC Model

- What is the MVC model?
- How does the model, controller, and view interact with each other in Django?
How about in Rails? How about in any front-end framework?
- Have you heard of variations on the MVC model, like MVVM or MVP?
[stackoverflow](https://stackoverflow.com/questions/141912/alternatives-to-the-mvc)
- What are some examples of frameworks with MVC on the back-end?
What are some examples of having MVC or MVC-like frameworks on the front-end?
What are the pros and cons of having MVC all on the back-end?

#### Extra database questions

- What is ORM?
- What is a Store Procedure and how is it different to ORM?
- Can you write SQL queries in Rails Active Record?
- What is NoSQL?
- Why use a Document Database over a Relational Database?
- What are some purposes of a key-value store like Redis?
- What is the [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem)?
- What are the set of properties of database transactions, known as [ACID](https://en.wikipedia.org/wiki/ACID)?

#### Server Side Rendering

- What is server-side rendering? *Follow-up*: Why choose this over client-side templating?
- What is code-splitting? Why would you use this?

##### Resources

- [Michael Jackson's talk on Server-side Rendering, Code Splitting, and Hot Reloading](https://medium.com/@apostolos/server-side-rendering-code-splitting-and-hot-reloading-with-react-router-v4-87239cfc172c#.uin5876up)

### Questions about OOP - 3 Pillars (Inheritance, Encapsulation & Polymorphism)

- What are the three pillars of Object-oriented Programming?
- Please give an analogy representing each of the three pillars of Object-oriented Programming
- What is an example of the difference between inheritance and polymorphism?
*Answer*: Polymorphism is a subsection of Inheritance involving behaviors
- What are some principles of object-oriented design?
[SOLID principles](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design))

#### A brief detour in Functional Programming
- What's the difference between class inheritance and object composition?
- What is a closure in Javscript?
- What is immutability and when is it important to use this principle?
- What is prototypal inheritance in Javascript?
*Follow-up*: How is this different to classical inheritance?

##### Resources

- [10 Interview questions every JS Developer should know](https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95#.5bhsdwsnt)
- [Video explaining inheritance vs. composition](https://www.youtube.com/watch?v=wfMtDGfHWpA)
- [POODR](https://github.com/edenzik/cs105b/blob/master/books/Practical%20Object-Oriented%20Design%20in%20Ruby.pdf)

### Questions about REST APIs & RESTful Routing

- What is an API? Can you define it using the terms `consumer`, `provider`, and `contract`?
- What's the difference between a GET and POST request?
- If you were to create a new user through an REST API call, what HTTP verb would you use?
- If you were to query through a database given a complex query through an REST API call, what HTTP verb would you use?
- Why would you use a PUT call?
- Do you know what the [Open API Initiative](https://www.openapis.org/) is? *This one is to throw the person off*
[Swagger](https://swagger.io/) plug
- Why use placeholders in SQL queries? (Answer: defense against SQL Injections)
Better Question: What is a placeholder and why would you use them in SQL queries?

### Questions about JavaScript Algorithms

- Write a function that receives an argument for prime # and return the prime in that position.
Example:
```js
getPrime(2); // 3
getPrime(5); // 11
```
- Given a nested array, `[1, [2, 3, [4]]`, flatten the array, `[1, 2, 3, 4]`.
- In recursion, what is a base condition?
- Without using Javascript's `map` function, please write your own `map` implementation.
- Write a `select` function that takes an array of objects and finds the first entry of the object with a given name<string>.
- Given an array from 1 to 100, write a binary search which takes a target. What is the O notation of your solution?
(I personally hate this question)
- Given a class that mimics linked list data structure, write an add function for it.
(I also hate this question)
- Write a function that is a closure, i.e. a function that returns a function, for adding.
The input is how much to add by.
The return is a function that takes a number input that returns the sum of that number
and the first input.
```js
// answer
const addBy = (factor) => (number) => factor + number;
```
- *Follow-up*: Do the same for a product.
- Write a debounce function.
Debouncing is when you stop firing the same function for a certain amount of period after firing for the the first time.
For example, if you had a "resize" function, you would not fire "resize" if you set the debounce for 500ms.
- What is the difference between
[`apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) and
[`call()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)?
- What is the purpose of `this` keyword in Javascript?
- Explain scoping in Javascript.
- Explain variable hoisting in Javascript.
- Given a list of U.S. states and a list of capital cities, how would you merge these two lists to return one list?
The common factor between these two are state codes.
State collection example entry:
```json
[{
  "displayName": "California",
  "Abbr": "CA",
  "code": 4
}]
```
Capital City collection example entry:
```json
[{
  "displayName": "Sacramento",
  "stateCode": 4
}]
```
*Follow-up*: How could you filter this so you only return states that start with "North" or "South"?
Could you do this using the `reduce` function for Javascript Arrays?

#### Resources

- [Nodeschool on Closures](https://github.com/workshopper/scope-chains-closures)

#### Ruby Questions

These questions can also be for Python.

- What is memoization? When would you use this?
- What is a cache and how would you write a simple key-value cache?
- What is a lambda and why use this over blocks? How are lambdas and closures related?
- What are the differences between `private` and `protected` methods?

### Other Questions

- What is your favorite open source framework? Why is it your favorite? Are you a contributor to that project?
- What are the pros and cons of choosing an open source framework over a custom solution? When is it valid for a custom solution?
- What are some principles you have to error handling?
- *Follow-up*: What are some common exception types?
- Why would you use a `try...catch` block and should you use this in production?
- What are some general use-cases for logging?
- What are common failures that would cause your server to crash?

## Sample Criteria

Here's some criteria I look at when interviewing a new candidate. This is from past experience.

- Knowledgable: Can the candidate explain the content? Can the candidate solve the whiteboard problem? Can the candidate explain their own code? Can the candidate explain a foreign topic? (BS monitor)
- Presentation: Is the candidate concise? Or do they ramble? Can they explain concepts in a minute or less? Do they gauge the interviewer for comprehension? Is the candidate audible?
- Personality: Is the candidate asking questions and are they probing on open ended questions? Does the candidate exude humility, like saying "they don't know" when they don't know something?
- Seriousness: Is the candidate serious about the position? Did they do any research prior?
- Team player: Is the candidate's prior work long-standing at a single company or jumping around a lot in short-term gigs? Can the candidate work well with others?