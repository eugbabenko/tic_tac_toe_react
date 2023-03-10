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

let timer = null;
let win = false;

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    if (seconds > 0 && !win) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds]);


  const startTheGame = () => {
    win = false;
    setSeconds(10);
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

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
      } else if (seconds === 0) {
        return `${xIsNext ? 'O' : 'X'}`;
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
  

  const getStatus = (winnerLabel) => {
    const allSquaresFill = current.squares.every(square => square !== null);
    if (winnerLabel) {
      win = true;
      return `Player ${winnerLabel} win the game`
    } else if (allSquaresFill) {
      win = true;
      return 'Draw'
    } else {
      return `Next player ${xIsNext ? 'X' : 'O'}`;
    }
  } 

  let status = getStatus(winnerLabel)

  return (
    <div>
    <h1 className='heading'>Tic-Tac-Toe</h1>
    <h2 className='status'>{status}</h2>
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleBoardClick(i)} />
        <button className='button' onClick={() => startTheGame()}>Start new game</button>
        <div className='timer'>{seconds}</div>
      </div>
      <div className="game-info">
        <ol>
          {history.map((step, move) => {
            return (
              <li key={move}>
                <button className='button' onClick={() => jumpToStep(move)}>
                  Go to step #{move}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
    </div>
  );
};

export default App;
