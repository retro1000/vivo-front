import React, { useState, useEffect, useRef } from 'react';

const useTimer = (initialTime, onTimeUpdate, isPaused) => {
    const [timer, setTimer] = useState(initialTime);
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
          return prev;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, [isPaused]);
  
    // Debounce onTimeUpdate to reduce frequent calls
    useEffect(() => {
      const handler = setTimeout(() => {
        onTimeUpdateRef.current(timer);
      }, 5000); // Call every 5 seconds
      return () => clearTimeout(handler);
    }, [timer]);
  
    return timer;
  };

  export {useTimer}