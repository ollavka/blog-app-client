import { useState, useEffect } from 'react';

export const useCountdown = (seconds: number, onEnd: () => any) => {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    function tick() {
      setRemaining(prev => prev - 1);
    }

    const countdown = setInterval(tick, 1000);

    if (remaining === 0) {
      clearInterval(countdown);
      onEnd();
    }

    return () => clearInterval(countdown);
  }, [remaining]);

  return remaining;
};