import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import usePreviousValue from '../hooks/usePreviousValue';
import {getRandomNum} from '../utils/mixed';

interface AnimatedScoreProps {
  value: number;
  frequency?: number;
  interval?: number;
}

const Score = styled.span`
  text-align: right;
  font-weight: 600;
`;

const AnimatedScore: React.FC<AnimatedScoreProps> = ({value = 0, interval = 50, frequency = 5}) => {
  const [score, setScore] = useState(value);
  const prevValue = usePreviousValue(value);

  useEffect(() => {
    if (!prevValue) return;
    
    let count = frequency;
    const intervalId = setInterval(() => {
      setScore(count > 0 ? getRandomNum(value, prevValue) : value);
      count = count - 1;
    }, interval);

    return () => {
      clearInterval(intervalId);
    }
  }, [value]);

  return (
    <Score>{score.toLocaleString()}</Score>
  )
}

export default AnimatedScore;
