import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_RSS_DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("blog");
  // Recent items first
  const items = posts
    .map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    }))
    .reverse();

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
