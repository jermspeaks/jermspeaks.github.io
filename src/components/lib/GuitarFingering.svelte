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

  let selectedNote = "";
  let selectedOption = "";
  let selectedVariation = 0;

  function onNoteChange(event) {
    // const nextNote = event.currentTarget.value;
    if (selectedVariation !== 0) {
      selectedVariation = 0;
    }

    return event;
  }

  $: selectedPositionsAndFingerings =
    chordData?.[`${selectedNote}${selectedOption}`];

  // Constants for the SVG rendering
  const numberOfStrings = 6;
  const numberOfFrets = 21;
  const stringSpacing = 20; // Vertical space between strings
  const fretSpacing = 40; // Horizontal space between frets
  const fretboardWidth = (numberOfFrets + 1) * fretSpacing + 2 * stringSpacing;
  const fretboardHeight = (numberOfStrings - 1) * stringSpacing;

  const getFingerPosition = (string, fret) => {
    return {
      cx: fret * fretSpacing - fretSpacing / 2, // x position
      cy: (numberOfStrings - string) * stringSpacing, // y position
      r: 8, // radius of the circle
    };
  };

  const getTextPosition = (string, fret) => {
    return {
      x: fret * fretSpacing - fretSpacing / 2, // x position - text width
      y: (numberOfStrings - string) * stringSpacing + 5, // y position + 1/2 text size
    };
  };

  const parseFretPositions = (fretAndPosition = {}) => {
    const { f: fingerPosition, p: fretPosition } = fretAndPosition;

    // Edge Case: if the fingering includes a semicolon, there are alternative fingerings.
    // We need to account for that

    // Positions are delimited by commas like this "4,6,6,5,4,4"
    // Fingering is delimited by single numbers, like "134211"
    // For each string, determine the fingering and the fret position
    // Some fingering omits the finger positions where position === x since
    // there is no fingering there, so you can't rely on index
    const fingerPositions = fingerPosition.split("");
    const fretPositions = fretPosition.split(",");

    let stringIndex = 0;
    const map = fretPositions.map((fret, i) => {
      let finalFingerAndPosition = {};
      if (fret === "x") {
        finalFingerAndPosition = {
          text: "",
          fret: "x",
        };
      } else if (fret === "0") {
        finalFingerAndPosition = {
          text: "",
          fret: 0,
        };
      } else {
        finalFingerAndPosition = {
          text: fingerPositions[stringIndex],
          fret: parseInt(fret, 10),
        };
        stringIndex++;
      }

      return finalFingerAndPosition;
    });
    return map;
  };

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
        on:change={onNoteChange}
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
  <svg
    class="my-4"
    width={fretboardWidth}
    height={fretboardHeight + 2 * stringSpacing}
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <!-- Draw strings -->
    {#each Array(numberOfStrings) as _, stringIndex}
      <line
        x1="0"
        y1={stringSpacing + stringIndex * stringSpacing}
        x2={(21 + 1) * fretSpacing}
        y2={stringSpacing + stringIndex * stringSpacing}
        class="stroke-slate-900 dark:stroke-slate-100"
      />
    {/each}

    <!-- Draw frets and fret numbers -->
    {#each Array(22) as _, fretIndex}
      <line
        x1={fretIndex * fretSpacing}
        y1={stringSpacing}
        x2={fretIndex * fretSpacing}
        y2={fretboardHeight + stringSpacing}
        class="stroke-slate-900 dark:stroke-slate-100"
      />
      {#if fretIndex > 0}
        <text
          x={fretIndex * fretSpacing - fretSpacing / 2}
          y={fretboardHeight + 2 * stringSpacing - 5}
          font-size="10"
          text-anchor="middle"
          class="fill-slate-900 dark:fill-slate-100"
        >
          {fretIndex}
        </text>
      {/if}
    {/each}

    <!-- Draw fretboard markers -->
    {#each [3, 5, 7, 9, 15, 17, 19, 21] as fret}
      <circle
        cx={fret * fretSpacing - fretSpacing / 2}
        cy={fretboardHeight / 2 + stringSpacing}
        r={stringSpacing / 4}
        class="fill-slate-300 dark:fill-slate-500"
      />
    {/each}
    <!-- Double dots for the 12th fret -->
    <circle
      cx={12 * fretSpacing - fretSpacing / 2}
      cy={fretboardHeight / 3 + stringSpacing}
      r={stringSpacing / 4}
      class="fill-slate-300 dark:fill-slate-500"
    />
    <circle
      cx={12 * fretSpacing - fretSpacing / 2}
      cy={(2 * fretboardHeight) / 3 + stringSpacing}
      r={stringSpacing / 4}
      class="fill-slate-300 dark:fill-slate-500"
    />

    <!-- Draw finger positions -->
    {#each selectedPositionsAndFingerings as selectedPositionAndFingering, i}
      {#each parseFretPositions(selectedPositionAndFingering) as parsedString, stringIndex}
        <g class={i !== selectedVariation ? "hidden" : ""}>
          {#if ![0, "x"].includes(parsedString.fret)}
            <circle
              {...getFingerPosition(stringIndex, parsedString.fret)}
              class="fill-slate-800 dark:fill-slate-200 stroke-slate-400 dark:stroke-slate-800"
            />
            <text
              class="text-sm fill-slate-100 dark:fill-slate-900"
              text-anchor="middle"
              {...getTextPosition(stringIndex, parsedString.fret)}
              >{parsedString.text}</text
            >
          {:else if parsedString.fret === "x"}
            <!-- Left padding for the 'x' marks. Note index is reverse, so 5 minus index (zero-based, since 6 typically) -->
            <text
              x={stringSpacing / 2}
              y={stringSpacing + (5 - stringIndex) * stringSpacing}
              font-size="14"
              text-anchor="middle"
              alignment-baseline="middle"
            >
              x
            </text>
          {/if}
        </g>
      {/each}
    {/each}
  </svg>
  <table>
    <thead>
      <tr>
        <th class="px-4">Selected</th>
        <th class="px-4">Fingers</th>
        <th class="px-4">Frets</th>
      </tr>
    </thead>
    <tbody>
      {#each selectedPositionsAndFingerings as selectedPositionAndFingering, i}
        <tr class="border-2 border-zinc-800 dark:border-zinc-200">
          <td class="px-4"
            ><input
              id={`variation-${i.toString()}`}
              type="radio"
              name="variation"
              bind:group={selectedVariation}
              value={i}
            /></td
          >
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
