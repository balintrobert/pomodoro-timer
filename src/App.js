import { useEffect, useState, useRef } from 'react';

// Importing components
import Break from './components/Break';
import Session from './components/Session';
import Timeleft from './components/Timeleft';

function App() {
  const audioElement = useRef(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(60 * 5);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null);
  const [timeleft, setTimeleft] = useState(sessionLength);

  useEffect(() => {
    if (currentSessionType === 'Session') {
      setTimeleft(sessionLength);
    } else if (currentSessionType === 'Break') {
      setTimeleft(breakLength);
    }
  }, [sessionLength, breakLength]);

  useEffect(() => {
    if (timeleft === 0) {
      audioElement.current.play();
      if (currentSessionType === 'Session') {
        setCurrentSessionType('Break');
        setTimeleft(breakLength);
      } else if (currentSessionType === 'Break') {
        setCurrentSessionType('Session');
        setTimeleft(sessionLength);
      }
    }
  }, [breakLength, currentSessionType, sessionLength, timeleft]);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength > 0) setBreakLength(newBreakLength);
  };

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) setBreakLength(newBreakLength);
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0) setSessionLength(newSessionLength);
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) setSessionLength(newSessionLength);
  };

  const handleResetButtonClick = () => {
    audioElement.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType('Session');
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
    setTimeleft(60 * 25);
  };

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeleft((prevTimeleft) => prevTimeleft - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  return (
    <div className='app'>
      <div className='settings'>
        <Break
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        <Session
          sessionLength={sessionLength}
          decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
          incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
        />
      </div>
      <Timeleft
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeleft={timeleft}
        handleResetButtonClick={handleResetButtonClick}
      />
      <audio id='beep' ref={audioElement}>
        <source src='sounds/bell.mp3' type='audio/mpeg' />
      </audio>
    </div>
  );
}

export default App;
