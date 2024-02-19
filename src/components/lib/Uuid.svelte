<script>
  import { onMount } from "svelte";

  let uuid = "";

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        uuid = text;
        showTooltip();
        setTimeout(hideTooltip, 800); // Hide tooltip after 800 ms
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }

  function showTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "visible";
  }

  function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "hidden";
  }

  onMount(() => {
    uuid = generateUUID();
  });
</script>

<div>
  <p class="border-2 text-center p-2 border-slate-800">Generated UUID: {uuid}</p>
  <div class="flex align-middle gap-4">
    <button
      class="px-2 my-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500"
      on:click={() => (uuid = generateUUID())}>Generate New UUID</button
    >
    <div class="relative">
      <button
        class="px-2 py-1 my-2 border-slate-800 dark:border-slate-200 border-2 rounded hover:bg-purple-500"
        on:click={() => copyToClipboard(uuid)}
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#000000"
          ><path
            d="M8.5 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H12"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path><path
            d="M15.5 4H18C19.1046 4 20 4.89543 20 6V15"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path><path
            d="M8 6.4V4.5C8 4.22386 8.22386 4 8.5 4C8.77614 4 9.00422 3.77604 9.05152 3.50398C9.19968 2.65171 9.77399 1 12 1C14.226 1 14.8003 2.65171 14.9485 3.50398C14.9958 3.77604 15.2239 4 15.5 4C15.7761 4 16 4.22386 16 4.5V6.4C16 6.73137 15.7314 7 15.4 7H8.6C8.26863 7 8 6.73137 8 6.4Z"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
          ></path><path
            d="M15.5 20.5L17.5 22.5L22.5 17.5"
            stroke="#000000"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path></svg
        >
      </button>
      <span id="tooltip" class="tooltip">Copied!</span>
    </div>
  </div>
</div>

<style>
  /* Add your styles here if needed */
  .tooltip {
    visibility: hidden;
    position: absolute;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    z-index: 1;
    bottom: calc(100% + 4px); /* Positioning it above the button with a gap */
    left: 50%;
    transform: translateX(-50%);
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
</style>
