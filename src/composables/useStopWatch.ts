import { computed, onMounted, onUnmounted, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// ------ Stopwatch -------
export const useStopWatchComposable = () => {
    const isRunning = ref(false);
    const elapsedTime = ref(0);
    const intervalId = ref<number>(0);
    const laps = ref<number[]>([]);

    const formattedTime = computed(() => formatTime(elapsedTime.value));

    const isResetDisabled = computed(() => isRunning.value || elapsedTime.value === 0);
    const isLapDisabled = computed(() => !isRunning.value || elapsedTime.value === 0);

    function formatTime(ms: number): string {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);

        const pad = (n: number, z = 2) => n.toString().padStart(z, "0");
        return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
    }

    function start() {
        if (isRunning.value) return;
        isRunning.value = true;
        const startTime = Date.now() - elapsedTime.value;

        intervalId.value = setInterval(() => {
            elapsedTime.value = Date.now() - startTime;
        }, 10);
    }

    function stop() {
        isRunning.value = false;
        if (intervalId.value !== 0) {
            clearInterval(intervalId.value);
            intervalId.value = 0;
        }
    }

    function reset() {
        if (isRunning.value) return
        stop();
        elapsedTime.value = 0;
        laps.value = [];
    }

    function recordLap() {
        laps.value.push(elapsedTime.value);
    }

    return {
        formattedTime,
        start,
        stop,
        reset,
        recordLap,
        isRunning,
        elapsedTime,
        intervalId,
        laps,
        formatTime,
    };
};

// ---- World Clocks ----
export const useWorldClocks = () => {
    const browserTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const defaultClocks = [browserTZ, "America/New_York", "Asia/Kolkata"];
    const clocks = useLocalStorage<string[]>("world-clocks", defaultClocks);
    const newClock = ref("");
    const tick = ref(0);
    const timezones = Intl.supportedValuesOf("timeZone");
    let timer: number | undefined;


    function addClock() {
        const tz = newClock.value.trim();
        if (!tz) return;

        try {
            // validate timezone
            dayjs().tz(tz);
            if (!clocks.value.includes(tz)) {
                clocks.value.push(tz);
            }
            newClock.value = "";
        } catch (e) {
            alert(`Invalid timezone: ${tz}`);
        }
    }

    function removeClock(index: number) {
        clocks.value.splice(index, 1);
    }

    function getTime(tz: string) {
        try {
            return dayjs().tz(tz).format("HH:mm:ss");
        } catch (e) {
            return "Invalid timezone";
        }
    }

    onMounted(() => {
        timer = setInterval(() => {
            tick.value++;
        }, 1000);
    });

    onUnmounted(() => {
        if (timer) clearInterval(timer);
    });

    return {
        clocks,
        newClock,
        addClock,
        removeClock,
        getTime,
        timezones
    };
};
