import React from 'react';
import { useParams } from 'react-router-dom';

export const Game = () => {
  const { gameId } = useParams();

  return (
    <div>Game {gameId}</div>
  )
}

export default Game;
