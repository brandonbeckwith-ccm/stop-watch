import { customRef, ref, watch } from "vue";

const savedTab = localStorage.getItem("selectedTab") || "clock";
export const selectedTabValue = ref<string>(savedTab);

watch(selectedTabValue, (newValue) => {
  localStorage.setItem("selectedTab", newValue);
});
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
