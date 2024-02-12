---
title: "Notes: Deno"
published: false
draft: false
tags: ["learning", "programming", "node", "deno"]
date: 2022-03-01
description: ""
pubDate: "2022-03-01"
heroImage: ""

---

I am following version 1.13.2: [Intro docs](https://deno.land/manual@v1.13.2/introduction) for Deno

## Hello World

[Tutorial](https://deno.land/manual@v1.13.2/examples/hello_world)

Running the following command in our tutorial folder uses deno as a runtime.

```sh
deno run 01_hello_world/index.ts
```

## Import and Exports

[Tutorial](https://deno.land/manual@v1.13.2/examples/import_export)

Local imports use relative paths. Add the extensions.

Remote imports use urls.

Example URL: `https://deno.land/x/ramda@v0.27.2`.

You can find modules on [their website](https://deno.land/x).

Prepend export for constants, classes, functions and variables to expose them.

## Managing dependencies

[Tutorial](https://deno.land/manual@v1.13.2/examples/manage_dependencies)

There are two ways to handle dependencies.

1. Using URL link
2. Using `deps.ts`

To add a lockfile (useful for locking dependencies), use the `--lock` flag.

```sh
# Create/update the lock file "lock.json".
deno cache --lock=lock.json --lock-write deps.ts
```

[More on integrity checking](https://deno.land/manual@v1.13.2/linking_to_external_code/integrity_checking).

## Fetch data

[Tutorial](https://deno.land/manual@v1.13.2/examples/fetch_data)

## Left Off

- https://deno.land/manual@v1.13.2/examples/manage_dependencies
