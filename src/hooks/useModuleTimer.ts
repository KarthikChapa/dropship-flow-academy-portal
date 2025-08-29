import { useState, useEffect } from 'react';

interface ModuleStartTimes {
  [moduleId: string]: number;
}

export const useModuleTimer = () => {
  const [moduleStartTimes, setModuleStartTimes] = useState<ModuleStartTimes>({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startModule = (moduleId: string) => {
    setModuleStartTimes(prev => {
      // Only start if not already started
      if (prev[moduleId]) return prev;
      
      return {
        ...prev,
        [moduleId]: Date.now()
      };
    });
  };

  const getElapsedTime = (moduleId: string): string => {
    const startTime = moduleStartTimes[moduleId];
    if (!startTime) return '';

    const elapsed = Math.floor((currentTime - startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const isModuleStarted = (moduleId: string): boolean => {
    return !!moduleStartTimes[moduleId];
  };

  return {
    startModule,
    getElapsedTime,
    isModuleStarted
  };
};