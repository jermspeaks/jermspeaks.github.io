<script>
  import { onMount } from "svelte";

  let timeZones = [
    // Assuming this list contains timezones from the 50 most populated areas
    "Africa/Cairo",
    "Africa/Johannesburg",
    "Africa/Lagos",
    "Africa/Luanda",
    "Africa/Nairobi",
    "America/Buenos_Aires",
    "America/Caracas",
    "America/Chicago",
    "America/Lima",
    "America/Los_Angeles",
    "America/Mexico_City",
    "America/New_York",
    "America/Sao_Paulo",
    "America/Toronto",
    "America/Vancouver",
    "Asia/Baghdad",
    "Asia/Bangkok",
    "Asia/Beirut",
    "Asia/Delhi",
    "Asia/Dubai",
    "Asia/Ho_Chi_Minh",
    "Asia/Istanbul",
    "Asia/Jakarta",
    "Asia/Karachi",
    "Asia/Kolkata",
    "Asia/Kuwait",
    "Asia/Manila",
    "Asia/Mumbai",
    "Asia/Riyadh",
    "Asia/Seoul",
    "Asia/Shanghai",
    "Asia/Tbilisi",
    "Asia/Tehran",
    "Asia/Tokyo",
    "Australia/Melbourne",
    "Australia/Sydney",
    "Europe/Amsterdam",
    "Europe/Athens",
    "Europe/Berlin",
    "Europe/London",
    "Europe/Madrid",
    "Europe/Moscow",
    "Europe/Paris",
    "Europe/Stockholm",
    "Pacific/Auckland",
    "Pacific/Honolulu",
  ];

  let localTimezone = $state("");
  let systemTime = $state("");
  let selectedTimezone = $state("");
  let selectedTime = $state("");

  let timezoneSelect = $state();

  onMount(() => {
    updateTimeDisplays();

    // Update system time every second
    setInterval(updateTimeDisplays, 1000);
  });

  function updateTimeDisplays() {
    const now = new Date();
    localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    systemTime = now.toLocaleTimeString("en-US", { timeZone: localTimezone });
    selectedTimezone = timezoneSelect.value;
    selectedTime = now.toLocaleTimeString("en-US", {
      timeZone: selectedTimezone,
    });
  }
</script>

<div class="grid grid-cols-8 grid-rows-3 gap-1">
  <div
    class="flex items-center justify-start bg-zinc-300 dark:bg-slate-900 col-start-1 col-end-9 p-2"
  >
    <label for="timezone-select" class="font-bold">Your Timezone:</label>
    <select
      bind:this={timezoneSelect}
      id="timezone-select"
      name="timezones"
      class="ml-2 dark:bg-slate-900 dark:text-white"
    >
      {#each timeZones as tz (tz)}
        <option value={tz}>{tz}</option>
      {/each}
    </select>
  </div>
  <div
    class="bg-zinc-100 dark:bg-slate-800 border-2 border-black flex items-center justify-start p-2 col-start-1 col-end-6"
    id="local-timezone"
  >
    <strong>System Timezone: </strong><span>&nbsp;</span>{localTimezone}
  </div>
  <div
    class="col-start-6 col-end-9 border-2 border-blue-500 dark:border-blue-800 flex items-center justify-center"
    id="system-time"
  >
    {systemTime}
  </div>
  <div
    class="bg-zinc-100 dark:bg-slate-800 border-2 border-black flex items-center justify-start p-2 col-start-1 col-end-6"
    id="selected-timezone"
  >
    <strong>Selected Timezone: </strong><span>&nbsp;</span>{selectedTimezone}
  </div>
  <div
    class="col-start-6 col-end-9 border-2 border-blue-500 dark:border-blue-800 flex items-center justify-center"
    id="selected-time"
  >
    {selectedTime}
  </div>
</div>
