import { onMounted, onUnmounted, ref, watch } from "vue";
import type { Clock } from "../types/clock";

export const useWorldClock = () => {
  const saved = localStorage.getItem("worldclocks");
  const clocks = ref<Clock[]>(saved ? JSON.parse(saved) : []);
  const times = ref<Record<string, string>>({});
  let interval=0

  if (!saved) {
    clocks.value = [
      {
        id: Date.now().toString() + "-local",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        label: "Local Time",
      },
      {
        id: Date.now().toString() + "-est",
        timeZone: "America/New_York",
        label: "EST",
      },
      {
        id: Date.now().toString() + "-ist",
        timeZone: "Asia/Kolkata",
        label: "My TimeZone",
      },
    ];
  }

  const addClock = (timeZone: string, label?: string) => {
    return clocks.value.push({
      id: Date.now().toString(),
      timeZone: timeZone,
      label: label || "",
    });
  };

  const removeClock = (id: string) => {
    return (clocks.value = clocks.value.filter((cl) => cl.id !== id));
  };

  const timezoneOptions = [
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Pacific/Auckland",
  "Africa/Johannesburg",
  "Africa/Nairobi",
];

  const updatedTime = () => {
    clocks.value.forEach((clock) => {
      times.value[clock.id] = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: clock.timeZone,
      }).format(new Date());
    });
  };

  onMounted(()=>{
    updatedTime(),
    interval=window.setInterval(updatedTime,1000)
  })

  onUnmounted(()=>{
    clearInterval(interval)
  })

  watch(
    clocks,
    (newVal) => {
      localStorage.setItem("clocks", JSON.stringify(newVal));
    },
    { deep: true }
  );

  return {
    clocks,
    addClock,
    removeClock,
    updatedTime,
    times
  };
};
