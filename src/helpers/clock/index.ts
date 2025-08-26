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
    laps,
  };
}

export function useWorldClock() {
  const selectedTimeZone = ref("");
  const timeZones = [
    {
      label: "Local Time",
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    { label: "UTC", value: "UTC" },
    { label: "New York", value: "America/New_York" },
    { label: "Los Angeles", value: "America/Los_Angeles" },
    { label: "Chicago", value: "America/Chicago" },
    { label: "India", value: "Asia/Kolkata" },
  ];

  const addClock = () => {
    if (!selectedTimeZone.value) return;
    const index = clocks.value.findIndex(
      (item) => item.timezone == selectedTimeZone.value
    );
    if (index == -1) {
      const itemToAdd = timeZones.find(
        (item) => item.value == selectedTimeZone.value
      );
      if (itemToAdd) {
        clocks.value.push({
          id: Date.now(),
          timezone: itemToAdd?.value,
          label: itemToAdd?.label,
        });
        selectedTimeZone.value = "";
        saveClocks();
      }
    }
  };
  const removeClock = (idToRemove: number) => {
    clocks.value = clocks.value.filter((item) => {
      return item.id != idToRemove;
    });
    saveClocks();
  };

  const clocks = ref([
    { id: 1, timezone: "local", label: "Local Time" },
    { id: 2, timezone: "America/New_York", label: "New York" },
  ]);

  const saveClocks = () => {
    localStorage.setItem("clocks", JSON.stringify(clocks.value));
  };
  const getClocks = () => {
    const storedClocks = localStorage.getItem("clocks");
    clocks.value = storedClocks
      ? JSON.parse(storedClocks)
      : [
          { id: 1, timezone: "local", label: "Local Time" },
          { id: 2, timezone: "America/New_York", label: "New York" },
          { id: 3, timezone: "Asia/Kolkata", label: "India" },
        ];
  };
  return {
    timeZones,
    selectedTimeZone,
    addClock,
    removeClock,
    getClocks,
    clocks,
  };
}
