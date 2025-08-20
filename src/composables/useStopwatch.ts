import { ref, computed } from 'vue'
import { formatTime } from '../utils/formatTime'

export interface LapTime {
  id: number
  time: number
  displayTime: string
}

export function useStopwatch() {
  const isRunning = ref(false)
  const elapsed = ref(0)
  const laps = ref<LapTime[]>([])
  const interval = ref<number | null>(null)
  let lapId = 0

  const formatted = computed(() => {
    return formatTime(elapsed.value)
  })

  const start = () => {
    if (isRunning.value) return
    isRunning.value = true
    const startAt = Date.now() - elapsed.value
    interval.value = setInterval(() => {
      elapsed.value = Date.now() - startAt
    }, 10)
  }

  const stop = () => {
    if (!isRunning.value) return
    isRunning.value = false
    if (interval.value) clearInterval(interval.value)
    interval.value = null
  }

  const reset = () => {
    stop()
    elapsed.value = 0
    laps.value = []
    lapId = 0
  }

  const lap = () => {
    if (!isRunning.value) return
    laps.value.unshift({ id: ++lapId, time: elapsed.value, displayTime: formatted.value })
  }

  const toggle = () => (isRunning.value ? stop() : start())

  return {
    isRunning,
    elapsedTime: elapsed,
    formattedTime: formatted,
    lapTimes: laps,
    start,
    stop,
    reset,
    lap,
    toggle
  }
}
