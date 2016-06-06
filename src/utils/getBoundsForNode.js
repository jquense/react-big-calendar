function pageOffset(dir) {
  if (dir === 'left')
    return (window.pageXOffset || window.scrollX || document.body.scrollLeft || 0)
  if (dir === 'top')
    return (window.pageYOffset || window.scrollY || document.body.scrollTop || 0)
}

/**
 * Given a node, get everything needed to calculate its boundaries
 * @param  {HTMLElement} node
 * @return {Object}
 */
export default function getBoundsForNode(node) {
  if (!node.getBoundingClientRect) return node;

  const rect = node.getBoundingClientRect()
  const left = rect.left + pageOffset('left')
  const top = rect.top + pageOffset('top')

  return {
    top,
    left,
    right: (node.offsetWidth || 0) + left,
    bottom: (node.offsetHeight || 0) + top
  };
}
