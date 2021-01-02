import React from "react";

const calcBoundingRects = (children: any) => {
  let boundingRects = {};

  React.Children.forEach(children, (child) => {
    const childNode = child.ref.current;
    
    boundingRects = {
      ...boundingRects,
      [child.key]: childNode.getBoundingClientRect(),
    }
  });

  return boundingRects;
};

export default calcBoundingRects;
