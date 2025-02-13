<script>
  import { onMount, onDestroy } from "svelte";
  import { marked } from "marked"; // For markdown parsing
  import { createHighlighter } from "shiki";

  let markdownInput = "";
  let renderedOutput = "";
  let error = "";
  let highlighter;

  onMount(async () => {
    try {
      // Initialize Shiki with GitHub theme
      highlighter = await createHighlighter({
        themes: ["github-dark"],
        langs: [
          "javascript",
          "typescript",
          "html",
          "css",
          "json",
          "markdown",
          "python",
          "bash",
          "jsx",
          "tsx",
        ],
      });

      // Configure marked to use Shiki
      marked.setOptions({
        highlight: (code, lang) => {
          try {
            return highlighter.codeToHtml(code, { lang: lang || "text" });
          } catch (err) {
            console.error("Syntax highlighting error:", err);
            return code;
          }
        },
      });

      updatePreview();
    } catch (err) {
      console.error("Failed to initialize Shiki:", err);
      error = "Failed to initialize syntax highlighter";
    }
  });

  // Function to update the rendered output
  function updatePreview() {
    try {
      if (markdownInput) {
        renderedOutput = marked(markdownInput);
      }
      error = "";
    } catch (err) {
      error = "Error parsing markdown: " + err.message;
    }
  }

  // Function to copy output to clipboard
  function copyToClipboard() {
    const type = "text/html";
    const blob = new Blob([renderedOutput], { type });
    const data = [new ClipboardItem({ [type]: blob })];

    navigator.clipboard
      .write(data)
      .then(() => {
        alert("Copied to clipboard with formatting!");
      })
      .catch((err) => {
        // Fallback to plain text if HTML clipboard fails
        navigator.clipboard.writeText(renderedOutput).then(() => {
          alert("Copied to clipboard as plain text!");
        });
      });
  }

  // Function to download the markdown
  function downloadMarkdown() {
    const blob = new Blob([markdownInput], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  onDestroy(() => {
    if (highlighter) {
      highlighter.dispose();
    }
  });
</script>

<div class="markdown-preview">
  <div class="grid grid-cols-2 gap-4">
    <div class="editor">
      <textarea
        class="w-full h-[500px] p-4 border rounded"
        bind:value={markdownInput}
        on:input={updatePreview}
        placeholder="Type your markdown here..."
      ></textarea>
    </div>
    <div class="preview">
      <div class="w-full h-[500px] p-4 border rounded overflow-auto">
        {@html renderedOutput}
      </div>
    </div>
  </div>

  <div class="flex gap-2 mt-4">
    <button
      class="px-4 py-2 border-2 rounded-full hover:bg-purple-300 dark:hover:bg-purple-600 dark:text-slate-100"
      on:click={copyToClipboard}>Copy to Clipboard</button
    >
    <button
      class="px-4 py-2 border-2 rounded-full hover:bg-purple-300 dark:hover:bg-purple-600 dark:text-slate-100"
      on:click={downloadMarkdown}>Download as .md</button
    >
  </div>

  {#if error}
    <div class="error mt-4 text-red-500">{error}</div>
  {/if}
</div>

<style>
  .markdown-preview {
    padding: 1rem;
  }

  textarea {
    resize: none;
  }

  :global(.preview h1) {
    font-size: 2em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  :global(.preview h2) {
    font-size: 1.5em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  :global(.preview h3) {
    font-size: 1.17em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  :global(.preview p) {
    margin-bottom: 1em;
    line-height: 1.5;
  }

  :global(.preview ul),
  :global(.preview ol) {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  :global(.preview ul) {
    list-style-type: disc;
  }

  :global(.preview ol) {
    list-style-type: decimal;
  }

  :global(.preview li) {
    margin-bottom: 0.5em;
  }

  :global(.preview pre) {
    margin-bottom: 1em;
    overflow-x: auto;
  }

  :global(.preview pre code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      monospace;
    font-size: 0.9em;
    line-height: 1.5;
  }

  :global(.preview code:not(pre code)) {
    font-family: monospace;
    background-color: rgba(175, 184, 193, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    font-size: 0.9em;
  }

  :global(.preview blockquote) {
    border-left: 4px solid #ddd;
    padding-left: 1em;
    margin-bottom: 1em;
    color: #666;
  }

  :global(.preview a) {
    color: #0366d6;
    text-decoration: none;
  }

  :global(.preview a:hover) {
    text-decoration: underline;
  }

  :global(.preview img) {
    max-width: 100%;
    height: auto;
  }

  :global(.preview table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
  }

  :global(.preview th),
  :global(.preview td) {
    border: 1px solid #ddd;
    padding: 0.5em;
    text-align: left;
  }

  :global(.preview th) {
    background-color: #f6f8fa;
  }

  :global(.shiki) {
    margin: 0;
    padding: 1rem;
    border-radius: 0.375rem;
    font-size: 0.9em;
  }
</style>
