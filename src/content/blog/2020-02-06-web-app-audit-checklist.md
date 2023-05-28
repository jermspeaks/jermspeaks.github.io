---
title: Web App Audit Checklist
published: false
draft: false
categories: learning
tags: ["audit", "checklist"]
date: 2020-02-06
description: "This checklist is a starting point for web app audits. It's a living document, and will be updated as we learn more."
pubDate: "2020-02-06"
heroImage: ""
postType: "learning"
---

This checklist is a starting point for web app audits. It's a living document, and will be updated as we learn more.

## App Level

### Accessibility (A11y)

- [ ] Do all user interactions pass WCAG 2.0 and WCAG 2.1 accessibility requirements?
- [ ] A11y Review - From the [a11y Project](https://a11yproject.com/checklist.html)
  - [ ] No-JS alternatives
  - [ ] High Color Contrast Ratio (UX)
  - [ ] Color Blindness
  - [ ] Screen Reader Tests
  - [ ] Keyboard only testing

### Audit Performance and Scalability

- [ ] Does the app measure these critical core web vitals in production?
- [ ] Does the app pass critical core web vitals?
  - Includes Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).
  - Thresholds can be found in a different wiki page, to be written
- [ ] Do all API requests pass the expected latency threshold?
  - API request latency can be found in a different wiki page, to be written
- [ ] Are all data partitions working as intended? Do we need to review these partitions?
- [ ] Are all data clustering working as intended?
- [ ] Are there performance issues with shared DBs?

### i18n Support

- [ ] Do we need to add new terms in our i18n dictionary?

## Testing Level

- [ ] Do we have adequate testing coverage?
  - Code coverage should not be the only metric, so we should double check our BDD tests and see if we have gaps

## Package Level

- [ ] Audit package dependencies: `npm audit`
- [ ] nginx Audit - Are we on LTS?
- [ ] Node Audit - Are we on LTS? (same with npm)

### How to upgrade npm packages

Run `yarn outdated`. You will get a table of outdated packages. It will look like the following:

```bash
Package           Current Wanted Latest Package Type    URL
babel-jest        24.9.0  24.9.0 25.1.0 devDependencies https://github.com/facebook/jest#readme
normalizr         3.4.1   3.4.1  3.5.0  dependencies    https://github.com/paularmstrong/normalizr
react-dates       21.5.0  21.5.1 21.5.1 dependencies    https://github.com/airbnb/react-dates
```

npm uses [semantic versioning](https://semver.org/), with a few exceptions.

The first number is the MAJOR version. The next is the MINOR version. Last digit is the PATCH version.

#### Patch Update

In our example table above, _react-dates_ has a patch version update.
`21.5.0` -> `21.5.1`
The last digit changed from 0 to 1. That means the version is backwards compatible.
Usually this means the package has bug fixes.

You can safely update the `package.json` with this package without doing any checks.

#### Minor Update

In our example table above, _normalizr_ has a minor version update.
`3.4.1` -> `3.5.0`
The second digit changed from 4 to 5. That means the version should be backwards compatible.
Usually this means the package has features added.

You can sometimes safely update the `package.json` with this package.
Use your intuition if you need to check the pacakage in the app.
For example, if the package type is a dev dependency, most likely you don't have to make changes.
The example package _normalizr_ would fall under this case, and you can safely upgrade.

If there's a new API or function worth exploring, make some changes and see how they work, if they apply to our application.

#### Major Update

In our example table above, _babel-jest_ has a major version update.
`24.9.0` -> `25.1.0`
The first digit changed from 24 to 25. That means the version is not backwards compatible.
Usually this means the package API has changed.
In some cases, it may be because they have dropped support for an old version of Node. YMMV

You can never safely update the `package.json` with this package.
Do the following:

- Check the CHANGELOG.md or releases Github page. Figure out what the change is
- If there are API changes, read up on what the changes are. If they are fundamental and big, do not add. Make a task ticket to upgrade.
  - Sometimes the library might be popular. They may have a blog post on this. (e.g. Storybook, Apollo, React, and Styled-Components)
- If it's for dropped support for an older version of Node, go ahead and upgrade
- For all other changes, upgrade locally, then see if anything in the App breaks. Also check Storybook and tests to see if anything breaks.

Be wary of major changes. When in doubt, as a teammate.
