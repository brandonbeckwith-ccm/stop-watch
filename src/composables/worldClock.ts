import { ref } from "vue";

export const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone


export const useWorldClock = () => {

    const selectedTimeZone = ref("");
    const clocks = ref([
        { id: 1, timezone: "local", label: "Local Time" },
        { id: 2, timezone: "America/New_York", label: "New York" },
        { id: 3, timezone: "Asia/Kolkata", label: "India" },
    ]);

    const saveClocks = () => {
        localStorage.setItem("clocks", JSON.stringify(clocks.value));
        console.log('saved in local');
    };
    const getClocks = () => {
        console.log('Got from local');
        const storedClocks = localStorage.getItem("clocks");
        clocks.value = storedClocks
            ? JSON.parse(storedClocks)
            : [
                { id: 1, timezone: "local", label: "Local Time" },
                { id: 2, timezone: "America/New_York", label: "New York" },
                { id: 3, timezone: "Asia/Kolkata", label: "India" },
            ];
        console.log(clocks.value);
    };

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
                console.log(clocks.value, "clocks");
                saveClocks();
            }
        }
    };
    const removeClock = (idToRemove: number) => {
        console.log(idToRemove);
        clocks.value = clocks.value.filter((item) => {
            return item.id != idToRemove;
        });
        console.log(clocks.value, "clocks");
        saveClocks()
    };
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

    return { selectedTimeZone, getClocks, saveClocks, addClock, timeZones, removeClock, clocks }
}