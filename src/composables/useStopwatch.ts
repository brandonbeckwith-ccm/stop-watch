import { ref, computed } from "vue";

const elapsedTime = ref(0);
const intervalId = ref<number | null>(null);
const laps = ref<number[]>([]);

const formatWithLeadingZeros = (num: number, length = 2): string =>
  String(num).padStart(length, "0");

const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);

  return `${formatWithLeadingZeros(minutes)}:${formatWithLeadingZeros(
    seconds
  )}:${formatWithLeadingZeros(milliseconds)}`;
};

const formattedTime = computed(() => formatTime(elapsedTime.value));

const start = (): void => {
  if (intervalId.value !== null) return;

  intervalId.value = setInterval(() => {
    elapsedTime.value += 10;
  }, 10);
};

const stop = (): void => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

const reset = (): void => {
  stop();
  elapsedTime.value = 0;
  laps.value = [];
};

const lap = (): void => {
  if (intervalId.value !== null) {
    laps.value.unshift(elapsedTime.value);
    console.log("Lap recorded:", elapsedTime.value);
  }
};

export function useStopwatch() {
  return {
    elapsedTime,
    formattedTime,
    laps,
    formatTime,
    start,
    stop,
    reset,
    lap,
    intervalId,
  };
}
