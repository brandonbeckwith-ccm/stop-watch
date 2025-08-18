import { computed, ref } from "vue";

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
        stop();
        elapsedTime.value = 0;
        laps.value = [];
    }

    function recordLap() {
        laps.value.push(elapsedTime.value);
    }

    return {
        formattedTime, start, stop, reset, recordLap, isRunning, elapsedTime, intervalId, laps, formatTime, isLapDisabled, isResetDisabled
    }
}