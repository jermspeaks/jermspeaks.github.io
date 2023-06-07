import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";

const remarkReadingTime = (): Function => {
  // @ts-ignore
  return function (tree: any, astro: any): void {
    const { data } = astro ?? {};
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    // data.astro.remarkPluginFrontmatter = { minutesRead: readingTime.text };
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
};

export default remarkReadingTime;
