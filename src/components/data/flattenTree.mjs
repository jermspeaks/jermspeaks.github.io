function flattenTree(node, path = '') {
  const fullPath = path ? `${path}/${node.name}` : node.name;
  let array = [{ name: fullPath }];

  if (node.children) {
    node.children.forEach(child => {
      array = array.concat(flattenTree(child, fullPath));
    });
  }

  return array;
}

export default flattenTree;