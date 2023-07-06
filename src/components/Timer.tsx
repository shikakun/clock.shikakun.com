import { useEffect, useState } from 'react';
import styles from './Timer.module.scss';

type TimeCount = {
  minutes: number;
  seconds: number;
};

type TimerProps = {
  initialTime: TimeCount;
  onTimeChange: (time: TimeCount) => void;
};

const Timer = ({ initialTime, onTimeChange }: TimerProps) => {
  const [startTime, setStartTime] = useState(initialTime);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const updateTime = (time: TimeCount) => {
    setCurrentTime(time);
    onTimeChange(time);

    const totalStartSeconds = startTime.minutes * 60 + startTime.seconds;
    const totalCurrentSeconds = time.minutes * 60 + time.seconds;
    const timePercentage =
      100 - Math.round((totalCurrentSeconds / totalStartSeconds) * 100);
    document.body.dataset.timePercentage = isNaN(timePercentage)
      ? '100'
      : timePercentage.toString();
  };

  useEffect(() => {
    document.body.dataset.isTimeUp = isTimeUp ? 'true' : 'false';
    document.body.dataset.isCounting = isCounting ? 'true' : 'false';

    let interval: NodeJS.Timeout;
    if (isCounting) {
      interval = setInterval(() => {
        const newTime = { ...currentTime };
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else if (newTime.minutes > 0) {
          newTime.minutes--;
          newTime.seconds = 59;
        } else {
          setIsCounting(false);
          setIsTimeUp(true);
        }
        updateTime(newTime);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCounting, currentTime]);

  const handleStartStopClick = () => {
    setIsCounting(!isCounting);
    setIsTimeUp(false);
    if (!isCounting) {
      setStartTime(currentTime);
    }
  };

  const handlePlusClick = () => {
    updateTime({ minutes: currentTime.minutes + 1, seconds: 0 });
  };

  const handleMinusClick = () => {
    if (currentTime.minutes === 0 && currentTime.seconds === 0) return;
    if (currentTime.seconds > 0) {
      updateTime({ minutes: currentTime.minutes, seconds: 0 });
    } else {
      updateTime({ minutes: currentTime.minutes - 1, seconds: 0 });
    }
  };

  return (
    <div className={styles.timer}>
      <div className={styles.container}>
        <div className={styles.time}>
          <div className={styles.minutes}>
            {currentTime.minutes.toString().padStart(2, '0')}
          </div>
          <div className={styles.colon}></div>
          <div className={styles.seconds}>
            {currentTime.seconds.toString().padStart(2, '0')}
          </div>
        </div>
        <div className={styles.control}>
          <button
            className={styles.button}
            onClick={handleMinusClick}
            disabled={
              isCounting ||
              (currentTime.minutes === 0 && currentTime.seconds === 0)
            }
          >
            -
          </button>
          <button
            className={styles.button}
            onClick={handleStartStopClick}
            disabled={currentTime.minutes === 0 && currentTime.seconds === 0}
          >
            {isCounting ? 'Stop' : 'Start'}
          </button>
          <button
            className={styles.button}
            onClick={handlePlusClick}
            disabled={isCounting}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
