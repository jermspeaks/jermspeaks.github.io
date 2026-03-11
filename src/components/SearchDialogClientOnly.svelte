<script lang="ts">
  import { onMount } from 'svelte';

  let { searchId = 'search' }: { searchId?: string } = $props();
  let DialogComponent = $state<typeof import('./SearchDialogSvelte.svelte').default | null>(null);

  onMount(async () => {
    const mod = await import('./SearchDialogSvelte.svelte');
    DialogComponent = mod.default;
  });
</script>

{#if DialogComponent}
  <svelte:component this={DialogComponent} {searchId} />
{/if}
