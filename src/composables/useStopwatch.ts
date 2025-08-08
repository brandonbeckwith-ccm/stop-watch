import { reactive, ref } from "vue";

export const useStopwatch = () => {
  const intervalId = ref<number | undefined>();
  const elapsedTime = ref<number>(0);
  const laps = reactive<number[]>([]);

  const startStopWatch = () => {
    if (intervalId.value) return;
    intervalId.value = setInterval(() => {
      elapsedTime.value++;
    }, 10);
  };

  const stopStopWatch = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = undefined;
    }
  };

  const resetStopWatch = () => {
    stopStopWatch();
    elapsedTime.value = 0;
    laps.splice(0, laps.length);
  };

  const addLap = () => {
    laps.unshift(elapsedTime.value);
  };

  return {
    elapsedTime,
    laps,
    startStopWatch,
    stopStopWatch,
    resetStopWatch,
    addLap,
  };
};
