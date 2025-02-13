<script lang="ts">
  import { getLocalTimeZone, today, parseDate } from "@internationalized/date";
  import type { DateValue } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Badge } from "$lib/components/ui/badge";
  import holidays from "../utils/holidays.ts";
  import { onMount } from "svelte";
  import type { Holiday } from "../utils/holidays.ts";

  // default selected date is today
  let value: DateValue | undefined = today(getLocalTimeZone());
  // let selectedDate: Date = new Date();
  let selectedHolidays: Holiday[];

  $: {
    console.log("selectedDate changed:", value);
    selectedHolidays = value
      ? holidays.filter((h) => h.date === value.toString())
      : [];
    console.log("selectedHolidays:", selectedHolidays);
  }

  function modifierClass(date: DateValue): string {
    const isoDateStr = date.toString();
    const hasHoliday = holidays.some((h) => h.date === isoDateStr);
    if (hasHoliday) {
      console.log("Date has holiday:", isoDateStr);
    }
    return hasHoliday ? "holiday-date" : "";
  }

  let maxValue = parseDate("2025-12-31");
  let minValue = parseDate("2025-01-01");

  function isDateUnavailable(date: DateValue) {
    // if a date is not in the list of holidays, return false
    return !holidays.some((h) => h.date === date.toString());
  }

  onMount(() => {
    console.log("Total holidays in dataset:", holidays.length);
    console.log("Sample holidays:", holidays.slice(0, 100));
  });
</script>

<div class="calendar-container space-y-4">
  <Calendar
    type="single"
    bind:value
    {maxValue}
    {minValue}
    numberOfMonths={1}
    class="rounded-md border shadow calendar-container"
    {isDateUnavailable}
  />
  <button
    class="px-2 my-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={value?.toString() === today(getLocalTimeZone()).toString()}
    on:click={() => (value = today(getLocalTimeZone()))}>Return to today</button
  >

  {#if selectedHolidays.length > 0}
    <div class="p-4 border rounded-md space-y-2">
      <h3 class="font-semibold text-lg">
        Holidays on {value?.toString()}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        {#each selectedHolidays as holiday}
          <Badge variant="secondary" class="flex items-center gap-1">
            {holiday.holiday}
            {#if holiday.note}
              <span class="text-xs text-muted-foreground">({holiday.note})</span
              >
            {/if}
          </Badge>
        {/each}
      </div>
    </div>
  {:else}
    <div class="p-4 border rounded-md space-y-2">
      <h3 class="font-semibold text-lg">
        No holidays on {value?.toString()}
      </h3>
    </div>
  {/if}
</div>

<style lang="postcss">
  :global(.calendar-container) {
    --destructive-foreground: rgb(239 68 68);
  }

  :global(
      .data-\[unavailable\]\:text-destructive-foreground[data-unavailable]
    ) {
    color: var(--destructive-foreground) !important;
  }

  :global(.calendar-container div div) {
    justify-content: center;
  }

  :global(.calendar-container div div table) {
    width: initial !important;
  }
</style>
