import { selectAll } from "hast-util-select";
import type { Element, Root, Content } from "hast";
import type { Transformer } from "unified";

type Node = Root | Content;

const makeApplyElement = (className: string) => (element: Element) => {
  if (element.properties === undefined) element.properties = {};
  const props = element.properties;
  props.className = `${props.className ?? ""} ${className}`;
};

const toApplier = (change: Change): ((node: Node) => void) => {
  const applyElement = makeApplyElement(change.className);
  return (node: Node) => {
    selectAll(change.selector, node).forEach(applyElement);
  };
};

interface Change {
  selector: string;
  className: string;
}

export const rehypeClassName = (changes: Change[]): Transformer<Node> => {
  const appliers = changes.map(toApplier);
  return (node): void => {
    appliers.forEach((apply) => apply(node));
  };
};
