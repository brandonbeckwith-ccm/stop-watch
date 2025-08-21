import { customRef } from 'vue'

export function throttledRef<T>(initial: T, delay = 300) {
  let value = initial
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastValue: T = initial

  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      lastValue = newValue
      if (!timeout) {
        timeout = setTimeout(() => {
          value = lastValue
          trigger()
          timeout = null
        }, delay)
      }
    }
  }))
}