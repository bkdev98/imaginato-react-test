import React from "react";

function getAbsoluteBoundingRect(node: any) {
  const rect = node.getBoundingClientRect();

  let offsetX = window.pageXOffset;
  let offsetY = window.pageYOffset;
  let parent = node.parentNode;
  
  while (parent && parent !== document.body) {
    offsetX += parent.scrollLeft;
    offsetY += parent.scrollTop;
    parent = parent.parentNode;
  }

  return {
    ...rect,
    top   : rect.top + offsetY,
    left  : rect.left + offsetX,
    bottom: rect.bottom + offsetY,
    right : rect.right + offsetX,
  };
}

const calcBoundingRects = (children: any) => {
  let boundingRects = {};

  React.Children.forEach(children, (child) => {
    const childNode = child.ref.current;
    
    boundingRects = {
      ...boundingRects,
      [child.key]: getAbsoluteBoundingRect(childNode),
    }
  });

  return boundingRects;
};

export default calcBoundingRects;
