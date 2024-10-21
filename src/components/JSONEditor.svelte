<script lang="ts">
  import { json } from "@codemirror/lang-json";
  import { createHighlighter } from "shiki";
  import CodeEditor from "./CodeEditor.svelte";

  let value = $state("");
  let graphqlQueryOrMutation = $state("");
  let spaces = $state(2);
  let error: any | null = $state(null);
  const convert = () => {
    // Reset error first
    if (error !== null) {
      error = null;
    }
    try {
      const obj = JSON.parse(value);
      value = JSON.stringify(obj, null, spaces);
    } catch (e: any) {
      error = e;
    }
  };

  const validGraphQLJson = (json: string) => {
    try {
      const obj = JSON.parse(json);
      if (obj?.query) {
        return true;
      }
    } catch (e: any) {
      return false;
    }
    return false;
  };

  async function getHighlighter() {
    try {
      const highlighter = await createHighlighter({
        themes: ["github-dark"],
        langs: ["graphql"],
      });
      console.log("graphqlQueryOrMutation", graphqlQueryOrMutation);
      return highlighter.codeToHtml(graphqlQueryOrMutation, {
        lang: "graphql",
        theme: "github-dark",
      });
    } catch (e: any) {
      return e;
    }
  }

  let promise = $state(getHighlighter());

  const parseGraphql = () => {
    try {
      const obj = JSON.parse(value);
      if (obj?.query) {
        graphqlQueryOrMutation = obj?.query;
        promise = getHighlighter();
      } else {
        error = "Not a valid GraphQL query or mutation";
      }
    } catch (e: any) {
      error = e;
    }
  };
</script>

<CodeEditor bind:value lang={json()} />

{#if error}
  <pre class="text-xs text-red-500 mt-4">{error}</pre>
{/if}

<div class="flex justify-start gap-8">
  <button
    class="border-black dark:border-white border-solid border-2 bg-none cursor-pointer mt-8 flex justify-center p-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
    onclick={convert}>Convert</button
  >
  {#if validGraphQLJson(value)}
    <button
      class="border-black dark:border-white border-solid border-2 bg-none cursor-pointer mt-8 flex justify-center p-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
      onclick={parseGraphql}>Format GraphQL</button
    >
  {/if}
</div>

{#if graphqlQueryOrMutation}
  {#await promise}
    <p>...waiting</p>
  {:then highlightedText}
    {@html highlightedText}
  {:catch error}
    <p class="text-xs text-red-500 mt-4">{error.message}</p>
  {/await}
{/if}

<!-- Number of spaces -->
<div class="mt-8 mb-2 flex flex-col">
  <label for="spaces" class="text-sm text-gray-500">Spaces</label>
  <input id="spaces" class="px-2" type="number" bind:value={spaces} />
</div>

<!-- <pre class="text-xs text-gray-500 mt-4">{value}</pre> -->
