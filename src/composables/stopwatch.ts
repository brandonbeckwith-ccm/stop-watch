import { computed, ref, watch } from "vue"

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


    return { timeDisplay, start, reset, lap, stop, formatTime, laps, getTotal, showModal}
}
