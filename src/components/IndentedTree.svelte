<script>
  import * as Plot from "@observablehq/plot";
  import flare from "./data/tree.json";

  let div;
  // let data = d3.ticks(-2, 2, 200).ma./data/tree.json/ function onMousemove(event) {
  //   const [x, y] = d3.pointer(event);
  //   data = data.slice(-200).concat(Math.atan2(x, y));
  // }

  function indent() {
    return (root) => {
      root.eachBefore((node, i) => {
        node.y = node.depth;
        node.x = i;
      });
    };
  }

  $: {
    // div?.firstChild?.remove(); // remove old chart, if any
    // div?.append(Plot.lineY(data).plot({ grid: true })); // add the new chart
    // div?.append(
    //   Plot.plot({
    //     axis: null,
    //     margin: 10,
    //     marginLeft: 100,
    //     marginRight: 160,
    //     width: 800,
    //     height: 300,
    //     marks: [
    //       Plot.tree(d3.hierarchy(flare).leaves(), {
    //         path: (node) =>
    //           node
    //             .ancestors()
    //             .reverse()
    //             .map(({ data: { name } }) => name)
    //             .join("|"),
    //         delimiter: "|",
    //       }),
    //     ],
    //   })
    // );
    div?.append(
      Plot.plot({
        axis: null,
        inset: 10,
        insetRight: 120,
        round: true,
        width: 200,
        height: 600,
        marks: Plot.tree(flare, {
          path: "name",
          delimiter: "/",
          treeLayout: indent,
          strokeWidth: 1,
          curve: "step-before",
          textStroke: "none",
        }),
      })
    );
  }
</script>

<div bind:this={div} role="img"></div>
