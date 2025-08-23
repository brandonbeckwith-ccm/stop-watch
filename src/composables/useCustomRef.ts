import { customRef } from "vue";

export const useDebouncedRef = <T>(value: T, delay = 300) => {
  let timeout: number;

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return value;
    },
    set(newValue: T) {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        value = newValue;
        trigger();
      }, delay);
    },
  }));
};

export const useDebouncedValidatedRef = <T extends string | string[]>(
  value: T,
  delay = 300,
  minLength = 3,
  onError?: (msg: string) => void
) => {
  const debounced = useDebouncedRef<T>(value, delay);

  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return debounced.value;
    },
    set(newValue: T) {
      debounced.value = newValue;

      setTimeout(() => {
        if (!newValue || newValue.length === 0) {
          onError?.("");
        } else if (newValue.length < minLength) {
          onError?.(`Input must be at least ${minLength} characters.`);
        } else {
          onError?.("");
        }
        trigger();
      }, delay);
    },
  }));
};
