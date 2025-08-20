import { customRef } from 'vue'

export function useDebouncedValidatedRef<T>(
  initialValue: T,
  delay = 500,
  validator: (val: T) => boolean = () => true
) {
  let value = initialValue
  let timeout: number

  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      clearTimeout(timeout)
      timeout = window.setTimeout(() => {
        if (validator(newValue)) {
          value = newValue
          trigger()
        } else {
          console.warn('Validation failed:', newValue)
        }
      }, delay)
    },
  }))
}