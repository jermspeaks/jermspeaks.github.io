<script>
  import { run } from 'svelte/legacy';

  let {
    j,
    i,
    focused,
    data,
    p,
    handleFocus,
    handleBlur,
    handleKeydown,
    handleInput
  } = $props();

  let key = j + i;
  let hasFocus = $state(false);
  run(() => {
    if (focused === key && !hasFocus) {
      hasFocus = true;
    } else if (focused !== key && hasFocus) {
      hasFocus = false;
    }
  });
</script>

{#if hasFocus}
  <input
    id={"input-" + key}
    value={$data[key] || ""}
    onfocus={() => handleFocus(key)}
    onblur={() => handleBlur(key)}
    onkeydown={(e) => handleKeydown(e, j, i)}
    oninput={(e) => handleInput(e, key)}
  />
{:else}
  <div>{p.parse($data[key]) || ""}</div>
{/if}

<style>
  div {
    width: 100%;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
  }

  input {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    text-align: right;
    border: none;
    outline: none;
  }

  input:focus {
    text-align: left;
  }
</style>
