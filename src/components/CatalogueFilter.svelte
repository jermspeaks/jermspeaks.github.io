<script lang="ts">

  let { books = [] }: {
    books: Array<{
      slug: string;
      data: {
        title: string;
        bookAuthor?: string;
        authors?: string[];
        rating?: number | string;
        pubDate: string; // ISO string from Astro
        coverImage?: {
          src: string;
          width?: number;
          height?: number;
        } | null;
      };
    }>;
  } = $props();

  let searchQuery = $state("");
  let typeFilter = $state("all");
  let ratingFilter = $state("all");
  let sortField = $state<"date" | "title" | "author" | "rating">("date");
  let sortDirection = $state<"asc" | "desc">("desc");

  // Rating emoji mapping
  const ratingEmojiMap: Record<number, string> = {
    6: "❤️", // Masterpiece
    5: "🥰", // Loved
    4: "🙂", // Liked
    3: "😐", // Okay
    2: "😕", // Disliked
    1: "🙁", // Hated
  };

  function getRatingEmoji(rating?: number | string): string {
    if (!rating) return "";
    const numRating = typeof rating === "string" ? parseInt(rating) : rating;
    return ratingEmojiMap[numRating] || "";
  }

  function getAuthor(book: typeof books[0]): string {
    if (book.data.bookAuthor) return book.data.bookAuthor;
    if (book.data.authors && book.data.authors.length > 0) {
      return book.data.authors[0];
    }
    return "";
  }

  let filteredBooks = $derived.by(() => {
    let result = [...books];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((book) => {
        const title = book.data.title.toLowerCase();
        const author = getAuthor(book).toLowerCase();
        return title.includes(query) || author.includes(query);
      });
    }

    // Rating filter
    if (ratingFilter !== "all") {
      const ratingNum = parseInt(ratingFilter);
      result = result.filter((book) => {
        const bookRating =
          typeof book.data.rating === "string"
            ? parseInt(book.data.rating)
            : book.data.rating;
        return bookRating === ratingNum;
      });
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "title":
          comparison = a.data.title.localeCompare(b.data.title);
          break;
        case "author":
          comparison = getAuthor(a).localeCompare(getAuthor(b));
          break;
        case "rating":
          const aRating =
            typeof a.data.rating === "string"
              ? parseInt(a.data.rating)
              : a.data.rating || 0;
          const bRating =
            typeof b.data.rating === "string"
              ? parseInt(b.data.rating)
              : b.data.rating || 0;
          comparison = aRating - bRating;
          break;
        case "date":
        default:
          const aDate = new Date(a.data.pubDate).valueOf();
          const bDate = new Date(b.data.pubDate).valueOf();
          comparison = aDate - bDate;
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  });

  function toggleSortDirection() {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  }

  function setSortField(field: typeof sortField) {
    if (sortField === field) {
      toggleSortDirection();
    } else {
      sortField = field;
      sortDirection = "desc";
    }
  }
</script>

<div class="grid grid-cols-[250px_1fr] gap-8 mt-8 max-md:grid-cols-1">
  <aside class="flex flex-col gap-6">
    <p class="text-sm text-slate-600 dark:text-slate-300 m-0">
      This page lists games, books, shows... stuff I've played, watched, read,
      listened to.
    </p>

    <div class="flex flex-col gap-2">
      <label for="search" class="text-sm font-medium dark:text-white">Search</label>
      <input
        id="search"
        type="text"
        bind:value={searchQuery}
        placeholder="Search..."
        class="p-2 border border-slate-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
      />
    </div>

    <div class="flex flex-col gap-2">
      <label for="type" class="text-sm font-medium dark:text-white">Type</label>
      <select id="type" bind:value={typeFilter} class="p-2 border border-slate-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
        <option value="all">Type</option>
        <!-- Reserved for future expansion -->
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label for="rating" class="text-sm font-medium dark:text-white">Rating</label>
      <select id="rating" bind:value={ratingFilter} class="p-2 border border-slate-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
        <option value="all">Rating</option>
        <option value="6">❤️ Masterpiece</option>
        <option value="5">🥰 Loved</option>
        <option value="4">🙂 Liked</option>
        <option value="3">😐 Okay</option>
        <option value="2">😕 Disliked</option>
        <option value="1">🙁 Hated</option>
      </select>
    </div>

    <div class="flex flex-col gap-2">
      <label for="sort" class="text-sm font-medium dark:text-white flex items-center gap-2">
        Sort
        <button
          type="button"
          onclick={() => toggleSortDirection()}
          class="bg-transparent border-none cursor-pointer text-base p-0 text-inherit"
          aria-label="Toggle sort direction"
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </label>
      <select
        id="sort"
        class="p-2 border border-slate-300 dark:border-slate-700 rounded text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
        value={sortField}
        onchange={(e) => {
          const value = (e.target as HTMLSelectElement).value;
          setSortField(value as typeof sortField);
        }}
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="rating">Rating</option>
      </select>
    </div>

    <div class="mt-auto text-sm text-slate-600 dark:text-slate-300">
      {filteredBooks.length} entries
    </div>
  </aside>

  <main class="min-h-0">
    <div class="grid grid-cols-5 gap-4 max-xl:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
      {#each filteredBooks as book (book.slug)}
        <a href={`/catalogue/${book.slug}`} class="block no-underline text-inherit">
          <div class="relative w-full aspect-[2/3] overflow-hidden rounded">
            {#if book.data.coverImage}
              <img
                src={book.data.coverImage.src}
                alt={book.data.title}
                class="w-full h-full object-cover"
              />
            {:else}
              <div class="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2 text-xs text-center text-slate-600 dark:text-slate-300">
                {book.data.title}
              </div>
            {/if}
            {#if book.data.rating}
              <span class="absolute top-1 right-1 text-xl bg-white/90 dark:bg-slate-900/90 rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                {getRatingEmoji(book.data.rating)}
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </main>
</div>


