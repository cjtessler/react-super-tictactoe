import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function SuperBoard({ board, activeBoard, squares, handleClick }) {
  return (
    <div className={`game-board ${board == activeBoard ? "active" : ""}`}>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(board, 0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(board, 1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(board, 2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(board, 3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(board, 4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(board, 5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(board, 6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(board, 7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(board, 8)} />
      </div>
    </div>
  )

}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null).map(x => Array(9).fill(null)));
  const [activeBoard, setActiveBoard] = useState(4);

  function handleClick(b, i) {
    console.log(`clicked ${(b, i)}`);

    if (b != activeBoard) {
      return;
    }

    if (calculateWinner(squares[b]) || squares[b][i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[b][i] = 'X';
    } else {
      nextSquares[b][i] = 'O';
    }
    setSquares(nextSquares);
    setActiveBoard(i);
    setXIsNext(!xIsNext);
  }


  // Determine winner
  const winner = calculateWinner(squares[0]);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  console.log(squares[0]);

  return (
    <>
      <div className="status">{status}</div>

      <div className="super-game-boards">
        <SuperBoard board={0} activeBoard={activeBoard} squares={squares[0]} handleClick={handleClick} />
        <SuperBoard board={1} activeBoard={activeBoard} squares={squares[1]} handleClick={handleClick} />
        <SuperBoard board={2} activeBoard={activeBoard} squares={squares[2]} handleClick={handleClick} />
        <SuperBoard board={3} activeBoard={activeBoard} squares={squares[3]} handleClick={handleClick} />
        <SuperBoard board={4} activeBoard={activeBoard} squares={squares[4]} handleClick={handleClick} />
        <SuperBoard board={5} activeBoard={activeBoard} squares={squares[5]} handleClick={handleClick} />
        <SuperBoard board={6} activeBoard={activeBoard} squares={squares[6]} handleClick={handleClick} />
        <SuperBoard board={7} activeBoard={activeBoard} squares={squares[7]} handleClick={handleClick} />
        <SuperBoard board={8} activeBoard={activeBoard} squares={squares[8]} handleClick={handleClick} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
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
}
