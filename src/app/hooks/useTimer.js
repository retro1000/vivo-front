import { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime, onTimeUpdate, isPaused) => {
  // Helper function to convert date-time to timer object
  const convertToTimerObject = (time) => {
    if (typeof time === 'object' && time.days !== undefined && time.hours !== undefined && time.minutes !== undefined && time.seconds !== undefined) {
      return {
        days: Math.max(0, Math.floor(time.days)),
        hours: Math.max(0, Math.floor(time.hours)),
        minutes: Math.max(0, Math.floor(time.minutes)),
        seconds: Math.max(0, Math.floor(time.seconds)),
      };
    }

    const now = new Date();
    const endTime = new Date(time); // Handles Date, ISO string, or timestamp
    if (isNaN(endTime.getTime())) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Invalid date
    }

    const diff = endTime - now;
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Past date
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timer, setTimer] = useState(convertToTimerObject(initialTime));
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Update onTimeUpdateRef when onTimeUpdate changes
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Timer expired
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Debounce onTimeUpdate to reduce frequent calls
  useEffect(() => {

    if(!onTimeUpdateRef || !onTimeUpdateRef.current) return;

    const handler = setTimeout(() => {
      onTimeUpdateRef.current(timer);
    }, 5000); // Call every 5 seconds
    return () => clearTimeout(handler);
  }, [timer]);

  return timer;
};

export { useTimer };