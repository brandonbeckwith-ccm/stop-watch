import { customRef } from "vue";
export const myRef = <T>(initialValue?: T | undefined) => {
  let value = initialValue;
  return customRef<T | undefined>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        value = newValue;
        trigger();
      },
    };
  });
};

// written just for refrence and it is not used anywhere.
export const debouncedRef = <T>(initialValue: T, delay = 300) => {
  let value = initialValue;
  let timeout: ReturnType<typeof setTimeout>;

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
};
