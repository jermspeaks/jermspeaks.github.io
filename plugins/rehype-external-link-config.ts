import type { Options } from "rehype-autolink-headings";

/**
 * Configuration for the `rehype-autolink-headings` plugin.
 * This set-up was informed by https://amberwilson.co.uk/blog/are-your-anchor-links-accessible/
 */
const autolinkConfig: Options = {
  // @ts-ignore
  content: {
    type: "element",
    tagName: "svg",
    properties: {
      width: 16,
      height: 16,
      version: 1.1,
      fill: "none",
      viewBox: "0 0 24 24",
      xlmns: "https://www.w3.org/2000/svg",
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          stroke: "#0e7490",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
        },
      },
    ],
  },
  contentProperties: { className: ["external-link"] },
};

export default autolinkConfig;
