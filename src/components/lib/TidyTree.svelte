<script>
  import * as Plot from "@observablehq/plot";
  import * as d3 from "d3";
  import flare from "../data/treePlot.json";

  let div;

  $: {
    div?.append(
      Plot.plot({
        axis: null,
        margin: 10,
        marginLeft: 100,
        marginRight: 160,
        width: 800,
        height: 300,
        marks: [
          Plot.tree(d3.hierarchy(flare).leaves(), {
            path: (node) =>
              node
                .ancestors()
                .reverse()
                .map(({ data: { name } }) => name)
                .join("|"),
            delimiter: "|",
          }),
        ],
      })
    );
    
  }
</script>

<div bind:this={div} role="img"></div>
