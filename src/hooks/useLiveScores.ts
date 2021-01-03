import {useState, useEffect} from 'react';

import {getRandomNum} from '../utils/mixed';
import IStreamer from '../entities/IStreamer';

function useLiveScores(defaultScores: IStreamer[]) {
  const [scores, setScores] = useState(defaultScores);

  function updateScore() {
    setScores(newScores =>
      newScores
        .map(item => ({...item, score: item.score + getRandomNum(0, 2000)}))
        .sort((a, b) => b.score - a.score)
    );
  }

  useEffect(() => {
    const intervalId = setInterval(updateScore, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return scores;
}

export default useLiveScores;
