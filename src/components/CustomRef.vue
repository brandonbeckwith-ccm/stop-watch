<script setup lang="ts">
import { onMounted } from "vue";
import {
  useDebouncedRef,
  useValidatedRef,
  useHistoryRef,
  useThrottledRef,
} from "../helper/customRef";
import { useNavigation } from "../Composables/useNavigation";

const nav = useNavigation();

const debouncedInput = useDebouncedRef("", 500);
const validatedInput = useValidatedRef("", (v) => v.length >= 4);
const historyInput = useHistoryRef("", 5);
const throttledInput = useThrottledRef("", 2000);

onMounted(() => {
  nav.setTitle("Custom Ref");
  nav.setIcon("");
  nav.setStatus("");
});
</script>

<template>
  <div class="ref-item">
    <h3>Debounced Ref</h3>
    <p>Value updates after 500ms of no typing.</p>
    <input v-model="debouncedInput" placeholder="Type to search..." />
    <p>Debounced value: {{ debouncedInput }}</p>
  </div>

  <div class="ref-item">
    <h3>Validated Ref</h3>
    <p>Only accepts input with 4+ characters.</p>
    <input v-model="validatedInput" placeholder="Min 3 characters..." />
    <p>Validated value: {{ validatedInput }}</p>
  </div>

  <div class="ref-item">
    <h3>History Ref</h3>
    <p>Keeps history of last 5 inputs.</p>
    <input v-model="historyInput" placeholder="Type something..." />
    <p>History value: {{ historyInput }}</p>
  </div>

  <div class="ref-item">
    <h3>Throttled Ref</h3>
    <p>Updates value once every 2000ms.</p>
    <input v-model="throttledInput" placeholder="Type to throttle..." />
    <p>Throttled value: {{ throttledInput }}</p>
  </div>
</template>

<style scoped>
.ref-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}

input {
  padding: 6px 10px;
  margin: 8px 0;
  width: 100%;
  box-sizing: border-box;
}
</style>
