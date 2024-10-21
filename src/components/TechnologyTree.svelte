<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import * as d3 from 'd3';
  let { technologies } = $props();

  const svgNodes = writable([]);
  const svgLinks = writable([]);
  const xOffset = 300; // Adjust for vertical layout
  const yOffset = 20; // Increase y-offset for visibility
  const nodeDistance = 100; // Adjust vertical distance between nodes

  function updateDisplayNodes() {
    const hierarchyData = d3.hierarchy(technologies);
    const treeLayout = d3.tree().size([600, 400]).nodeSize([nodeDistance, 40]); // Adjust for vertical layout
    treeLayout(hierarchyData);

    const nodes = hierarchyData.descendants().map(node => ({
      ...node, x: node.x + xOffset, y: node.y + yOffset
    }));

    const links = hierarchyData.links().map(link => ({
      source: { ...link.source, x: link.source.x + xOffset, y: link.source.y + yOffset },
      target: { ...link.target, x: link.target.x + xOffset, y: link.target.y + yOffset }
    }));

    svgNodes.set(nodes);
    svgLinks.set(links);
  }

  onMount(() => {
    updateDisplayNodes();
  });
</script>

<svg width="800" height="300" style="border: 1px solid black;">
  {#each $svgLinks as link}
    <line x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y} stroke="black" stroke-linejoin="round" />
  {/each}

  {#each $svgNodes as node}
    <circle cx={node.x} cy={node.y} r="5" fill="blue" />
    <text x={node.x + 8} y={node.y + 3} dy=".35em" class="font-thin text-sm">{node.data.name}</text>
  {/each}
</svg>
