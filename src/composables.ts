import { ref, computed } from "vue";

export const useComposable = () => {
  const hour = ref(0);
  const min = ref(0);
  const sec = ref(0);
  const timer = ref<ReturnType<typeof setInterval> | null>(null);
  const isRunning = ref(false);

  // Computed for formatted display
  const formattedTime = computed(
    () =>
      `${String(hour.value).padStart(2, "0")} : ${String(min.value).padStart(
        2,
        "0"
      )} : ${String(sec.value).padStart(2, "0")}`
  );

  const time_laps = ref<string[]>([]);

  function laptime() {
    if (isRunning.value) {
      const new_time = `${String(hour.value).padStart(2, "0")} : ${String(
        min.value
      ).padStart(2, "0")} : ${String(sec.value).padStart(2, "0")}`;

      time_laps.value.push(new_time);
    }
  }

  const start = () => {
    if (isRunning.value) return; // Prevent multiple intervals

    isRunning.value = true;
    timer.value = setInterval(() => {
      sec.value++;
      if (sec.value >= 60) {
        sec.value = 0;
        min.value++;
      }
      if (min.value >= 60) {
        min.value = 0;
        hour.value++;
      }
    }, 200);
  };

  const pause = () => {
    if (timer.value !== null) {
      clearInterval(timer.value);
      timer.value = null;
      isRunning.value = false;
    }
  };

  const stop = () => {
    pause();
    time_laps.value = [];
    hour.value = 0;
    min.value = 0;
    sec.value = 0;
  };

  return {
    hour,
    min,
    sec,
    timer,
    isRunning,
    formattedTime,
    time_laps,
    laptime,
    start,
    pause,
    stop,
  };
};
