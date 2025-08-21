
import { ref } from 'vue'

export type Lap = {
  lap: number
  time: number
}

// export function useStopwatch() {
  export const time = ref(0)
  export const interval = ref<number | null>(null)
  export const isRunning = ref(false)
  export const laps = ref<Lap[]>([])

  export const start = () => {

    if (isRunning.value) return
    isRunning.value = true
    interval.value = setInterval(() => {
      time.value += 10
    }, 10)
  }


  export const stop = () => {

    if (interval.value !== null) {
      clearInterval(interval.value)
      interval.value = null
      isRunning.value = false
    }
  }

  export const reset = () => {

    stop()
    time.value = 0
    laps.value = []
  }


  export const lap = () => {

    if (isRunning.value) {
      laps.value.push({
        lap: laps.value.length + 1,
        time: time.value
      })

      
    }
  }

  export const formatTime = (ms: number): string => {

    const minutes = String(Math.floor(ms / 60000)).padStart(2, '0')
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0')
    return `${minutes}:${seconds}:${milliseconds}`
  }


  // return {
  //   time,
  //   isRunning,
  //   laps,
  //   start,
  //   stop,
  //   reset,
  //   lap,
  //   formatTime
  // }
// }


