import { useState, useEffect, useRef } from "react";
import TimeInput from "./TimeInput";
import TimeControls from "./TimeControl";
import TimeLeft from "./TimeLeft";

const DEFAULT = {
  breakTime: 5,
  workTime: 25,
};

const Pomodoro = () => {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [breakTime, setBreakTime] = useState(DEFAULT.breakTime);
  const [workTime, setWorkTime] = useState(DEFAULT.workTime);
  const [duration, setDuration] = useState(DEFAULT.workTime * 60);
  const [process, setProcess] = useState("Session");
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const isRun = intervalId !== null;

  useEffect(() => {
    if (duration < 0) {
      audioElement?.current?.play();
      if (process === "Session") {
        setProcess("Break");
        setDuration(breakTime * 60);
      } else {
        setProcess("Session");
        setDuration(workTime * 60);
      }
    }
  }, [duration, process, workTime, breakTime]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const incrementWork = () => {
    const temp = workTime <= 59 ? workTime + 1 : 60;
    setWorkTime(temp);
    setDuration(temp * 60);
  };
  const incrementBreak = () => {
    const temp = breakTime <= 59 ? breakTime + 1 : 60;
    setBreakTime(temp);
  };
  const decrementWork = () => {
    const temp = workTime - 1 || 1;
    setWorkTime(temp);
    setDuration(temp * 60);
  };
  const decrementBreak = () => {
    const temp = breakTime - 1 || 1;
    setBreakTime(temp);
  };

  const handleStartPauseTimer = () => {
    if (isRun) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setDuration((preDuration) => preDuration - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetTimer = () => {
    audioElement?.current?.load();
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(null);
    setProcess("Session");
    setWorkTime(DEFAULT.workTime);
    setBreakTime(DEFAULT.breakTime);
    setDuration(DEFAULT.workTime * 60);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.keyCode === 80) {
      alert("Play");
    } else if (e.keyCode === 82) {
      alert("Reset");
    } else {
      return;
    }
  };

  return (
    <div className="App">
      <TimeLeft process={process} duration={duration} />
      <TimeControls
        isRun={isRun}
        startPauseTimer={handleStartPauseTimer}
        resetTimer={handleResetTimer}
      />
      <TimeInput
        label="work"
        value={workTime}
        increment={incrementWork}
        decrement={decrementWork}
      />
      <TimeInput
        label="break"
        value={breakTime}
        increment={incrementBreak}
        decrement={decrementBreak}
      />
      <audio ref={audioElement}>
        <source
          src="https://www.peter-weinberg.com/files/1014/8073/6015/BeepSound.wav"
          type="audio/wav"
        />
      </audio>
    </div>
  );
};

export default Pomodoro;
