import { customRef } from "vue";

export const useDebouncedRef = <T>(initialValue: T, delay = 300) => {
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

export const useValidatedRef = <T>(
  initialValue: T,
  validator: (val: T) => boolean
) => {
  let value = initialValue;

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        if (validator(newValue)) {
          value = newValue;
          trigger();
        } else {
          console.warn("Validation failed:", newValue);
        }
      },
    };
  });
};

export const useHistoryRef = <T>(initialValue: T, maxHistory = 10) => {
  let value = initialValue;
  const history: T[] = [value];

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        history.push(newValue);
        if (history.length > maxHistory) history.shift();
        value = newValue;
        trigger();
      },
    };
  });
};

export const useThrottledRef = <T>(initialValue: T, limit = 500) => {
  let value = initialValue;
  let lastUpdate = 0;

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        const now = Date.now();
        if (now - lastUpdate >= limit) {
          value = newValue;
          lastUpdate = now;
          trigger();
        }
      },
    };
  });
};
