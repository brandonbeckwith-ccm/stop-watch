import { computed, ref, onUnmounted } from "vue";

export const useStopwatch = () => {
  const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
  const elapsedTime = ref<number>(0);
  const laps = ref<number[]>([]);
  const isStarted = ref<boolean>(false);

  const isResetDisabled = computed(() => {
    return elapsedTime.value === 0 && laps.value.length === 0;
  });

  const startStopWatch = () => {
    if (intervalId.value) return;
    intervalId.value = setInterval(() => {
      elapsedTime.value++;
    }, 10);
  };

  const stopStopWatch = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };

  const resetStopWatch = () => {
    stopStopWatch();
    elapsedTime.value = 0;
    laps.value.splice(0);
  };

  const addLap = () => {
    laps.value.unshift(elapsedTime.value);
  };

  const triggerHandler = () => {
    if (isStarted.value) {
      stopStopWatch();
      isStarted.value = false;
    } else {
      startStopWatch();
      isStarted.value = true;
    }
  };

  const resetHandler = () => {
    resetStopWatch();
    isStarted.value = false;
  };

  onUnmounted(() => {
    stopStopWatch();
  });

  return {
    elapsedTime,
    laps,
    isResetDisabled,
    isStarted,
    addLap,
    triggerHandler,
    resetHandler,
  };
};
