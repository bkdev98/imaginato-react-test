import React, {useState, useEffect, useLayoutEffect} from 'react';
import styled from 'styled-components';

import usePreviousValue from '../hooks/usePreviousValue';
import calcBoundingRects from '../utils/calcBoundingRects';

const Wrapper = styled.div`
  padding: 0 15px;
`;

interface StreamerListProps {
  children: React.ReactNode;
}

const StreamerList: React.FC<StreamerListProps> = ({children}) => {
  const [boundingRect, setBoundingRect] = useState({});
  const [prevBoundingRect, setPrevBoundingRect] = useState({});

  const prevChildren = usePreviousValue(children);

  useLayoutEffect(() => {
    const newBoundingRect = calcBoundingRects(children);
    setBoundingRect(newBoundingRect);
  }, [children]);

  useLayoutEffect(() => {
    const prevBoundingRect = calcBoundingRects(prevChildren);
    setPrevBoundingRect(prevBoundingRect);
  }, [prevChildren]);

  useEffect(() => {
    const hasPrevBoundingRect = Object.keys(prevBoundingRect).length;

    if (hasPrevBoundingRect) {
      React.Children.forEach(children, (child: any) => {
        const childNode = child.ref.current;
        const firstRect = (prevBoundingRect as any)[child.key];
        const lastRect = (boundingRect as any)[child.key];
        const newPosition = firstRect.top - lastRect.top;

        if (newPosition) {
          requestAnimationFrame(() => {
            childNode.style.transform = `translateY(${newPosition}px)`;
            childNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              childNode.style.transform = "";
              childNode.style.transition = "transform 600ms";
            });
          });
        }
      });
    }
  }, [boundingRect, prevBoundingRect, children]);

  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default StreamerList;
