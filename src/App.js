import { useState, useEffect } from 'react';
import Board from './components/Board/Board.component';
import './App.css';

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [seconds, setSeconds] = useState(10);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  useEffect(() => {
    if (seconds > 0 && !isTimeRunning) {
      setIsTimeRunning()
    // console.log("useEffect", seconds)
      setTimeout(() => {
        console.log("setTimeout", seconds)
        setSeconds(seconds - 1)
      }, 1000);
    }
  }, [seconds]);



  const jumpToStep = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const getWinnerLabel = (squares) => {
    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];

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

  const handleBoardClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (getWinnerLabel(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    setSeconds(10);
  };

  const current = history[stepNumber];
  const winnerLabel = getWinnerLabel(current.squares);
  const status = winnerLabel
    ? `Player ${winnerLabel} win the game`
    : `Next player ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleBoardClick(i)} />
        <div>{seconds}</div>
      </div>

      <div className="game-info">
        <div>{status}</div>
        <ol>{history.map((step, move) => {
            return (
                <li key={move}>
                  <button onClick={() => jumpToStep(move)}>Go to step #{move}</button>
                </li>
            );
          })
        }
        </ol>
      </div>
    </div>
  );
};

export default App;
