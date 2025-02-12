<script>
  import Cell from "./Cell.svelte";
  import { data } from "./store.js";
  import { sampleData } from "./sampleData.js";
  import { Parser } from "./parse.js";
  data.set(sampleData);

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let { shape = [100, 100] } = $props();
  const rows = range(shape[1]);
  const columns = letterRange(shape[0]);
  const p = new Parser(data, columns, rows);
  let focused = $state();
  let tBody = $state();

  function range(n) {
    return [...Array(n).keys()];
  }

  function letterRange(n) {
    return range(n).map(getNumberAsLetters);
  }

  function getBase26(n) {
    let result = [];
    while (n > 25) {
      let remainder = n % 26;
      result.push(remainder);
      n = Math.floor(n / 26) - 1;
    }
    result.push(n);
    return result.reverse();
  }

  function getNumberAsLetters(n) {
    let arr = getBase26(n);
    return arr.map((num) => LETTERS[num]).join("");
  }

  function handleFocus(key) {
    if (focused !== key) {
      $data[key] = $data[key] || "";
      focused = key;
      setTimeout(() => {
        let target = tBody.querySelector("#input-" + key);
        if (target) {
          target.focus();
          target.setSelectionRange(0, 9999);
        }
      }, 10);
    }
  }

  function handleBlur(key) {
    if (focused === key) focused = undefined;
  }

  function handleInput(e, key) {
    $data[key] = e.target.value;
  }

  function handleKeydown(e, column, row) {
    // Navigate across the spreadsheet with arrow keys (and alt/option key)
    let selector;
    if (e.key === "ArrowUp") {
      let newRow = findAdjacent(rows, row, "before");
      selector = newRow !== null ? column + newRow : null;
    }
    if (e.key === "ArrowDown" || e.key === "Enter") {
      let newRow = findAdjacent(rows, row, "after");
      selector = newRow !== null ? column + newRow : null;
    }
    if (e.key === "ArrowLeft" && e.altKey) {
      let newColumn = findAdjacent(columns, column, "before");
      selector = newColumn !== null ? newColumn + row : null;
    }
    if (e.key === "ArrowRight" && e.altKey) {
      let newColumn = findAdjacent(columns, column, "after");
      selector = newColumn !== null ? newColumn + row : null;
    }

    if (selector) {
      e.preventDefault();
      handleFocus(selector);
    }
  }

  function findAdjacent(arr, value, direction) {
    let index = arr.indexOf(value);
    if (index === -1) return null;
    if (direction === "before")
      return arr[index - 1] === undefined ? null : arr[index - 1];
    if (direction === "after") return arr[index + 1] || null;
    return null;
  }

  function clear() {
    data.set({});
  }
</script>

<div class="wrapper">
  <table>
    <thead>
      <tr>
        <td class="row-key"></td>
        {#each columns as column}
          <td class="column-key">{column}</td>
        {/each}
      </tr>
    </thead>
    <tbody bind:this={tBody}>
      {#each rows as i}
        <tr id={"row-" + i}>
          <td class="row-key">{i}</td>
          {#each columns as j}
            <td id={j + i} onclick={() => handleFocus(j + i)}>
              <Cell
                {j}
                {i}
                {focused}
                {data}
                {p}
                {handleFocus}
                {handleBlur}
                {handleKeydown}
                {handleInput}
              />
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
<button onclick={clear}>Clear</button>

<style>
  .wrapper {
    margin: auto;
    overflow: scroll;
    max-width: 600px;
    max-height: 600px;
    border: solid 1px #ddd;
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    border: solid 1px #ddd;
    background: white;
  }

  td {
    height: 30px;
    border: solid 1px #ddd;
    overflow: hidden;
    text-align: right;
  }
  .row-key {
    width: min-content;
    padding-left: 15px;
    padding-right: 15px;
  }

  .column-key {
    min-width: 120px;
    text-align: center;
  }
</style>
