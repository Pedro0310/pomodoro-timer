import { useState } from "react";
import { createContext } from "react";

export const SettingContext = createContext();

const SettingsContextProvider = (props) => {
  const [pomodoro, setPomodoro] = useState(0);
  const [executing, setExecuting] = useState({});
  const [startAnimate, setStartAnimate] = useState(false);

  function startTimer() {
    setStartAnimate(true);
  }

  function stopTimer() {
    setStartAnimate(false);
  }

  function pauseTimer() {
    setStartAnimate(false);
  }

  const SettingBtn = () => {
    setExecuting({});
    setPomodoro(0);
  };

  function setCurrentTimer(active_state) {
    updateExecute({
      ...executing,
      active: active_state,
    });
    setTimerTime(executing);
  }

  const updateExecute = (updatedSettings) => {
    setExecuting(updatedSettings);
    setTimerTime(updatedSettings);
  };

  const setTimerTime = (evaluate) => {
    switch (evaluate.active) {
      case "work":
        setPomodoro(evaluate.work);
        break;

      case "short":
        setPomodoro(evaluate.short);
        break;

      case "long":
        setPomodoro(evaluate.long);
        break;

      default:
        setPomodoro(0);
        break;
    }
  };

  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <SettingContext.Provider value={{ stopTimer, 
    updateExecute,
    pomodoro,
    executing,
    startAnimate,
    startTimer,
    pauseTimer,
    stopTimer,
    SettingBtn,
    setCurrentTimer,
    updateExecute,
    children
    }}>
      {props.children}
    </SettingContext.Provider>
  );
};

export default SettingsContextProvider;
