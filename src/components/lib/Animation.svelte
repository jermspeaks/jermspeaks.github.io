<script>
  import { slide } from "svelte/transition";
  let items = ["Item 1", "Item 2", "Item 3"];

  function addItem() {
    items = [...items, `Item ${items.length + 1}`];
  }

  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
  }
</script>

<button
  class="my-2 px-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500"
  on:click={addItem}>Add Item</button
>

<ul class="list-none">
  {#each items as item, index (item)}
    <li transition:slide={{ duration: 200 }}>
      {item}
      <button
        class="my-2 px-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500"
        on:click={() => removeItem(index)}>Remove</button
      >
    </li>
  {/each}
</ul>
