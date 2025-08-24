import { customRef } from 'vue'

export function historyRef<T>(initial: T) {
  let value = initial
  const history: T[] = []
  let trigger: () => void

  const ref = customRef<T>((track, _trigger) => {
    trigger = _trigger
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        history.push(value)
        value = newValue
        trigger()
      }
    }
  })

  const undo=()=> {
    if (history.length) {
      value = history.pop()!
      trigger()
    }
  }

  return [ref, undo] as const
}