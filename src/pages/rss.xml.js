import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_RSS_DESCRIPTION } from "../consts";

export async function GET(context) {
  const antiLibrary = await getCollection("antiLibrary");
  const books = await getCollection("book");
  const creator = await getCollection("creator");
  const films = await getCollection("filmLibrary");
  const lindy = await getCollection("lindy");
  const posts = await getCollection("writing");

  // Recent items first
  const postCollection = posts.map((item) => ({
    ...item.data,
    link: `/blog/${item.id}/`,
  }));
  const bookCollection = books.map((item) => ({
    ...item.data,
    description: item.data.blurb,
    link: `/curation/books/${item.id}/`,
  }));
  const filmCollection = films.map((item) => ({
    ...item.data,
    description: item.data.blurb,
    link: `/curation/films/${item.id}/`,
  }));
  const antiLibraryCollection = antiLibrary.map((item) => ({
    ...item.data,
    description: item.data.blurb,
    link: `/curation/antibooks/${item.id}`,
  }));
  const creatorCollection = creator.map((item) => ({
    ...item.data,
    description: item.data.blurb,
    link: `/curation/creators/${item.id}`,
  }));
  const lindyCollection = lindy.map((item) => ({
    ...item.data,
    description: item.data.blurb,
    link: `/curation/lindy/${item.id}`,
  }));
  const items = [
    ...antiLibraryCollection,
    ...bookCollection,
    ...creatorCollection,
    ...filmCollection,
    ...lindyCollection,
    ...postCollection,
  ]
    .filter(
      // Filter all draft posts
      (post) => !post.draft
    )
    .sort(
      // Sort by the publication date
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
