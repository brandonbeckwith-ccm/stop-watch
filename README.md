# Day 2: Git Merge Practice & Feature Development

## Task 1: Git Conflict Resolution

Find your assigned PR (one of PRs #15-26) where someone else's branch merges into your `-merge-practice` branch.

**Your options for resolving conflicts:**

- **Merge commit**: Standard merge with merge commit
- **Rebase**: Replay commits to create linear history
- **Squash merge**: Combine all commits into single commit

Resolve the conflicts and complete the merge using your chosen strategy.

## Task 2: Navigation Menu

Rebase your day-2 branch from master and then add a navigation menu to your application.

**Requirements:**

- Must function as navigation (routing between views/sections)
- Implementation approach is flexible (tabs, sidebar, header nav, etc.)
- Must be responsive

Commit and push your changes.

## Task 3: World Clock Feature

Add configurable world clocks that display current times in different timezones.

**Requirements:**

- **Default clocks:** User's local time (browser timezone), EST, and your current physical location timezone
- Users can add and remove additional clocks
- Clock preferences persist between page visits (use localStorage)

## Task 4: Vue Reactivity Research

### Vue Reactivity Patterns in Real-World Applications

#### 1. Types of Reactive Primitives

- **ref:**  
  Used for primitive values and objects.

  ```js
  import { ref } from "vue";
  const count = ref(0);
  ```

  _Use case:_ Local state, form fields, timers.

- **reactive:**  
  Used for deeply reactive objects.

  ```js
  import { reactive } from "vue";
  const state = reactive({ count: 0, user: { name: "" } });
  ```

  _Use case:_ Component state, stores, complex objects.

- **computed:**  
  Used for derived state.
  ```js
  import { computed } from "vue";
  const double = computed(() => count.value * 2);
  ```
  _Use case:_ Formatting, filtering, derived values.

#### 2. Patterns in Open-Source Projects

- **Custom Refs for Debouncing/Throttling**  
  [VueUse - useDebounce](https://vueuse.org/core/useDebounce/)

  ```js
  import { customRef } from "vue";
  function debouncedRef(value, delay = 200) {
    let timeout;
    return customRef((track, trigger) => ({
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    }));
  }
  ```

  _Use case:_ Search inputs, API calls.

- **Reactive Navigation State (provide/inject)**  
  _From this project:_

  ```js
  import { ref, provide, inject } from "vue";
  const NAV_KEY = Symbol();
  export function createNavigation() {
    const title = ref("My App");
    provide(NAV_KEY, { title });
  }
  export function useNavigation() {
    return inject(NAV_KEY);
  }
  ```

  _Use case:_ Dynamic navigation bars, breadcrumbs.

- **Reactive Stores (Pinia, Vuex)**  
  [Pinia Docs](https://pinia.vuejs.org/)
  ```js
  import { defineStore } from "pinia";
  export const useCounterStore = defineStore("counter", {
    state: () => ({ count: 0 }),
    actions: {
      increment() {
        this.count++;
      },
    },
  });
  ```
  _Use case:_ Global state management.

#### 3. Common Use Cases & Best Practices

- Use `ref` for primitives and single values.
- Use `reactive` for objects and arrays.
- Use `computed` for derived state and formatting.
- Use `watch` for side effects and async operations.
- Use `customRef` for advanced reactivity (debounce, validation, undo).
- Use `provide/inject` for cross-component state (navigation, theme).

#### 4. Personal Observations

- Vue’s reactivity system is flexible and composable, making it easy to build custom solutions for

**Required setup:**

```bash
npm install @vueuse/core dayjs
```

You're encouraged to use these libraries but not required to.

Commit and push your changes.

## Final Step

Once you've completed Tasks 2 and 3, raise a new PR from your `-day-2` branch against your original Day 1 branch (e.g., `feature/yourname-day-2` → `feature/yourname`). Take a moment to reflect and comment any observations or things you wish you did differently.

## Development Setup

```bash
npm install
npm run dev
```
