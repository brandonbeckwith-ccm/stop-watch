import { ref, computed, watch } from "vue";
import { DateTime } from "luxon";
import { cities } from "../Data/cities";
import type { City } from "../Data/cities";

interface CityWithTime extends City {
  time: string;
  day: string;
}

const getUserTimezone = (): string => {
  return DateTime.now().zoneName;
};

const defaultTimezones: string[] = Array.from(new Set([getUserTimezone()]));

const loadUserClocks = (): string[] => {
  const saved = localStorage.getItem("userClocks");
  let loadedZones: string[] = [];
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (
        Array.isArray(parsed) &&
        parsed.every((z: unknown) => typeof z === "string")
      ) {
        loadedZones = parsed;
      }
    } catch {}
  }

  return Array.from(new Set([...defaultTimezones, ...loadedZones]));
};

const userTimezones = ref<string[]>(loadUserClocks());

watch(
  userTimezones,
  (zones: string[]) => {
    const toSave = Array.from(new Set([...defaultTimezones, ...zones]));
    localStorage.setItem("userClocks", JSON.stringify(toSave));
  },
  { deep: true }
);

const addClock = (timezone: string): void => {
  if (!userTimezones.value.includes(timezone)) {
    userTimezones.value.push(timezone);
  }
};

const removeClock = (timezone: string): void => {
  if (defaultTimezones.includes(timezone)) return;
  userTimezones.value = userTimezones.value.filter((z) => z !== timezone);
};

const getCityForTimezone = (timezone: string): City => {
  return (
    cities.find((city) => city.zone === timezone) || {
      name: timezone,
      zone: timezone,
    }
  );
};

const userClockCities = computed<City[]>(() =>
  userTimezones.value.map((zone) => getCityForTimezone(zone))
);

const userClocksWithTime = ref<CityWithTime[]>([]);

const updateClockTimes = (): void => {
  userClocksWithTime.value = userTimezones.value.map((zone) => {
    const city = getCityForTimezone(zone);
    return {
      ...city,
      time: DateTime.now().setZone(zone).toFormat("HH:mm:ss"),
      day: DateTime.now().setZone(zone).toFormat("ccc"),
    };
  });
};

if (typeof window !== "undefined") {
  updateClockTimes();
  setInterval(updateClockTimes, 1000);
}

export const useWorldclock = () => {
  return {
    cities,
    userTimezones,
    userClockCities,
    userClocksWithTime,
    addClock,
    removeClock,
    updateClockTimes,
    defaultTimezones,
  };
};
