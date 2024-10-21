<script>
  import { fade } from 'svelte/transition';
  let isVisible = $state(true);
</script>

<button class="my-2 px-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500" onclick={() => (isVisible = !isVisible)}>
  Toggle
</button>

{#if isVisible}
  <div transition:fade={{ duration: 300 }}>
    Fade me in and out
  </div>
{/if}