<script lang="ts">
  import { json } from "@codemirror/lang-json";
  import CodeEditor from "./CodeEditor.svelte";

  let value = "";
  const convert = () => {
    try {
      const obj = JSON.parse(value);
      value = JSON.stringify(obj, null, 2);
    } catch (e) {
      console.error(e);
    }
  };
</script>

<CodeEditor bind:value lang={json()} />

<button
  class="border-black border-solid border-2 bg-none cursor-pointer mt-8 flex justify-center p-1 text-black hover:text-gray-600"
  on:click={convert}>Convert</button
>
