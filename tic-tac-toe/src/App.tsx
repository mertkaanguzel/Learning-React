import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ isNext, squares, onPlay }) {
  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = isNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares); // winner statei olusturulabilir fonksiyonu bi kere calistirmak icin
  let status;
  
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = 'Next player: ' + (isNext ? 'X' : 'O');
  }


  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([new Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const isNext = currentMove % 2 === 0;
  const currentSquares= history[currentMove];

  function handlePLay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); //currentMove + 1 da olur mu
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, moveIndex) => {
    const description = moveIndex > 0 ? `Go to move #${moveIndex}` : 'Go to starting point';

    return (
      <li key={moveIndex}>
        <button onClick={() => jumpTo(moveIndex)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board isNext={isNext} squares={currentSquares} onPlay={handlePLay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
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
