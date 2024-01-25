---
title: "Build a Realtime Chat App with Remix and Supabase"
published: false
draft: false
tags: ["learning", "supabase", "remix", "react"]
date: 2023-02-08
description: "From an egghead course, notes about building a realtime chat app with remix and supabase"
pubDate: "2023-02-08"
heroImage: ""

---

The following are notes from an Egghead [course](https://egghead.io/courses/build-a-realtime-chat-app-with-remix-and-supabase-d36e2618?_cio_id=89fb05009d5c9e5c&utm_campaign=Round%202%20-%20Build%20a%20realtime%20chat%20app%20with%20Remix%20and%20Supabase&utm_content=Build%20a%20realtime%20chat%20app%20with%20Remix%20and%20Supabase&utm_medium=email_action&utm_source=customer.io) I took.

## Create a Supabase Project with a Table and Example Data

- Created a new database on supabase called [Chatter](https://app.supabase.com/project/akhdfxiwrelzhhhofvly)
- In the table editor, create a new table `messages`, and add columns for `id`, `created_at`, and `content`.
  - `id` should be a uuid
  - `created_at` should default `now()` and never be null
  - `content` is text and should never be null

## Setting Up a Remix Project

- Create a new remix project
  - Choose "Just the basics"
  - Choose Vercel as the service

```sh
npx create-remix chatter
```

- For the remix project, you can find the main file in `index.tsx`

## Query Supabase Data with Remix Loaders

- `npm i @supabase/supabase-js`
- Add supabase env vars to .env, which can be found in the _Project Settings > API_. [Link](https://app.supabase.com/project/akhdfxiwrelzhhhofvly/settings/api)

```
SUPABASE_URL={url}
SUPABASE_ANON_KEY={anon_key}
```

- Create a `utils/supabase.ts` file. Create `createClient` function
- A "!" can be used at the end of a variable so typescript doesn't give us errors, if we know those will be available at runtime, like env vars
- Supabase has row-level security enabled, meaning you have to write policies in order for the user to do CRUD operations (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, and `ALL`).
  - We added a policy to allow all users to read.
- Create the loader in the index page, using `import { useLoaderData } from "@remix-run/react";`, which will allow us to query supabase using the utils.
  - `supabase.from("messages").select()` reminds me a lot like mongodb's client.

## Generate TypeScript Type Definitions with the Supabase CLI

- Add Type Safety checks using the [Supabase CLI](https://supabase.com/docs/guides/cli)

```sh
brew install supabase/tap/supabase
# Or call upgrade if you already have it
brew upgrade supabase
```

- [Create an account token](https://app.supabase.com/account/tokens)
  - Then login to CLI tool using that access token

```sh
supabase login
```

- Generate types based our project for Typescript

```sh
supabase gen types typescript --project-id akhdfxiwrelzhhhofvly > db_types.ts
```

- We have to re-run this command every time we have DB updates
- Now we use the `db_types.ts` into our `supabase.ts` file by adding a type to the `createClient` function
- You can infer types by using `typeof` in Typescript. This is useful for showcasing what `data`'s type is in the `Index` functional component.
- To make sure the data is always present, or an empty array rather than of type `null`, we use a null coalescing operator on the original data `return { messages: data ?? [] };`

## Implement Authentication for Supabase with OAuth and Github

- Enable Github OAuth using Supabase
  - In the supabase project, go to Authentication > Providers
  - Choose Github
- In Github, go to Settings, Developer Settings > OAuth Apps
  - Create "Chatter". Copy the Authorization callback URL
- In supabase, enter the Client ID, Client Secret, and the Redirect URL.
  - The generated secret in Github goes away after a few minutes, so be quick
- Create the login component in `components/login` and then add two buttons for logging in and out.
  - The handlers should be `supabase.auth.signInWithOAuth` and `supabase.auth.signOut`
- Add the login component back into the index component.
  - You'll notice a `ReferenceError` in that `process` is not defined because that should only run on the server.
  - Change the `supabase.ts` file to `supabase.server.ts` file. This shows that the supabase file should only be rendered on the server.
  - The `root.tsx` component has an `Outlet` depending on the route based off the `routes` files (file-based routing)
- In the root component, we add the context in `Outlet` for the supabase instance.
  - This can now be used in the `login` file using `useOutletContext`.
  - Types can be added by exporting it from root.
  - `type TypedSupabaseClient = SupabaseClient<Database>;`
- supabase uses Local Storage to store the OAuth tokens.
  - You can also check [the users](https://app.supabase.com/project/akhdfxiwrelzhhhofvly/auth/users) in the supabase project

## Restrict Access to the Messages Table in a Database with Row Level Security (RLS) Policies

- Add a column to our database called `user_id` and add a foreign key to it, with `users` and the key being `id`.
- Disable _Allow Nullable_ by adding the logged in user id to the first two messages. This can be found in the users table.
- Re-run the db_types script

```sh
supabase gen types typescript --project-id akhdfxiwrelzhhhofvly > db_types.ts
```

- Update the policy by changing the target roles to be authenticated.
- Now only signed in users will be able to view the data.

## Make Cookies the User Session Single Source of Truth with Supabase Auth Helpers

- Auth tokens by default are stored in the client's session, not on the server.
  - Remix is loading from the server's session, which is null
- `npm i @supabase/auth-helpers-remix`
- We need to change the mechanism for the token to use cookies
  - Auth helpers allows us to use `createServerClient` and `createBrowserClient` to create the supabase instance correctly, based if it's on the client or server.
    - You need `request` and `response` added in the `supabase.server.ts`
    - We need to do the same thing in the loader in `root` and `index`

## Keep Data in Sync with Mutations Using Active Remix Loader Functions

- There's no update for pressing the button because the client doesn't update the information after the initial load.
- Remix has a revalidation hook.
- Supabase has a auth state change hook
  - Combining these together, on server and client token change (either new token, or no longer has the token), then refetch data from loaders.

## Securely Mutate Supabase Data with Remix Actions

- To create a new message, we add `Form` from remix, which has a method `post`.
  - This is reminiscent of how forms worked alongside the HTML spec before
- An action is created to insert the message, include the response headers from before (passing along the cookie)
- The message won't send yet until the supabase policy is set, so we add a policy for `INSERT` and make sure the user is authenticated and their user_id matches the one in supabase.

## Subscribe to Database Changes with Supabase Realtime

- Supabase sends out updates via websockets when there is a change to the database
  - It's called [Replication](https://app.supabase.com/project/akhdfxiwrelzhhhofvly/database/replication)
- We create a new component, `RealtimeMessages` that can subscribe to those `INSERT` changes on all tables
  - We set messages in a `useState` hook, and any changes we will change them with a `useEffect`
  - A second `useEffect` subscribes to these supabase changes

```ts
const channel = supabase
  .channel("*")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "messages" },
    (payload) => {
      const newMessage = payload.new as Message;

      if (!messages.find((message) => message.id === newMessage.id)) {
        setMessages([...messages, newMessage]);
      }
    }
  )
  .subscribe();
```

## Deploy a Remix Application to Vercel from a GitHub Repository

- Create a Github repo
  - There's a [Github CLI tool](https://cli.github.com/), `gh`, that can handle this
  - `gh repo create chatter --public`
- Init the repo, commit, and push
- Go to Vercel, add the project and env variables
- Go to Github and add the redirect URL
- Go to Supabase and add authentication url redirect
- [Final URL](https://chatter-omega.vercel.app/?index)
