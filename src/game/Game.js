import React, { useState } from "react";
import "./game.css";

const getWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const initialState = {
    squares: Array(9).fill(null),
    isNext: true,
    onClick: (value) => handleClick(value),
    winner: null,
  };
  const [state, setState] = useState(initialState);

  const handleClick = (value) => {
    setState((state) => {
      if (state.squares[value]) return state;

      const squares = state.squares.slice();
      squares[value] = state.isNext ? "X" : "O";
      const winner = getWinner(squares);
      return {
        ...state,
        squares: squares,
        isNext: !state.isNext,
        winner: winner,
      };
    });
  };

  const restart = () => {
    setState(initialState);
  };

  return (
    <>
      <div className="game">
        {!state.winner && <div>Next player: {state.isNext ? "X" : "O"}</div>}
        {state.winner && (
          <div>
            Player {state.winner} won!{" "}
            <div>
              <button onClick={() => restart()}>restart</button>
            </div>
          </div>
        )}
        <Board {...state}></Board>
      </div>
    </>
  );
};

const Board = (state) => {
  return (
    <div className="board">
      <Square value={0} state={state}></Square>
      <Square value={1} state={state}></Square>
      <Square value={2} state={state}></Square>
      <Square value={3} state={state}></Square>
      <Square value={4} state={state}></Square>
      <Square value={5} state={state}></Square>
      <Square value={6} state={state}></Square>
      <Square value={7} state={state}></Square>
      <Square value={8} state={state}></Square>
    </div>
  );
};

const Square = ({ value, state }) => {
  return (
    <div className="square" onClick={() => state.onClick(value)}>
      {state.squares[value]}
    </div>
  );
};

export default Game;
