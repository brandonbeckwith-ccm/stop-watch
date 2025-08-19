import { ref } from "vue";
import type { Lap } from "../types/stopWatch";

export const useStopwatch = () => {
  const startTime = ref<number>(0);
  const elapsed = ref<number>(0);
  const isRunning = ref<boolean>(false);
  const laps = ref<Lap[]>([]);
  const intervalId = ref<number | null>(null);

  const start = () => {
    if (!isRunning.value) {
      startTime.value = Date.now() - elapsed.value;
      intervalId.value = window.setInterval(() => {
        elapsed.value = Date.now() - (startTime.value || 0);
      }, 10);
    }
    isRunning.value = true;
  };

  const stop = () => {
    if (isRunning.value && intervalId.value !== null) {
      clearInterval(intervalId.value);
      isRunning.value = false;
      intervalId.value = null;
    }
  };

  const reset = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
    }
    laps.value = [];
    intervalId.value = null;
    startTime.value = 0;
    elapsed.value = 0;
    isRunning.value = false;
  };

  const lap = () => {
    if (isRunning.value) {
      const lapNumber=laps.value.length+1;
      laps.value.push({
        id: lapNumber,
        timeStamp: formatTime(elapsed.value),
      });
    }
  };

  function formatTime(elaspedValue: number): string {
    const minutes = Math.floor(elaspedValue / 60000);
    const seconds = Math.floor((elaspedValue % 60000) / 1000);
    const milliseconds = Math.floor((elaspedValue % 1000) / 10);

    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    const msms = milliseconds.toString().padStart(2, "0");

    return `${mm}:${ss}:${msms}`;
  }

  return {
    start,
    laps,
    elapsed,
    stop,
    reset,
    lap,
    formatTime,
    isRunning
  };
};
