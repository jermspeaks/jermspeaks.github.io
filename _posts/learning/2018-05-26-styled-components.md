---
layout: next-post
title: Styled Components
published: false
categories: learning
tags: react, styled components
permalink: /:categories/:title.html
---

# Styled Components

At my new job, because we're building the project from the ground up. The team decided to move forward with a css-in-js approach, which perked my ears. First I was skeptic. How could this remove my `css` files? What about psuedoelements and complex selectors.

Having worked with it for three months now, I'm a convert. Those initial skepticisms wore away as I started to write React with styled components in mind. Before I jump into a length explanation, let's do a starter demo.

## Intoduction through exercise

```js
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
`;
const MainContent = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;

const App = props => (
  <Wrapper {...props}>
    <MainContent>
      Lorem ipsum dolor sit amet, 
      vim at quando possim oporteat, 
      eu omnium apeirian argumentum per.
    </MainContent>
  </Wrapper>
);
```

In this example...