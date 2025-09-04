<script setup lang="ts">
import { ref, watch } from "vue";
import {
  debouncedRef,
  validatedRef,
  historyRef,
  throttledRef,
} from "../components/Refs"; // adjust path if needed

// 1. Debounced ref
const search = debouncedRef("", 500);
watch(search, (val) => {
  console.log("Debounced API call:", val);
});

// 2. Validated ref (only numbers allowed)
const onlyNumbers = validatedRef<string>("", (val) => /^\d*$/.test(val));
watch(onlyNumbers, (val) => {
  console.log("Validated value changed:", val);
});

// 3. History ref (keeps last 5 states)
const { ref: historyInput, past } = historyRef("", 5);
watch(historyInput, (val) => {
  console.log("History value:", val, "Past values:", [...past]);
});

// 4. Throttled ref
const throttledValue = throttledRef("", 1000);
watch(throttledValue, (val) => {
  console.log("Throttled update:", val);
});
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>Custom Ref Playground</h2>

    <!-- Debounced -->
    <div style="margin-bottom: 15px;">
      <label>Debounced Search (500ms):</label><br />
      <input v-model="search" placeholder="Type quickly..." />
      <p><strong>Value:</strong> {{ search }}</p>
    </div>

    <!-- Validated -->
    <div style="margin-bottom: 15px;">
      <label>Validated Input (only numbers allowed):</label><br />
      <input v-model="onlyNumbers" placeholder="Numbers only..." />
      <p><strong>Value:</strong> {{ onlyNumbers }}</p>
    </div>

    <!-- History -->
    <div style="margin-bottom: 15px;">
      <label>History Input (keeps last 5 values):</label><br />
      <input v-model="historyInput" placeholder="Type something..." />
      <p><strong>Current:</strong> {{ historyInput }}</p>
      <p><strong>Past:</strong> {{ past }}</p>
    </div>

    <!-- Throttled -->
    <div style="margin-bottom: 15px;">
      <label>Throttled Input (1s gap):</label><br />
      <input v-model="throttledValue" placeholder="Type fast..." />
      <p><strong>Value:</strong> {{ throttledValue }}</p>
    </div>
  </div>
</template>
