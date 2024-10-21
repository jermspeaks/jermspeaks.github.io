<script lang="ts">
  let c = $state(20);
  let f = $state(68);

  function setBothFromC(value: number): void {
    c = +value;
    f = +(32 + (9 / 5) * c).toFixed(1);
  }

  function setBothFromF(value: number): void {
    f = +value;
    c = +((5 / 9) * (f - 32)).toFixed(1);
  }
</script>

<!-- https://eugenkiss.github.io/7guis/tasks/#temp -->
<input
  value={c}
  oninput={(e) => setBothFromC(e?.target?.value)}
  type="number"
  class="w-16 px-2 dark:text-white dark:bg-slate-800"
/>
°C =
<input
  value={f}
  oninput={(e) => setBothFromF(e?.target?.value)}
  type="number"
  class="w-16 px-2 dark:text-white dark:bg-slate-800"
/>
°F
