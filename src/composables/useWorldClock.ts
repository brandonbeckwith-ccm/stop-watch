import { ref, onMounted } from "vue";
import { useStorage, useNow } from "@vueuse/core";
import dayjs from "dayjs";
import { formatDateTime } from "../utils/formatter";

export const useWorldClock = () => {
  const now = useNow();
  const localTz = dayjs.tz.guess();

  const timezones = useStorage<string[]>("world-clocks", []);
  const newTimezone = ref<string>("");
  const errorMessage = ref<string>("");

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
    timezones,
    newTimezone,
    errorMessage,
    getTime,
    getCityName,
    isRemovable,
    addTimezone,
    removeTimezone,
  };
};
