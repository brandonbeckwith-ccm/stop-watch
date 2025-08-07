import { ref, computed } from "vue";

export function useStopwatch() {
  const startTime = ref(0);
  const elapsed = ref(0);
  const running = ref(false);
  const intervalId = ref();
  const laps = ref<number[]>([]);

  const start = () => {
    if (!running.value) {
      running.value = true;
      startTime.value = Date.now() - elapsed.value;

      intervalId.value = setInterval(() => {
        elapsed.value = Date.now() - (startTime.value ?? 0);
      }, 10);
    }
  };

  const stop = () => {
    if (running.value) {
      running.value = false;
      clearInterval(intervalId.value!);
      intervalId.value = 0;
    }
  };

  const reset = () => {
    stop();
    elapsed.value = 0;
    laps.value = [];
  };

  const lap = () => {
    if (running.value) {
      laps.value.push(elapsed.value);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}:${String(milliseconds).padStart(2, "0")}`;
  };

  const formattedTime = computed(() => formatTime(elapsed.value));

  const formattedLaps = computed(() => laps.value.map(formatTime));

  return {
    start,
    stop,
    reset,
    lap,
    formattedTime,
    formattedLaps,
    running,
  };
}
