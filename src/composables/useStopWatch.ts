import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
    useDebouncedRef,
    useValidatedRef,
    useHistoryRef,
} from "../customRefs";

dayjs.extend(utc);
dayjs.extend(timezone);

// ------ Stopwatch -------
export const useStopWatchComposable = () => {
    const isRunning = ref(false);
    const elapsedTime = ref(0);
    const intervalId = ref<number>(0);
    const laps = ref<number[]>([]);

    const formattedTime = computed(() => formatTime(elapsedTime.value));

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

    const allTimezones = Intl.supportedValuesOf("timeZone");

    // --- Debounced + Validated ---
    const debouncedClock = useDebouncedRef("", 500);
    const validatedClock = useValidatedRef("", (tz: string) =>
        allTimezones.includes(tz)
    );

    // --- History (Undo/Redo) ---
    const { ref: historyClock, undo, redo, history } = useHistoryRef("");

    watch(historyClock, (val, oldVal) => {
        // If undo: remove last clock
        if (val === "" && oldVal) {
            clocks.value.pop();
        }
        // If redo: add last clock back
        else if (val && !clocks.value.includes(val)) {
            clocks.value.push(val);
        }
    });

    // Sync debounced -> validated -> history
    watch(debouncedClock, (val) => {
        validatedClock.value = val;
    });

    watch(validatedClock, (val) => {
        if (val) historyClock.value = val;
    });

    // --- Filtering ---
    const filteredTimezones = computed(() => {
        if (!debouncedClock.value) return allTimezones;
        return allTimezones.filter((tz) =>
            tz.toLowerCase().includes(debouncedClock.value.toLowerCase())
        );
    });

    // --- Add/Remove ---
    function addClock() {
        const tz = validatedClock.value.trim();
        if (!tz) return;

        if (!clocks.value.includes(tz)) {
            clocks.value.push(tz);
        }
        validatedClock.value = "";
    }

    function removeClock(index: number) {
        clocks.value.splice(index, 1);
    }

    function getTime(tz: string) {
        return dayjs().tz(tz).format("HH:mm:ss");
    }

    return {
        clocks,
        validatedClock,
        filteredTimezones,
        addClock,
        removeClock,
        getTime,
        undo,
        redo,
        historyClock,
        history,
    };
};

