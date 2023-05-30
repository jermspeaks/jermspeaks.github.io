import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_RSS_DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("blog");
  const books = await getCollection("book");
  const films = await getCollection("filmLibrary");

  // Recent items first
  const postCollection = posts.map((post) => ({
    ...post.data,
    link: `/blog/${post.slug}/`,
  }));
  const bookCollection = books.map((book) => ({
    ...book.data,
    link: `/library/books/${book.slug}/`,
  }));
  const filmCollection = films.map((film) => ({
    ...film.data,
    link: `/library/films/${film.slug}/`,
  }));
  const items = [...postCollection, ...bookCollection, ...filmCollection].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf()
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_RSS_DESCRIPTION,
    site: context.site,
    items,
    // ex. use your stylesheet from "public/rss/styles.xsl"
    stylesheet: "/rss/styles.xsl",
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
