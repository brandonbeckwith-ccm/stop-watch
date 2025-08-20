

import { ref, computed, watch } from 'vue'
export const tabs = [
    {
        label: 'Stop Watch',
        value: 'stopWatch',
        icon: 'fal fa-stopwatch'
    },
    {
        label: 'WorldClock',
        value: 'worldClock',
        icon: 'fa-light fa-clock'
    },
    {
        label: 'Custom Ref',
        value: 'customRef',
        icon: 'fa-light fa-code'
    }
]
export const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone

export const useStopWatch = () => {
    const time = ref(0)
    const running = ref(false)
    const laps = ref<number[]>([])
    let interval: number | null = null
    const showModal = ref(false)
    const start = () => {
        if (running.value) return
        running.value = true
        const startTime = Date.now() - time.value
        interval = window.setInterval(() => {
            time.value = Date.now() - startTime
        }, 10)
    }

    const stop = () => {
        if (interval) clearInterval(interval)
        running.value = false
    }

    const reset = () => {
        stop()
        time.value = 0
        laps.value = []
        showModal.value = false
    }

    const lap = () => {
        if (running.value) {
            laps.value.push(time.value)

        }
    }

    const formatTime = (ms: number): string => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const milliseconds = Math.floor((ms % 1000) / 10)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`
    }
    const getTotal = (lap: number[]): string => {
        let temp = 0;

        lap.forEach((item) => temp += item);
        return formatTime(temp);
    };

    const timeDisplay = computed(() => formatTime(time.value))
    watch(showModal, () => {
        if (showModal.value) {
            stop()
        }
    })


    return { timeDisplay, start, reset, lap, stop, formatTime, laps, getTotal, showModal, tabs }
}

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