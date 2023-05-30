---
title: React Unit Testing Notes
published: false
draft: false
categories: ["learning"]
tags: ["react", "testing"]
date: 2019-08-19
description: ""
pubDate: "2019-08-19"
heroImage: ""
postType: "learning"
---

These notes are a guide I've written throughout coding the initial part of the application. The note starts out with fundamentals and continues with specific testing edge cases.

## Philosophy

> Write tests. Not too many. Mostly integration.
> [Guillermo Rauch](https://twitter.com/rauchg/status/807626710350839808)

> The more your tests resemble the way your software is used, the more confidence they can give you.
> [Kent C. Dodds](https://twitter.com/kentcdodds/status/977018512689455106)

This project focuses mainly on integration tests. Why? We shouldn't mock too much as the tests themselves become unmaintainable.
When you make any changes to the code with tests that have a lot of mocking, the tests also have to be updated.
Mostly manual. And we end up creating more work for the developer than is actually worth.

Code coverage also isn't the best factor to aim for. Yes, we should have tests to cover our code. No, we shouldn't aim for 100% coverage.
Pareto's law can apply here. For most cases, we expect few test to cover most use cases. At some point, there's diminishing returns.

### When to write a test

On more about testing philosophy, read Kent C. Dodd's post of the first quote: "[Write tests. Not too many. Mostly integration.](https://blog.kentcdodds.com/write-tests-not-too-many-mostly-integration-5e8c7fff591c)".

### Effective Snapshot Testing

> Snapshot tests are a very useful tool whenever you want to make sure your UI does not change unexpectedly.
> [Jest documentation on snapshot testing](https://jestjs.io/docs/en/snapshot-testing.html).

To maximize snapshot testing, we have it for most components. The idea is to remove shallow testing (using enzyme)
with rendering components.

[Effective Snapshot Testing](https://kentcdodds.com/blog/effective-snapshot-testing/) is a fantastic read for an intro.

## Running Tests

Out of the box, the testing framework and its tools are installed with dependencies.
For more information, checkout [the installation section of the README](../README.md#Installing).

Unit tests are run before a building the Docker container.
Tests are run with [Jest](https://facebook.github.io/jest/), that has the [Expect](https://facebook.github.io/jest/docs/en/expect.html) expectations library given.
As mentioned in the testing philosophy, we try not to focus on mocking. Sometimes this is inevitable and we have included [Enzyme](https://github.com/airbnb/enzyme) for shallow rendering.

Use `shallow` sparingly. For more, read [this article](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering/).

```bash
yarn test
```

### Additional Commands

If there are any `jest` flags you want to add to your tests, like _watch mode_ or _coverage_, you can add those flags to the command.

#### Watch

```bash
# Run tests in watch mode
yarn test --watch
```

#### Coverage

```bash
# Run a coverage report
yarn test --coverage
# This will build a `coverage` folder that can be viewed for a full coverage report
```

#### Single file or folder

```bash
# Run tests over a single file
yarn test src/path/to/file

# Run tests over a folder
yarn test src/path/to/folder
```

## State Management Testing

Test all actions, sagas, and reducers.

- Action tests are ensuring the action creators create the proper actions
- Reducer tests are ensuring the state has been changed properly
- Saga tests are more for E2E testing, making sure all side-effects are accounted for

## Apollo Testing

Before continuing to this section, make sure you're familiar with the
(docs)[https://www.apollographql.com/docs/react/recipes/testing].

## Known Warnings

### React v16.9

> Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.

> - Move data fetching code or side effects to componentDidUpdate.
> - If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://fb.me/react-derived-state
> - Rename componentWillReceiveProps to UNSAFE*componentWillReceiveProps to suppress this warning in non-strict mode. In React 17.x, only the UNSAFE* name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.
>   Please update the following components: \*

With a move to React v16.8 -> v16.9, `componentWillMount`, `componentWillReceiveProps`, and `componentWillUpdate` lifecycle methods have been renamed.
They will be deemed unsafe to use. Our library has updated already, but some libraries may still use this.

Known libraries with issues:

- react-dates
- react-outside-click-handler (dev dependency to react-dates)

[Reference](https://reactjs.org/blog/2019/08/08/react-v16.9.0.html#renaming-unsafe-lifecycle-methods)

## Common Test Errors

### Redux Error

> Invariant Violation: Could not find "store" in the context of "Connect(Form(Form))".
> Either wrap the root component in a "Provider", or pass a custom React context provider
> to "Provider" and the corresponding React context consumer to Connect(Form(Form))
> in connect options.

_Solution_

1. Add imports

```js
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
```

2. Create the mock store. Wrap renderer with provider.

```js
it("renders redux connected component", () => {
  const mockStore = configureStore();
  const store = mockStore({ form: {} });
  const tree = renderer
    .create(
      <Provider store={store}>
        <Component />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Thunk error

You've included redux in your test, but you might get the following message.

> [redux-saga-thunk] There is no thunk state on reducer

If this is the case, go back to your mock store and include `thunk` has a key.

```js
it("renders a component that needs to thunk", () => {
  const mockStore = configureStore();
  const store = mockStore({ thunk: {} }); // Be sure to include this line with the thunking
  const tree = renderer
    .create(
      <Provider store={store}>
        <TestedComponent />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

### i18n Error

Sometimes, an i18n provider isn't given. The error doesn't appear to be useful.

> TypeError: Cannot read property 'ready' of null

Check if the component or a child component uses the `Translation` component. If so, Translation requires context `Provider` be wrapped around.

_Solution_

1. Add imports

```js
import { I18nextProvider } from "react-i18next";
import i18n from "../../../test-utils/i18n-test";
```

2. Wrap renderer with the provider

```js
const tree = renderer
  .create(
    <I18nextProvider i18n={i18n}>
      <Component />
    </I18nextProvider>
  )
  .toJSON();
```

3. Rerun the test and check the snapshot. If the snapshot looks good, add the `-u` flag to update the snapshot.

### Apollo Error

If the component requires an apollo component, you will want to pass in a mock provider.

> Invariant Violation: Could not find "client" in the context or passed in as a prop.
> Wrap the root component in an "ApolloProvider", or pass an ApolloClient instance in via props.

1. Add imports

```js
import { MockedProvider } from "@apollo/client/testing";
```

2. Wrap renderer with the provider

```js
const tree = renderer
  .create(
    <MockedProvider mocks={[]} addTypename={false}>
      <Component />
    </MockedProvider>
  )
  .toJSON();
```

3. Rerun the test and check the snapshot. If the snapshot looks good, add the `-u` flag to update the snapshot.

In cases where the data is important, you will want to add mocks.

```js
const mocks = [
  {
    request: {
      query: ${query_name},
      variables: ${variables}
    },
    result: {
      data: ${result_data}
    }
  }
];
```

#### Query not wrapped in act(...)

> Warning: An update to Query inside a test was not wrapped in act(...).

> When testing, code that causes React state updates should be wrapped into act(...):

> act(() => {
> /_ fire events that update state _/
> });
> /_ assert on the output _/

> This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act

To fix, import the following:

```js
import renderer, { act } from "react-test-renderer";
import wait from "waait";
```

The write code that looks like this.

```js
it("renders something", async () => {
  const tree = renderer.create(<SomeComponentWithApolloComponent />);
  await act(async () => {
    await wait(0);
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
```

There may be a case you want to test the loading state.
If so, use an async function, but do not add your act function.

```js
it("renders something", async () => {
  const tree = renderer.create(<SomeComponentWithApolloComponent />);

  expect(tree.toJSON()).toMatchSnapshot();
});
```

To research: `tree.update();`.

#### Resources

- [Fix the "not wrapped in act(...)" warning](https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning)

### React Dates issue

> TypeError: Cannot read property 'createLTR' of undefined

_Solution_

Solve by adding the following to the top of the test file

```js
import "react-dates/initialize";
```

> As of v13.0.0 of react-dates, this project relies on react-with-styles. If you want to continue using CSS stylesheets and classes, there is a little bit of extra set-up required to get things going. **As such, you need to import react-dates/initialize to set up class names on our components.** This import should go at the top of your application as you won't be able to import any react-dates components without it.

#### Final Form

> Warning: Field must be used inside of a ReactFinalForm component

1. Add imports

```js
import { Form } from "react-final-form";
```

2. Wrap renderer with the Form component

```js
const handleSubmit = jest.fn();
const tree = renderer
  .create(
    <Form onSubmit={handleSubmit}>
      {(formProps) => <FormComponent {...formProps} />}
    </Form>
  )
  .toJSON();
expect(tree).toMatchSnapshot();
```

##### Array Mutators

> Array mutators not found. You need to provide the mutators from final-form-arrays to your form

In this case, add `arrayMutators` from `final-form-arrays` to the `react-final-form` `Form` component.

1. Add imports

```js
import arrayMutators from "final-form-arrays";
```

2. Add to Form component

```js
<Form
  onSubmit={onSubmit}
  mutators={{
    ...arrayMutators,
  }}
>
  {(formProps) => <FormComponent {...formProps} />}
</Form>
```

#### Prompt Error

> Invariant failed: You should not use "Prompt" outside a "Router"

See [Router Error](#router-error) for the solution

#### NavLink Error

> Invariant failed: You should not use "NavLink" outside a "Router"

See [Router Error](#router-error) for the solution

### Router Error

> Invariant Violation: You should not use "Route" or withRouter() outside a "Router"

_Solution_

1. Add imports

```js
import { StaticRouter } from "react-router";
```

2. Wrap renderer with the provider

```js
const tree = renderer
  .create(
    <StaticRouter context={{}}>
      <Component />
    </StaticRouter>
  )
  .toJSON();
expect(tree).toMatchSnapshot();
```

### Hooks Errors

#### useEffect

Sometimes you rely on a `useEffect` callback to initialize an effect.

```js
const TestComponent = ({ specialProp }) => {
  const doSomething = () => console.log("something");
  useEffect(() => {
    if (specialProp) {
      doSomething(); // something
    }
  }, []);

  return null;
};
```

When you use the test renderer, this won't work.
For an exhaustive way of triggering events, check out
[this post](https://github.com/threepointone/react-act-examples).

The preliminary solution is to run `act` from the `react-test-renderer` library.
Currently, there is no documentation to this, so it's best to
[read the code](https://github.com/facebook/react/blob/master/packages/react-test-renderer/src/ReactTestRenderer.js#L556).

Here's how we use act.

```js
it("creates component with useEffect", () => {
  // Create your tree
  const tree = renderer.create(
    <TestComponentWithEffect>My Effect</TestComponentWithEffect>
  );
  // Tell the renderer to act, pushing the effect through
  renderer.act(() => {});
  expect(tree.toJSON()).toMatchSnapshot();
});
// Drawbacks:
// - Can't handle flushing (yet)
```

This will be revisited as the API matures.

### Dealing with Time

If you need to mock time, you could use this implementation.

```js
const constantDate = new Date("2019-05-16T04:00:00");

/* eslint no-global-assign:off */
Date = class extends Date {
  constructor() {
    super();
    return constantDate;
  }
};
```
