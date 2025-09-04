## Task 4: Vue Reactivity Research — Real‑World Patterns

### 1) Refs

**Plain `ref`**
Use for primitives and replaceable objects.

```ts
import { ref } from "vue";

const count = ref(0);
const user = ref<{ id: number; name: string } | null>(null);

function login(u: { id: number; name: string }) {
  user.value = u; // replace the whole object
}
```

**Shallow refs (`shallowRef`, `triggerRef`)**
Optimization for big, non‑reactive internals or third‑party state. Replace the value to notify dependents.

```ts
import { shallowRef, triggerRef } from "vue";

const editor = shallowRef<any>(null);

function mountEditor(dom: HTMLElement) {
  editor.value = createBigEditor(dom); // only .value access is reactive
}

function applyExternalMutation() {
  // if the editor mutates internal state you can force updates
  triggerRef(editor);
}
```

> Research date: September 4, 2025
> _Docs background:_ Vue Reactivity Advanced clarifies that `shallowRef` keeps the inner value intact and reacts only to `.value` access.
> Source: Vue docs — Reactivity Advanced.

**Template refs (DOM / component refs)**

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
const inputEl = ref<HTMLInputElement | null>(null);

onMounted(() => inputEl.value?.focus());
</script>

<template>
  <input ref="inputEl" />
</template>
```

_Docs background:_ Template refs give direct access to DOM/child instances.
Source: Vue docs — Template Refs.

**Custom refs (`customRef`)**
Build your own `.value` with debounce/throttle, etc. Libraries like VueUse expose many custom‑ref utilities.

```ts
import { customRef } from "vue";

export function useDebouncedRef<T>(initial: T, delay = 300) {
  let v = initial;
  let timer: number | undefined;
  return customRef<T>((track, trigger) => ({
    get() {
      track();
      return v;
    },
    set(value) {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        v = value;
        trigger();
      }, delay);
    },
  }));
}
```

Real‑world: VueUse provides `useDebounce`, `useDebounceFn`, and storage composables that return _removable refs_ with custom behavior.
Sources: VueUse `useDebounceFn`, `useDebounce` and `useLocalStorage` docs.

---

### 2) `reactive`, `readonly`, and friends

**Grouping related state with `reactive`**

```ts
import { reactive, computed } from "vue";

const form = reactive({
  first: "",
  last: "",
  full: computed(() => `${form.first} ${form.last}`.trim()),
});
```

**`shallowReactive`** (rare)
Like `reactive` but does not make nested objects reactive. Use sparingly for perf‑critical trees.

```ts
import { shallowReactive } from "vue";
const node = shallowReactive({ id: 1, meta: { heavy: true } });
// node.meta changes won’t trigger updates
```

_Docs/background:_ Shallow variants are primarily for performance or external integrations.
Sources: Vue docs — Reactivity Advanced; Bitovi article on `shallowReactive` cautions.

**`readonly`**
Provide immutable views of reactive state to consumers.

```ts
import { reactive, readonly } from "vue";
const state = reactive({ count: 0 });
export const publicState = readonly(state);
```

**`markRaw`**
Exclude instances from reactivity (e.g., class instances, 3rd‑party libs).

```ts
import { markRaw, reactive } from "vue";
class Chart {
  /* ... */
}
const state = reactive({ chart: markRaw(new Chart()) });
```

---

### 3) `computed`

**Standard computed**

```ts
import { ref, computed } from "vue";
const items = ref([1, 2, 3]);
const even = computed(() => items.value.filter((i) => i % 2 === 0));
```

**Writable computed**

```ts
const firstName = ref("Ada");
const lastName = ref("Lovelace");

const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (v: string) => {
    const [first, ...rest] = v.split(" ");
    firstName.value = first;
    lastName.value = rest.join(" ");
  },
});
```

**Computed in `reactive` objects**

```ts
import { reactive, computed } from "vue";
const pagination = reactive({
  loading: false,
  hasMore: computed(() => true),
});
```

Observation: Vue 3.4 refined computed behavior; be mindful when returning properties from reactive objects in computed getters in complex setups.
Source: vuejs/core issue discussion.

---

### 4) `toRef`, `toRefs`, and store helpers

**`toRef` for a single property**

```ts
import { reactive, toRef } from "vue";
const state = reactive({ name: "Alice", age: 25 });
const nameRef = toRef(state, "name");
```

**`toRefs` for destructuring**

```ts
import { reactive, toRefs } from "vue";
const state = reactive({ a: 1, b: 2 });
const { a, b } = toRefs(state);
```

**Pinia: `storeToRefs`**
Avoids unintentional exposure of non‑reactive members; idiomatic when using Pinia stores.

```ts
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();
const { count, doubled } = storeToRefs(store);
const { increment } = store;
```

Sources: Vue docs on `toRef(s)` RFC; Pinia docs on `storeToRefs`.

---

### 5) Effects & scope management

**`watchEffect` vs `watch`**

- `watchEffect` runs immediately and collects deps automatically; great for quick side effects.
- `watch` gives explicit control over sources and callbacks.

**`effectScope` for bulk disposal**
Scope reactive side effects created inside and stop them together (useful in composables and manual lifecycles).

```ts
import { effectScope, ref, computed, watchEffect } from "vue";

export function useScopedCounter() {
  const scope = effectScope();
  let count!: ReturnType<typeof ref>;
  let doubled!: ReturnType<typeof computed>;

  scope.run(() => {
    count = ref(0);
    doubled = computed(() => count.value * 2);
    watchEffect(() => console.log("count:", count.value));
  });

  function stop() {
    scope.stop();
  }
  return { count, doubled, stop };
}
```

Background and use cases discussed in community write‑ups.
Sources: StackOverflow and blog posts on `effectScope`.

---

### 6) Patterns seen in open‑source

**A) Persisted state via composables (VueUse)**
`useLocalStorage` exposes a ref that syncs with Web Storage; commonly used in apps to persist user prefs.

```ts
import { useLocalStorage } from "@vueuse/core";
const theme = useLocalStorage<"light" | "dark">("theme", "light");
```

Use cases: dark‑mode toggles, recent items, feature flags.
Source: VueUse `useLocalStorage`.

**B) Pinia store consumption**
`storeToRefs` is the standard way to pull reactive state/getters while keeping actions as methods.

```ts
const store = useAuthStore();
const { user, isAuthenticated } = storeToRefs(store);
const { login, logout } = store;
```

Source: Pinia docs — `storeToRefs`.

**C) External instances with `markRaw` / `shallowRef`**
Charting editors, map SDKs, and code editors are commonly wrapped in `markRaw` or placed in a `shallowRef` to avoid deep proxying and improve perf (then force updates with `triggerRef` when needed).

**D) History/undo with ref history**
Libraries provide ref‑based history utilities for undo/redo (e.g., VueUse `useManualRefHistory`).

```ts
import { ref } from "vue";
import { useManualRefHistory } from "@vueuse/core";

const text = ref("");
const { commit, undo, redo, history } = useManualRefHistory(text);
```

Source: VueUse `useManualRefHistory`.

---

### 7) Common use cases & best practices

- Start with `ref` for simple state; group related properties with `reactive` when it improves ergonomics.
- Prefer `storeToRefs` when using Pinia; avoid spreading a store directly to keep actions non‑reactive.
- Reach for shallow variants (`shallowRef`, `shallowReactive`) only for performance or external libs; document why.
- Use `toRef(s)` when destructuring or exposing a subset of a reactive object (stores, props).
- Keep computed getters pure and side‑effect free; use `watch`/`watchEffect` for I/O.
- Use `readonly` when exposing state from composables to prevent writes by consumers.
- For long‑lived composables, wrap watchers/computeds in an `effectScope` to simplify teardown.
- Use `markRaw` for class instances / SDK objects that shouldn’t be proxied.

---

### 8) Interesting / unexpected implementations

- **Writable computeds** can act as two‑way view‑models for complex inputs (split/merge data).
- **`triggerRef` on shallow refs** is a pragmatic escape hatch to notify dependents after internal mutations in third‑party libs.
- **Computed inside `reactive` objects** keeps an ergonomic, object‑like API while staying reactive.
- **Ref history** patterns make implementing undo/redo trivial for text editors and drawing apps.

---

### Sources & Attribution

- Vue Docs — Reactivity Fundamentals & Advanced: [https://vuejs.org/guide/essentials/reactivity-fundamentals.html](https://vuejs.org/guide/essentials/reactivity-fundamentals.html), [https://vuejs.org/api/reactivity-advanced](https://vuejs.org/api/reactivity-advanced)
- Vue Docs — Template Refs: [https://vuejs.org/guide/essentials/template-refs](https://vuejs.org/guide/essentials/template-refs)
- Pinia Docs — `storeToRefs`: [https://pinia.vuejs.org/api/pinia/functions/storeToRefs.html](https://pinia.vuejs.org/api/pinia/functions/storeToRefs.html)
- VueUse — `useLocalStorage`, `useDebounce`, `useDebounceFn`, `useManualRefHistory`: [https://vueuse.org/core/uselocalstorage/](https://vueuse.org/core/uselocalstorage/), [https://vueuse.org/shared/usedebounce/](https://vueuse.org/shared/usedebounce/), [https://vueuse.org/shared/usedebouncefn/](https://vueuse.org/shared/usedebouncefn/), [https://vueuse.org/core/usemanualrefhistory/](https://vueuse.org/core/usemanualrefhistory/)
- Discussion on computed behavior in Vue 3.4+: [https://github.com/vuejs/core/issues/10601](https://github.com/vuejs/core/issues/10601)
- Background on shallow variants: [https://www.bitovi.com/blog/vue-reactivity-ref-reactive-shallowref-shallowreactive](https://www.bitovi.com/blog/vue-reactivity-ref-reactive-shallowref-shallowreactive)
