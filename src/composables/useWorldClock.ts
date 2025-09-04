import { ref } from "vue";
import { useStorage } from "@vueuse/core";

export const useWorldClock = () => {
  const currentZone = ref("");

  const clockList = useStorage("user_clocks", [
    { id: 1, zone: "local", title: "Local Time" },
    { id: 2, zone: "America/New_York", title: "New York" },
    { id: 3, zone: "Asia/Kolkata", title: "India" },
  ]);

  const availableZones = [
    {
      title: "Local Time",
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    { title: "UTC", value: "UTC" },
    { title: "New York", value: "America/New_York" },
    { title: "Los Angeles", value: "America/Los_Angeles" },
    { title: "Chicago", value: "America/Chicago" },
    { title: "India", value: "Asia/Kolkata" },
  ];

  const insertClock = () => {
    if (!currentZone.value) return;

    const exists = clockList.value.some((c) => c.zone === currentZone.value);
    if (exists) return;

    const zoneItem = availableZones.find((z) => z.value === currentZone.value);
    if (zoneItem) {
      clockList.value.push({
        id: Date.now(),
        zone: zoneItem.value,
        title: zoneItem.title,
      });
      currentZone.value = "";
    }
  };

  const deleteClock = (id: number) => {
    clockList.value = clockList.value.filter((c) => c.id !== id);
  };

  return {
    currentZone,
    clockList,
    availableZones,
    insertClock,
    deleteClock,
  };
};
