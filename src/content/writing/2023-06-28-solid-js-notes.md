---
date: 2023-06-28
description: "A dive into my personal notes on SolidJS, as I was going through the tutorial."
draft: false
heroImage: "https://www.solidjs.com/assets/logo-123b04bc.svg"
heroImageAlt: "SolidJS Logo"

pubDate: "2023-06-28T08:00:00.000Z"
title: "SolidJS"
tags: ["learning", "Typescript", "programming"]
---

> SolidJS is a Javascript framework for building fast, declarative UIs on the web. It shares many ideas with [React](/blog/2019-11-21-react/), but does not use the virtual DOM to deliver a more performant and pragmatic developer experience.

- [SolidJS Website](https://www.solidjs.com/)
- [New Docs](https://docs.solidjs.com/)
- [Old Docs (API Reference)](https://www.solidjs.com/docs/latest/api)

## Try SolidJS

- [Playground link](https://playground.solidjs.com/)
  - In the playground, you can view the compiled output.
  - Also, you can change the compile mode, between "Client side rendering", "Server side rendering", and "Client side rendering with hydration"
  - Any code that you write in the playground can be exported to a coding sandbox, like [Codesandbox](https://codesandbox.io/). So helpful!

## Philosophy - Think Solid

1. Declarative Data
2. Vanishing Components

- Solid updates are completely independent of the components. Component functions are called once and then cease to exist.

3. Read/Write segregation

- We don't need true immutability to enforce unidirectional flow, just the ability to make the conscious decision which consumers may write and which may not.

4. Simple is better than easy

## Compilation

> Solid's JSX compiler doesn't just compile JSX to JavaScript; it also extracts reactive values (which we'll get to later in the tutorial) and makes things more efficient along the way.
>
> This is more involved than React's JSX compiler, but much less involved than something like Svelte's compiler. Solid's compiler doesn't touch your JavaScript, only your JSX.

- [A Look at Compilation in JavaScript Frameworks](https://dev.to/this-is-learning/a-look-at-compilation-in-javascript-frameworks-3caj)

## Differences to React

### Props Destructuring

> Destructuring `props` is usually a bad idea in Solid. Under the hood, Solid uses *proxies* to hook into `props` objects to know when a prop is accessed. When we destructure our props object in the function signature, we immediately access the object's properties and lose reactivity.

So in general, avoid the following:

```jsx
function Bookshelf({ name }) {
  return (
    <div>
      <h1>{name}'s Bookshelf</h1>
      <Books />
      <AddBook />
    </div>
  );
}
```

And replace with `props` instead.

### Dependency Arrays

> In React, you'd declare the dependencies explicitly using the dependency array. If you didn't, the effect would rerun whenever *any* state in the component changes. In Solid, dependencies are tracked automatically, and you don't have to worry about extra reruns.

### Looping with `array.map`

> If we used `array.map` in Solid, *every element* inside the book would have to rerender whenever the `books` signal changes. The `For` component checks the array when it changes, and only updates the necessary element. It's the same kind of checking that React's VDOM rendering system does for us when we use `.map`.

### Conditional `if` statements on re-rendering

> In the [Building UI with Components](https://docs.solidjs.com/tutorials/getting-started-with-solid/building-ui-with-components) section of this tutorial, we noted that component functions *run only once* in Solid. This means the JSX returned from that initial function return is the only JSX that will ever be returned from the function.
>
> In Solid, if we want to conditionally display JSX in a component, we need that condition to reside within the returned JSX. While this takes some adjustment when coming from React, we have found that the fine-grained control afforded by Solid's reactive system is worth the trade-off.

### Reactivity and proxy objects

> In Solid, props and stores are [proxy objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) that rely on property access for tracking and reactive updates. Watch out for destructuring or early property access, which can cause these properties to lose reactivity or trigger at the wrong time.

### `onChange` vs. `onInput`

> In React, `onChange` fires whenever an input field is modified, but this isn't how `onChange` [works natively](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onchange). In Solid, use `onInput` to subscribe to each value change.

### No VDOM or VDOM APIs

> Finally, there is no VDOM so imperative VDOM APIs like `React.Children` and `React.cloneElement` have no equivalent in Solid. Instead of creating or modifying DOM elements directly, express your intentions declaratively.

## Solid Primitives

- Signals - The basic way to manage state in the application
  - I go much deeper into Signals in [Intro to Reactivity with SolidJS](#intro-to-reactivity-w-solidjs)
  - Similar to `useState` in React, but as a reactive value
  - Derived state - you can track a computed state from a signal, which is also reactive
  - You can pass the signal as a prop like this: `<BookList books={books()} />`. It's not a typo to use the function as it's passing an accessor, which is important for reactivity.
- Effects - ability to react to signal changes

> A driving philosophy of Solid is that, by treating everything as a signal or an effect, we can better reason about our application.

## Looping

Solid has a component called `<For />` with an `each` prop. You can pass in a signal that will make this reactive.

```jsx
<For each={books()}>
  {(book) => {
    return (
      <li>
        {book.title} {book.author}
      </li>
    );
  }}
</For>
```

Note that since each element doesn't re-render, there is no need for a `key` prop, like they do in React.

## Inputs

In the following example, we are adding a book to a bookshelf. The `props.setBooks` is a signal from the parent to set the bookshelf's books.

```jsx
import { createSignal } from "solid-js";

const emptyBook = { title: "", author: "" };

export function AddBook(props) {
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
    setNewBook(emptyBook);
  };

  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(e) => {
            setNewBook({ ...newBook(), title: e.currentTarget.value });
          }}
        />
      </div>
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(e) => {
            setNewBook({ ...newBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button type="submit" onClick={addBook}>
        Add book
      </button>
    </form>
  );
}
```

As you can see, `onInput` is the event handler that takes in the event. In this case, we are setting the new book for each input (the title and author).

The `onClick` handler for the button uses the `addBook` function where it can prevent the form from submitting, set the books using a new array, then resetting the new book. It should be noted that `setBooks` is using a callback function where you access the current state. Also, it should be noted not to mutate state by creating that new array (much like in Redux practice).

Here's another example of that _callback_.

```js
setCount((currentCount) => {
  return currentCount + 1;
});
```

## Control Flow

SolidJS gives us a component called `Show`. This has two props: `when` for conditions and `fallback` when the condition fails.

The reason you only get this component is because the component only renders once, not like React where there is logic for re-renders.

```jsx
import { createSignal, Show } from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";

const initialBooks = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

function Bookshelf(props) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);
  const toggleForm = () => setShowForm(!showForm());

  return (
    <div>
      <h1>{props.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show
        when={showForm()}
        fallback={<button onClick={toggleForm}>Add a book</button>}
      >
        <AddBook setBooks={setBooks} />
        <button onClick={toggleForm}>Finished adding books</button>
      </Show>
    </div>
  );
}

function App() {
  return <Bookshelf name="Solid" />;
}

export default App;
```

## Fetching Data

The primitive for any external data source is `createResource`. The function returns a deconstructed array with the data. It takes two arguments: the signal and the data fetching function.

```js
const [data] = createResource(signal, dataFetchingFunction);
```

If we break down a data fetching function, it should look like the following.

```js
export async function searchBooks(query) {
  if (query.trim() === "") return [];

  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURI(query)}`
  );

  const results = await response.json();

  return results.docs.slice(0, 10).map(({ title, author_name }) => ({
    title,
    author: author_name?.join(", "),
  }));
}
```

Putting it all together, `query` is the signal. `searchBooks` is the data fetching function. Once the data is returned, we can loop over it, and for each item, we can set the books if selected.

```jsx
import { createSignal, JSX, createResource, For, Show } from "solid-js";
import { searchBooks } from "./searchBooks";

export function AddBook(props) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");
  const [data] = createResource(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Search books</label>
          <input
            id="title"
            value={input()}
            onInput={(e) => {
              setInput(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>
      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}{" "}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
```

### Intro to Reactivity w/ SolidJS

The following is a code example introducing how Reactivity or Reactive Programming works.

```js
import { createSignal, createEffect } from "solid-js";

const [count, setCount] = createSignal(2);
const [multipler, setMultiplier] = createSignal(2);

const product = () => count() * multipler();

// Change the count every second
setInterval(() => {
  setCount(count() + 1);
}, 1000);

// Change the multiplier every 2.5 seconds
setInterval(() => {
  setCount(multipler() + 1);
}, 2500);

// Effect automatically detects when a signal has changed
// So you don't have to add a dependency array.
// This is defined as "reactivity"
createEffect(() => {
  console.log(`${count()} * ${multiplier()} = ${product()}`);
});
```

- `createSignal` works by creating a data structure that can read and write. To each of these functions, subscribers are added and updated
- `CreateEffect` works by executing on a context queue (JS array). It takes its queue, executes it, then pops it (at least in pseudocode)

SolidJS uses "granular updates" so only the variables that change only update the DOM, and not entire components.

```jsx
import { createSignal } from "solid-js";
import { render } from "solid-js/web";

function App() {
  const [count, setCount] = createSignal(2);
  const [multipler, setMultipler] = createSignal(2);

  const product = () => count() * multipler();
  return (
    <div>
      <h1>
        {count()} * {multipler()} = {product()}
      </h1>
      <button onClick={() => setCount(count() + 1)}>Counter</button>
      <button onClick={() => setMultipler(count() + 1)}>Multiplier</button>
    </div>
  );
}
```

Of course, you can move all of the code into its own component, and call components from other components.

```jsx
import { createSignal } from "solid-js";
import { render } from "solid-js/web";

const [count, setCount] = createSignal(2);

function Multipler(props) {
  return (
    <div>
      <h1>
        {count()} * {props.by} = {count() * props.by}
      </h1>
      <button onClick={() => setCount(count() + 1)}>Counter</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Multipler by={2} />
      <Multipler by={3} />
      <Multipler by={11} />
    </div>
  );
}
```

In this example, we extracted `Multipler` into its own component, added props, like React, and called it multiple times in `App`. As you will also notice, signals do not have to be in the function scope! This is counter to what you do in React. Of course, if you don't want to share the signal across other components, you can keep it in the functional lexical scope.
