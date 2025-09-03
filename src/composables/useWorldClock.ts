import { ref, onMounted, computed } from "vue";
import { useStorage, useNow } from "@vueuse/core";
import dayjs from "dayjs";
import { formatDateTime } from "../utils/formatter";
import { useDebouncedRef, useDebouncedValidatedRef } from "./useCustomRef";

export const useWorldClock = () => {
  const now = useNow();
  const localTz = dayjs.tz.guess();

  const timezones = useStorage<string[]>("world-clocks", []);
  const errorMessage = ref<string>("");

  const newTimezone = useDebouncedValidatedRef<string>("", 500, 5, (msg) => {
    errorMessage.value = msg;
  });

  const searchQuery = useDebouncedRef<string>("", 500);

  const filteredTimezones = computed(() => {
    if (!searchQuery.value)
      return timezones.value.filter((t) => typeof t === "string");
    return timezones.value.filter(
      (tz) =>
        typeof tz === "string" &&
        getCityName(tz).toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const setDefaultTimezones = () => {
    if (timezones.value.length > 0) return;

    const defaults = [localTz];
    if (localTz.startsWith("America")) {
      defaults.push("Asia/Kolkata");
    } else if (localTz === "Asia/Kolkata") {
      defaults.push("America/New_York");
    } else {
      defaults.push("America/New_York");
    }
    timezones.value = defaults;
  };

  const getTime = (tz: string) => formatDateTime(now.value, tz);

  const getCityName = (tz: string) => {
    if (typeof tz !== "string") return "";
    const parts = tz.split("/");
    return parts[1]?.replace(/_/g, " ") || tz;
  };

  const isRemovable = (tz: string) => {
    const defaultPairs = [
      [localTz, "Asia/Kolkata"],
      [localTz, "America/New_York"],
    ];
    return !defaultPairs.some(([a, b]) => tz === a || tz === b);
  };

  const addTimezone = () => {
    errorMessage.value = "";
    if (!newTimezone.value) {
      errorMessage.value = "Please enter a timezone.";
      return;
    }
    try {
      const test = dayjs().tz(newTimezone.value);
      if (!test.isValid()) throw new Error();

      if (!timezones.value.includes(newTimezone.value)) {
        timezones.value.push(newTimezone.value);
        newTimezone.value = "";
      } else {
        errorMessage.value = "Timezone already added.";
      }
    } catch {
      errorMessage.value = 'Invalid timezone. Use format like "Asia/Tokyo".';
    }
  };

  const removeTimezone = (index: number) => {
    if (index >= 0) {
      timezones.value.splice(index, 1);
    }
  };

  onMounted(setDefaultTimezones);

  return {
    filteredTimezones,
    searchQuery,
    newTimezone,
    errorMessage,
    getTime,
    getCityName,
    isRemovable,
    addTimezone,
    removeTimezone,
  };
};
