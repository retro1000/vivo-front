import { useState, useEffect } from 'react';

// Debounce function to limit the rate at which a function can fire
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const useDynamicMaxSnack = (notificationHeight, maxHeightPercentage = 0.7) => {
  const [maxSnack, setMaxSnack] = useState(calculateMaxSnack());

  useEffect(() => {
    const handleResize = debounce(() => {
      setMaxSnack(calculateMaxSnack());
    }, 100); // Adjust the debounce delay as needed

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [notificationHeight, maxHeightPercentage]);

  function calculateMaxSnack() {
    const screenHeight = window.innerHeight;
    const availableHeight = screenHeight * maxHeightPercentage;
    return Math.floor(availableHeight / notificationHeight);
  }

  return maxSnack;
};

export default useDynamicMaxSnack;
