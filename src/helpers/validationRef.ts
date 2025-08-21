import { customRef } from 'vue'

export function validationRef<T>(initial: T, validate: (v: T) => boolean) {
  let value = initial
  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(newValue: T) {
      if (validate(newValue)) {
        value = newValue
        trigger()
      }
    }
  }))
}