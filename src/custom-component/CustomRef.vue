<script setup lang="ts">
import { customRef } from 'vue'

export const  useDebouncedRef = <T>(value: T, delay = 300)=> {
  let timeout: ReturnType<typeof setTimeout>

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track() // tell Vue to track this dependency
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger() // notify Vue of the change
        }, delay)
      },
    }
  })
}


</script>