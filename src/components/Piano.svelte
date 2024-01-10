<script>
  let currentKey = "C";
  let transposeAmount = 0;

  function generatePianoKeys() {
    const whiteKeys = ["A", "B", "C", "D", "E", "F", "G"];
    const blackKeys = ["A#", "", "C#", "D#", "", "F#", "G#"];

    let pianoKeys = [];

    for (let i = 0; i < 88; i++) {
      const key = {
        note: whiteKeys[i % 7],
        type: "white",
        octave: Math.floor(i / 7),
      };

      if (blackKeys[i % 7] !== "") {
        key.blackNote = { note: blackKeys[i % 7], type: "black" };
      }

      pianoKeys.push(key);
    }

    return pianoKeys;
  }

  function getFrequency(note, octave) {
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const keyNumber = notes.indexOf(note);
    if (keyNumber >= 9) {
      octave--;
    }
    // console.log('keyNumber, octave', keyNumber, octave);
    // This is the base frequency of middle A, known as "Middle pitch"
    // which is at octave 4 and key number 9
    const baseFrequency = 440;
    const relativeOctave = octave - 3;
    // We need to calculate the frequency of any given key
    // For example, key C# at octave 1 is key number 1
    // The calculation is based on the distance from the base frequency
    // Formula: baseFrequency * 2 ^ ((keyNumber - 9) / 12)
    // Formula with octave: baseFrequency * 2 ^ ((keyNumber - 9) / 12 + octave)
    const transposedKeyNumber = keyNumber + transposeAmount;
    return baseFrequency * Math.pow(2, (transposedKeyNumber - 9) / 12 + relativeOctave);
  }

  function playNote(note, octave) {
    // Play the frequency corresponding to the note
    // console.log(`Playing note: ${note} at octave: ${octave}`);
    // Use Web Audio API to play the note
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.type = "sine";
    oscillator.frequency.value = getFrequency(note, octave);
    console.log('frequency', note, octave, oscillator.frequency.value);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  }

  function transpose(halfSteps) {
    const notes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const index = notes.indexOf(currentKey);

    if (halfSteps === -1) {
      transposeAmount -= 1;
      if (index === 0) {
        currentKey = notes[notes.length - 1];
        return;
      }
      currentKey = notes[index - 1];
    } else if (halfSteps === 1) {
      transposeAmount += 1;
      if (index === notes.length - 1) {
        currentKey = notes[0];
        return;
      }
      currentKey = notes[(index + 1) % notes.length];
    } else {
      currentKey = notes[0];
    }
  }
</script>

<div class="piano">
  {#each generatePianoKeys() as { note, type, blackNote, octave }}
    <div class={`h-32 w-4 my-1 border border-solid border-gray-800 inline-block relative bg-white hover:bg-slate-800 ${type}`} on:click={() => playNote(note, octave)}>
      {#if blackNote}
        <div
          class="h-20 w-3 bg-black absolute top-0 left-3 m-0 z-10 hover:bg-slate-200"
          on:click={() => playNote(blackNote.note, octave)}
        ></div>
      {/if}
    </div>
  {/each}
</div>
<div class="controls">
  <div class="control-button" on:click={() => transpose(-1)}>-</div>
  <div class="control-label mx-4">Transpose</div>
  <div class="control-button" on:click={() => transpose(1)}>+</div>
</div>
<div class="text-center text-lg py-4">
  Key of {currentKey}
</div>

<style>
  .piano {
    @apply flex justify-center flex-wrap;
  }

  .piano-key {
    @apply h-32 w-4 my-1 border border-solid border-gray-800 inline-block relative;
  }

  .piano-key.black {
    @apply h-20 w-3 bg-black absolute top-0 left-3 m-0 z-10;
  }

  .controls {
    @apply flex justify-center items-center mt-5;
  }

  .control-button {
    @apply p-2 px-4 m-0 bg-gray-200 border border-solid border-gray-300 cursor-pointer;
  }

  .control-label {
    @apply font-bold;
  }
</style>

