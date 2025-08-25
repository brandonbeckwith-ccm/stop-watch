import { ref, computed, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export interface CityZone {
  name: string;
  zone: string;
}

interface CityWithTime extends CityZone {
  time: string;
  day: string;
}

const getUserTimezone = (): string => dayjs.tz.guess();

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

const getCityForTimezone = (timezone: string): CityZone => {
  const last = timezone.split("/").pop() || timezone;
  const name = last.replace(/_/g, " ");
  return { name, zone: timezone };
};

const userClockCities = computed<CityZone[]>(() =>
  userTimezones.value.map((zone) => getCityForTimezone(zone))
);

const userClocksWithTime = ref<CityWithTime[]>([]);

const updateClockTimes = (): void => {
  userClocksWithTime.value = userTimezones.value.map((zone) => {
    const city = getCityForTimezone(zone);
    return {
      ...city,
      time: dayjs().tz(zone).format("HH:mm:ss"),
      day: dayjs().tz(zone).format("ddd"),
    };
  });
};

const cities = ref<CityZone[]>([]);
const isLoadingCities = ref<boolean>(false);
const citiesError = ref<string | null>(null);

const getSupportedTimezones = (): string[] => {
  try {
    const maybe = (
      Intl as unknown as { supportedValuesOf?: (input: string) => unknown }
    ).supportedValuesOf;
    const result = typeof maybe === "function" ? maybe("timeZone") : [];
    return Array.isArray(result) ? (result as string[]) : [];
  } catch {
    return [];
  }
};

const populateCitiesFromIntl = (): void => {
  try {
    isLoadingCities.value = true;
    citiesError.value = null;
    const zones = getSupportedTimezones();
    if (zones.length === 0) {
      const fallback = getUserTimezone();
      cities.value = [getCityForTimezone(fallback)];
      return;
    }
    cities.value = zones.map((zone) => getCityForTimezone(zone));
  } catch (e: unknown) {
    citiesError.value = e instanceof Error ? e.message : "Unknown error";
    const fallback = getUserTimezone();
    cities.value = [getCityForTimezone(fallback)];
  } finally {
    isLoadingCities.value = false;
  }
};

if (typeof window !== "undefined") {
  populateCitiesFromIntl();
  updateClockTimes();
  setInterval(updateClockTimes, 1000);
}

export const useWorldclock = () => {
  return {
    cities,
    isLoadingCities,
    citiesError,
    populateCitiesFromIntl,
    userTimezones,
    userClockCities,
    userClocksWithTime,
    addClock,
    removeClock,
    updateClockTimes,
    defaultTimezones,
  };
};
