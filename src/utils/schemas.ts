import type { CollectionEntry } from "astro:content";

type WritingPiece = CollectionEntry<"writing">;

export function generateWritingPieceSchema(post: WritingPiece) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    author: {
      "@type": "Person",
      name: "Jeremy Wong",
      url: "https://craftbyzen.com/",
    },
    datePublished: post.data.pubDate,
    dateModified: post.data.updatedDate || post.data.pubDate,
    keywords: post.data.tags?.join(", "),
    url: `https://craftbyzen.com/blog/${post.slug}`,
    image: post.data.heroImage || "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://craftbyzen.com/blog/${post.slug}`,
    },
  };
}

export function generateWritingListSchema(posts: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "headline": post.data.title,
          "description": post.data.description,
          "author": {
            "@type": "Person",
            "name": "Jeremy Wong",
            "url": "https://craftbyzen.com/"
          },
          "datePublished": post.data.pubDate,
          "url": `https://craftbyzen.com/blog/${post.slug}`
        }
      }))
    }
  };
}

export default {
  generateWritingPieceSchema,
};
