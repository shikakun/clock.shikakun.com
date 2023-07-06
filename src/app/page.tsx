'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Timer, { TimeCount } from '../components/Timer';

const DEFAULT_MINUTES = 3;
const DEFAULT_SECONDS = 0;

const getTimeCount = (timeString: string | null): TimeCount => {
  if (timeString) {
    if (timeString.includes(':')) {
      const [min, sec] = timeString.split(':').map(Number);
      return { minutes: min, seconds: sec };
    } else {
      const totalSeconds = Number(timeString);
      return {
        minutes: Math.floor(totalSeconds / 60),
        seconds: totalSeconds % 60,
      };
    }
  }
  return { minutes: DEFAULT_MINUTES, seconds: DEFAULT_SECONDS };
};

const Home = () => {
  const searchParams = useSearchParams();
  const [timeCount, setTimeCount] = useState(
    getTimeCount(searchParams.get('time'))
  );

  useEffect(() => {
    document.title = `${timeCount.minutes
      .toString()
      .padStart(2, '0')}:${timeCount.seconds.toString().padStart(2, '0')}`;
  }, [timeCount]);

  const handleTimeChange = (newTimeCount: TimeCount) => {
    setTimeCount(newTimeCount);
  };

  return (
    <div>
      <Timer initialTime={timeCount} onTimeChange={handleTimeChange} />
    </div>
  );
};

export default Home;
