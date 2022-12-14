import { useState, useEffect } from 'react';
import Board from './components/Board/Board.component';
import './App.css';

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(setSeconds, 1000, seconds - 1);
    }
  }, [seconds]);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares: squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    setSeconds(10);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const newHistory = history;
  const current = newHistory[stepNumber];
  const winner = calculateWinner(current.squares);
  let status = winner
    ? `Player ${winner} win the game`
    : `Next player ${xIsNext ? 'X' : 'O'}`;

  const moves = newHistory.map((step, move) => {
    const desc = move ? `Go to step #${move}` : 'Go to start game';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        <div>{seconds}</div>
      </div>
      
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;
