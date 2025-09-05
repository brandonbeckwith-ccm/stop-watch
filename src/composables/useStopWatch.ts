import { ref, computed } from "vue"

export type Lap = {
    id: number,
    timeString: string
}

export const stopwatch = ref<string>('00:00:00')

export const useStopWatch = () => {
    const time = ref<number>(0);
    const interval = ref<number>(0);
    const isRunning = ref<boolean>(false);
    const laps = ref<Lap[]>([]);

    const formatTime = computed<string>(() => {
        const ms = (time.value % 1000).toString().padStart(2, '0').slice(0, 2);
        const totalSeconds = Math.floor(time.value / 1000);
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        stopwatch.value = `${minutes} : ${seconds} : ${ms}`
        
        return `${minutes} : ${seconds} : ${ms}`;
    });

    const start = (): void => {
        isRunning.value = true;
        interval.value = setInterval(() => time.value += 10, 10)
    };

    const stop = (): void => {
        isRunning.value = false;
        clearInterval(interval.value);
    };

    const reset = (): void => {
        stop();
        time.value = 0;
        laps.value = [];
    };

    const lap = (): void => {
        laps.value.push({ id: laps.value.length + 1, timeString: formatTime.value });
    };

    return {
        formatTime,
        laps,
        isRunning,
        interval,
        start,
        stop,
        reset,
        lap
    }
}