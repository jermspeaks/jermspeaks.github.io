<script>
  const websites = ["google.com", "bing.com", "amazon.com"];
  let results = $state([]);
  let isLoading = $state(false);
  let error = $state(null);

  async function pingWebsite(website) {
    const startTime = performance.now();
    try {
      const response = await fetch(`https://${website}`, {
        mode: "no-cors",
        cache: "no-cache",
      });
      const endTime = performance.now();
      const latency = Math.round(endTime - startTime);
      return {
        website,
        status: "✅",
        latency: `${latency} ms`,
      };
    } catch (error) {
      return {
        website,
        status: "⛔",
        latency: "N/A",
      };
    }
  }

  async function handlePing() {
    isLoading = true;
    error = null;

    try {
      results = await Promise.all(websites.map(pingWebsite));
    } catch (err) {
      error = "An error occurred while pinging websites";
    } finally {
      isLoading = false;
    }
  }

  function downloadCSV() {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Website,Status,Latency\n" +
      results.map((r) => `${r.website},${r.status},${r.latency}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ping_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
</script>

<div class="space-y-4">
  <div class="mb-4">
    <details>
      <summary>Websites to ping:</summary>

      <ul class="list-disc list-inside">
        {#each websites as website}
          <li>{website}</li>
        {/each}
      </ul>
    </details>
  </div>

  <button
    onclick={handlePing}
    disabled={isLoading}
    class="px-2 my-2 border-slate-800 dark:border-slate-200 border-2 rounded-sm hover:bg-purple-500"
  >
    {isLoading ? "Pinging..." : "Ping Websites"}
  </button>

  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-sm relative"
      role="alert"
    >
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">{error}</span>
    </div>
  {/if}

  {#if results.length > 0}
    <div class="space-y-2">
      <button
        onclick={downloadCSV}
        class="px-2 my-2 border-slate-800 dark:border-slate-200 border-2 rounded-sm hover:bg-purple-500"
      >
        Download Results (CSV)
      </button>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Website
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Latency
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          {#each results as result}
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {result.website}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {result.status}
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {result.latency}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
