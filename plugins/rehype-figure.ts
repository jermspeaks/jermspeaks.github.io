import { visit } from "unist-util-visit";
import { h } from "hastscript";

function buildFigure(img: any, className: string) {
  const { properties } = img ?? {};
  const figure = h("figure", { class: className }, [
    h("img", { ...properties }),
    properties.alt && properties.alt.trim().length > 0
      ? h("figcaption", properties.alt)
      : "",
  ]);
  return figure;
}

const transformer =
  (className: string): Function =>
  (ast: any): void => {
    const visitor = (node: any, index: number): void => {
      const images = node.children
        .filter((n: any) => n.tagName === "img")
        .map((img: any) => buildFigure(img, className));

      if (images.length === 0) return;

      ast.children[index] =
        images.length === 1
          ? images[0]
          : (ast.children[index] = h(
              "div",
              { class: `${className}-container` },
              images
            ));
    };
    const element: any = { tagName: "p" };

    // @ts-ignore
    visit(ast, element, visitor);
  };

const rehypeFigure = (option: any = {}) => {
  const className = option?.className || "rehype-figure";

  return transformer(className);
};

export default rehypeFigure;
