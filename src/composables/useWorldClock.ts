import { ref } from "vue";

export const useWorldClock = () => {
  const currentZone = ref("");

  const clockList = ref([
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

  const storeClocks = () => {
    localStorage.setItem("user_clocks", JSON.stringify(clockList.value));
    console.debug("Clocks stored successfully");
  };

  const loadClocks = () => {
    const data = localStorage.getItem("user_clocks");
    if (data) {
      try {
        clockList.value = JSON.parse(data);
      } catch (err) {
        console.warn("Corrupted saved data, using defaults.");
      }
    }
  };

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
      storeClocks();
    }
  };

  const deleteClock = (id: number) => {
    clockList.value = clockList.value.filter((c) => c.id !== id);
    storeClocks();
  };

  return {
    currentZone,
    clockList,
    availableZones,
    storeClocks,
    loadClocks,
    insertClock,
    deleteClock,
  };
};
