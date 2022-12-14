import { useState, useEffect } from 'react';
import React from 'react';

const Timer = (props) => {
  const [seconds, setSeconds] = useState(50);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 50, seconds - 1);
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);

  return (
    <div>
      {seconds ? (
        <React.Fragment>
          <button onClick={() => setTimerActive(!timerActive)}>
            {timerActive ? 'stop' : 'start'}
          </button>
          <div>{seconds}</div>
        </React.Fragment>
      ) : (
        <button onClick={() => setSeconds(50)}>Again</button>
      )}
    </div>
  );
};

export default Timer;
