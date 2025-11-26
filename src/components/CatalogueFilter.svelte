<script lang="ts">
  import { onMount } from "svelte";

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

<div class="catalogue-container">
  <aside class="sidebar">
    <p class="description">
      This page lists games, books, shows... stuff I've played, watched, read,
      listened to.
    </p>

    <div class="filter-group">
      <label for="search">Search</label>
      <input
        id="search"
        type="text"
        bind:value={searchQuery}
        placeholder="Search..."
        class="search-input"
      />
    </div>

    <div class="filter-group">
      <label for="type">Type</label>
      <select id="type" bind:value={typeFilter} class="select-input">
        <option value="all">Type</option>
        <!-- Reserved for future expansion -->
      </select>
    </div>

    <div class="filter-group">
      <label for="rating">Rating</label>
      <select id="rating" bind:value={ratingFilter} class="select-input">
        <option value="all">Rating</option>
        <option value="6">❤️ Masterpiece</option>
        <option value="5">🥰 Loved</option>
        <option value="4">🙂 Liked</option>
        <option value="3">😐 Okay</option>
        <option value="2">😕 Disliked</option>
        <option value="1">🙁 Hated</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="sort">
        Sort
        <button
          type="button"
          onclick={() => toggleSortDirection()}
          class="sort-direction"
          aria-label="Toggle sort direction"
        >
          {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </label>
      <select
        id="sort"
        class="select-input"
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

    <div class="entry-count">
      {filteredBooks.length} entries
    </div>
  </aside>

  <main class="grid-container">
    <div class="book-grid">
      {#each filteredBooks as book (book.slug)}
        <a href={`/catalogue/${book.slug}`} class="book-card">
          <div class="book-cover-wrapper">
            {#if book.data.coverImage}
              <img
                src={book.data.coverImage.src}
                alt={book.data.title}
                class="book-cover"
              />
            {:else}
              <div class="book-cover-placeholder">
                {book.data.title}
              </div>
            {/if}
            {#if book.data.rating}
              <span class="rating-emoji">
                {getRatingEmoji(book.data.rating)}
              </span>
            {/if}
          </div>
        </a>
      {/each}
    </div>
  </main>
</div>

<style>
  .catalogue-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
    margin-top: 2rem;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .description {
    font-size: 0.9rem;
    color: rgb(71 85 105);
    margin: 0;
  }

  .dark .description {
    color: rgb(203 213 225);
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filter-group label {
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .search-input,
  .select-input {
    padding: 0.5rem;
    border: 1px solid rgb(203 213 225);
    border-radius: 0.25rem;
    font-size: 0.875rem;
    background: white;
    color: rgb(15 23 42);
  }

  .dark .search-input,
  .dark .select-input {
    background: rgb(30 41 59);
    border-color: rgb(51 65 85);
    color: rgb(241 245 249);
  }

  .sort-direction {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    color: inherit;
  }

  .entry-count {
    margin-top: auto;
    font-size: 0.875rem;
    color: rgb(71 85 105);
  }

  .dark .entry-count {
    color: rgb(203 213 225);
  }

  .grid-container {
    min-height: 0;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
  }

  .book-card {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .book-cover-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 0.25rem;
  }

  .book-cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .book-cover-placeholder {
    width: 100%;
    height: 100%;
    background: rgb(241 245 249);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    text-align: center;
    color: rgb(71 85 105);
  }

  .dark .book-cover-placeholder {
    background: rgb(30 41 59);
    color: rgb(203 213 225);
  }

  .rating-emoji {
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    font-size: 1.25rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .dark .rating-emoji {
    background: rgba(15, 23, 42, 0.9);
  }

  @media (max-width: 1024px) {
    .book-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 768px) {
    .catalogue-container {
      grid-template-columns: 1fr;
    }

    .book-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 640px) {
    .book-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

