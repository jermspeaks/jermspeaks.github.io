<script>
  import { onMount } from "svelte";
  import data from "./fingering.json";

  // Mock data for chord fingerings. In a real application, you would fetch this from a database or API.
  const chordData = data.EADGBE;
  const notes = [
    "A",
    "A#",
    "Bb",
    "B",
    "C",
    "C#",
    "Db",
    "D",
    "D#",
    "Eb",
    "E",
    "F",
    "F#",
    "Gb",
    "G",
    "G#",
    "Ab",
  ];
  const options = [
    "",
    "+",
    "+7",
    "+7",
    "+7b9",
    "+9",
    "11",
    "13",
    "13sus4",
    "5",
    "6",
    "7",
    "7b5",
    "7b5",
    "7b9",
    "7sus2",
    "7sus4",
    "9",
    "9b5",
    "9sus4",
    "add9",
    "aug",
    "dim",
    "dim7",
    "m",
    "m11",
    "m13",
    "m6",
    "m7",
    "m7b5",
    "m9",
    "m9b5",
    "madd9",
    "Maj13",
    "Maj7",
    "Maj9",
    "mb6",
    "mMaj7",
    "mMaj9",
    "sus2",
    "sus4",
  ];

  // let chords = Object.keys(chordData);
  // let search = "";
  // let suggestions = [];

  let selectedNote = "";
  let selectedOption = "";
  // let selectedChord = null;
  let fingerings = [];

  // function onChange(event) {
  //   selectedNote = event.currentTarget.value;
  //   console.log("selectedNote", selectedNote);

  //   const chord = `${selectedNote}`;
  //   selectedChord = chordData?.[chord];
  //   // fingerings = selectedChord.map((fingering) => fingering.p);
  // }

  // const selectChord = (chordName) => {
  //   search = chordName;
  //   selectedChord = chordData[chordName];
  // };

  $: selectedPositionsAndFingerings =
    chordData?.[`${selectedNote}${selectedOption}`];
  // $: fingerings = Array.isArray(selectedPositionsAndFingerings)
  //   ? selectedPositionsAndFingerings.map((fingering) => fingering?.f)
  //   : [];
  // $: frets = Array.isArray(selectedPositionsAndFingerings)
  //   ? selectedPositionsAndFingerings.map((fingering) => fingering?.p)
  //   : [];

  onMount(() => {
    searchChords();
  });
</script>

<div class="grid grid-cols-6 gap-4">
  {#each notes as note}
    <div
      class="col-span-3 sm:col-span-2 md:col-span-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
    >
      <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        id={`note-${note}`}
        type="radio"
        name="note"
        bind:group={selectedNote}
        value={note}
      />
      <label
        class="w-full py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
        for={`note-${note}`}
      >
        {note}
      </label>
    </div>
  {/each}
</div>

<hr class="my-4" />

<details>
  <summary>Options</summary>

  <div class="grid grid-cols-6 gap-8">
    {#each options as option}
      <div
        class="col-span-3 sm:col-span-2 md:col-span-1 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
      >
        <input
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          id={`option-${option}`}
          type="radio"
          name="option"
          bind:group={selectedOption}
          value={option}
        />
        <label
          class="w-full py-4 ms-2 text-md font-medium text-gray-900 dark:text-gray-300"
          for={`option-${option}`}
        >
          {option}
        </label>
      </div>
    {/each}
  </div>
</details>

<hr class="my-4" />

<p class="text-2xl mb-4">Selected Chord: {selectedNote}{selectedOption}</p>

{#if selectedPositionsAndFingerings}
  <table>
    <thead>
      <tr>
        <th class="px-4">Fingers</th>
        <th class="px-4">Frets</th>
      </tr>
    </thead>
    <tbody>
      {#each selectedPositionsAndFingerings as selectedPositionAndFingering}
        <tr class="border-2 border-zinc-800 dark:border-zinc-200">
          <td class="px-4">{selectedPositionAndFingering.f}</td>
          <td class="px-4">{selectedPositionAndFingering.p}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<!-- {#if selectedChord}
  <div>
    <p class="fingering">Main fingering: {selectedChord?.[0].join(" ")}</p>
    <p>Alternative fingerings:</p>
    <ul>
      {#each selectedChord.alternatives as alternative}
        <li class="fingering">{alternative.join(" ")}</li>
      {/each}
    </ul>
  </div>
{/if} -->

<style>
</style>
