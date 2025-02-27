<script>
  let count = $state(0);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

<main>
  <h3>The count is {count}</h3>
  <button
    class="my-2 border-slate-800 dark:border-slate-200 border-2 rounded-sm hover:bg-purple-500"
    onclick={decrement}>-</button
  >
  <button
    class="my-2 border-slate-800 dark:border-slate-200 border-2 rounded-sm hover:bg-purple-500"
    onclick={increment}>+</button
  >

  {#if count > 10}
    <p>You have reached a count greater than 10!</p>
  {/if}
</main>

<style>
</style>
