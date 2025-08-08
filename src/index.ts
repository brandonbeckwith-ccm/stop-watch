import { ref, computed } from "vue";

export function useStopwatch() {
  const minutes = ref(0);
  const seconds = ref(0);
  const milliseconds = ref(0);
  const isRunning = ref(false);
  const laps = ref<string[]>([]);


  let id: number | null = null;

  const formattedTime = computed(() => {
    return (
      minutes.value.toString().padStart(2, "0") +
      ":" +
      seconds.value.toString().padStart(2, "0") +
      ":" +
      milliseconds.value.toString().padStart(2, "0")
    );
  });

  const start = () => {
    if (isRunning.value) return;
    isRunning.value = true;

    id = setInterval(() => {
      milliseconds.value++;
      if (milliseconds.value >= 100) {
        milliseconds.value = 0;
        seconds.value++;
      }
      if (seconds.value >= 60) {
        seconds.value = 0;
        minutes.value++;
      }
    }, 10);
  };

  const stop = () => {
    if (id !== null) {
      clearInterval(id);
      id = null;
    }
    isRunning.value = false;
  };

  const reset = () => {
    minutes.value = 0;
    seconds.value = 0;
    milliseconds.value = 0;
    laps.value = [];
  };

  const lap = () => {
  if (isRunning.value) {
    laps.value.push(formattedTime.value); 
  }
};

  return {
    formattedTime,
    isRunning,
    start,
    stop,
    reset,
    lap,
    laps
  };
}
