<script lang="ts">
  type TechNode = {
    name: string;
  };
  export let tech: TechNode;
</script>

<div
  on:click={() => alert(`You clicked on ${tech.name}`)}
  on:keydown={() => alert(`You clicked on ${tech.name}`)}
  class="bg-blue-200 p-3 m-2 cursor-pointer"
  role="button"
  tabindex="0"
>
  {tech.name}
</div>
