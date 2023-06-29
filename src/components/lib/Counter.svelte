<script>
  let count = 0;
</script>

<input
  class="px-2 dark:text-white dark:bg-slate-800"
  type="number"
  bind:value={count}
/>
<button
  class="px-2 border-solid border-2 dark:border-gray-400"
  on:click={() => (count += 1)}>count</button
>
