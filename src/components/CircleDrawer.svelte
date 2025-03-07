<!--
https://eugenkiss.github.io/7guis/tasks#circle

Click on the canvas to draw a circle. Click on a circle
to select it. Right-click on the canvas to adjust the
radius of the selected circle.
-->

<script>
  import { run, preventDefault, stopPropagation } from 'svelte/legacy';

  const BASE_RADIUS = 30;

  let step = $state(0);
  let snapshots = $state([[]]);
  let radius = $state(BASE_RADIUS);
  let resizing = $state(false);
  let present;
  run(() => {
    present = snapshots[step];
  });
  run(() => {
    if (resizing) {
      let resizingIndex = present.findIndex(
        (circle) => circle.x === resizing.x && circle.y === resizing.y
      );
      let newPresent = present.slice();
      newPresent[resizingIndex] = { ...present[resizingIndex], r: radius };
      present = newPresent;
    }
  });

  function handleRightClick(e) {
    let circle = e.target;
    resizing = {
      x: circle.cx.baseVal.value,
      y: circle.cy.baseVal.value,
      r: circle.r.baseVal.value,
    };
    radius = resizing.r;
  }

  function addCircle(e) {
    let x = e.layerX;
    let y = e.layerY;
    let newSnapshot = present.slice();
    newSnapshot.push({ x, y, r: BASE_RADIUS });
    addSnapshot(newSnapshot);
  }

  function addSnapshot(newSnapshot) {
    let newSnapshots = snapshots.slice(0, step + 1);
    newSnapshots.push(newSnapshot);
    snapshots = newSnapshots;
    step++;
  }

  function undo() {
    step = Math.max(step - 1, 0);
  }

  function redo() {
    step = Math.min(step + 1, snapshots.length - 1);
  }

  function endResize() {
    if (radius !== resizing.r) {
      radius = BASE_RADIUS;
      addSnapshot(present.slice());
    }
    resizing = false;
  }
</script>

<div class="wrapper">
  <div class="buttons">
    <button disabled={!step} onclick={undo}>Undo</button>
    <button disabled={step === snapshots.length - 1} onclick={redo}
      >Redo</button
    >
  </div>
  <div class="canvas">
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <svg onclick={addCircle}>
      {#each present as circle (circle.x + "," + circle.y)}
        <circle
          cx={circle.x}
          cy={circle.y}
          r={circle.r}
          fill="white"
          stroke="black"
          onclick={stopPropagation(preventDefault(() => {}))}
          oncontextmenu={stopPropagation(preventDefault(handleRightClick))}
        />
      {/each}
    </svg>
  </div>

  {#if resizing}
    <div 
      class="overlay"
      onclick={endResize}
      onkeydown={endResize}
      tabindex="0"
      role="button"
></div>
    <div class="resizer">
      <p>Adjust radius of circle at ({resizing.x}, {resizing.y})</p>
      <p>{radius}</p>
      <input type="range" min={0} max={100} bind:value={radius} />
    </div>
  {/if}
</div>

<style>
  .wrapper {
    max-width: 400px;
    text-align: left;
    margin: auto;
    position: relative;
  }

  .canvas {
    width: 100%;
    height: 400px;
    position: relative;
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: transparent;
  }

  .resizer {
    background: rgba(200, 200, 200, 0.5);
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    transform: translateY(-50%);
    text-align: center;
  }

  .buttons {
    margin: auto;
    width: max-content;
  }

  svg {
    background: white;
    width: 100%;
    height: 100%;
  }

  circle:hover {
    fill: #eee;
  }
</style>
