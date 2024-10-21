<script>
  import { run } from 'svelte/legacy';

  import * as Plot from "@observablehq/plot";
  import * as d3 from "d3";

  let div = $state();
  const aapl = [
    {
      Date: new Date("2013-05-13"),
      Open: 64.501427,
      High: 65.414284,
      Low: 64.5,
      Close: 64.96286,
      Volume: 79237200,
    },
    {
      Date: new Date("2013-05-14"),
      Open: 64.835716,
      High: 65.028572,
      Low: 63.164288,
      Close: 63.408573,
      Volume: 111779500,
    },
    {
      Date: new Date("2013-05-15"),
      Open: 62.737144,
      High: 63.0,
      Low: 60.337143,
      Close: 61.264286,
      Volume: 185403400,
    },
    {
      Date: new Date("2013-05-16"),
      Open: 60.462856,
      High: 62.549999,
      Low: 59.842857,
      Close: 62.082859,
      Volume: 150801000,
    },
    {
      Date: new Date("2013-05-17"),
      Open: 62.721428,
      High: 62.869999,
      Low: 61.572857,
      Close: 61.894287,
      Volume: 106976100,
    },
  ];
  // let data = d3.ticks(-2, 2, 200).map(Math.sin);

  // function onMousemove(event) {
  //   const [x, y] = d3.pointer(event);
  //   data = data.slice(-200).concat(Math.atan2(x, y));
  // }

  run(() => {
    // div?.firstChild?.remove(); // remove old chart, if any
    div?.append(
      Plot.plot({
        marks: [Plot.lineY(aapl, { x: "Date", y: "Close" })],
      })
    ); // add the new chart
  });
</script>

<!-- <div on:mousemove={onMousemove} bind:this={div} role="img"></div> -->
<div bind:this={div} role="img"></div>
