## Vue Reactivity Research

### ​ Overview of Reactive Primitives

- **ref**: wraps values reactive (via `.value`), great for primitives or isolated state.
- **reactive**: makes objects/arrays deeply reactive.
- **shallowRef / shallowReactive**: lighter-weight, shallow-only reactivity for performance.

### Reactive Patterns in the Wild

- **Prop sync**: Use `ref()` + `watch()` to keep local reactive variables updated.
- **Reactive stores using `@vue/reactivity`**:
  ```ts
  export const state = reactive({
    count: 0,
    increment() {
      state.count++;
    },
  });
  ```
