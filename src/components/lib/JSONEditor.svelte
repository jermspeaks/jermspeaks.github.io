<script lang="ts">
  import { json } from "@codemirror/lang-json";
  import CodeEditor from "./CodeEditor.svelte";

  let value = "";
  let error: any | null = null;
  const convert = () => {
    // Reset error first
    if (error !== null) {
      error = null;
    }
    try {
      const obj = JSON.parse(value);
      value = JSON.stringify(obj, null, 2);
    } catch (e: any) {
      error = e;
    }
  };
</script>

<CodeEditor bind:value lang={json()} />

{#if error}
  <pre class="text-xs text-red-500 mt-4">{error}</pre>
{/if}

<button
  class="border-black dark:border-white border-solid border-2 bg-none cursor-pointer mt-8 flex justify-center p-1 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-200"
  on:click={convert}>Convert</button
>

<!-- <pre class="text-xs text-gray-500 mt-4">{value}</pre> -->
