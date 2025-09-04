import { customRef, type Ref } from "vue";

export const debouncedRef = <T>(startValue: T, wait = 300): Ref<T> => {
  let state = startValue;
  let timer: ReturnType<typeof setTimeout> | null = null;

  return customRef<T>((track, trigger) => ({
    get: () => {
      track();
      return state;
    },
    set: (newVal: T) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        state = newVal;
        trigger();
      }, wait);
    },
  }));
};

export const validatedRef = <T>(
  startValue: T,
  check: (val: T) => boolean
): Ref<T> => {
  let state = startValue;

  return customRef<T>((track, trigger) => ({
    get: () => {
      track();
      return state;
    },
    set: (newVal: T) => {
      if (check(newVal)) {
        state = newVal;
        trigger();
      } else {
        console.warn("[validatedRef] rejected:", newVal);
      }
    },
  }));
};

export const historyRef = <T>(startValue: T, limit = 5) => {
  let state = startValue;
  const past: T[] = [startValue];

  const ref = customRef<T>((track, trigger) => ({
    get: () => {
      track();
      return state;
    },
    set: (newVal: T) => {
      past.push(newVal);
      if (past.length > limit) past.shift();
      state = newVal;
      trigger();
    },
  }));

  return { ref, past };
};

export const throttledRef = <T>(startValue: T, gap = 500): Ref<T> => {
  let state = startValue;
  let last = 0;

  return customRef<T>((track, trigger) => ({
    get: () => {
      track();
      return state;
    },
    set: (newVal: T) => {
      const now = Date.now();
      if (now - last >= gap) {
        state = newVal;
        last = now;
        trigger();
      }
    },
  }));
};
