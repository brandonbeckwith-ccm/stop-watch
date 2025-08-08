
import { ref } from 'vue'

export type Lap = {
  lap: number
  time: number
}

export function useStopwatch() {
  const time = ref(0)
  const interval = ref<number | null>(null)
  const isRunning = ref(false)
  const laps = ref<Lap[]>([])

  const start = () => {
    if (isRunning.value) return
    isRunning.value = true
    interval.value = setInterval(() => {
      time.value += 10
    }, 10)
  }

  const stop = () => {
    if (interval.value !== null) {
      clearInterval(interval.value)
      interval.value = null
      isRunning.value = false
    }
  }

  const reset = () => {
    stop()
    time.value = 0
    laps.value = []
  }

  const lap = () => {
    if (isRunning.value) {
      laps.value.push({
        lap: laps.value.length + 1,
        time: time.value
      })
    }
  }

  const formatTime = (ms: number): string => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0')
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }

  return {
    time,
    isRunning,
    laps,
    start,
    stop,
    reset,
    lap,
    formatTime
  }
}
