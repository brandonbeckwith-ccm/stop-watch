<script setup lang="ts">
import {
  debouncedRef,
  validatedRef,
  historyRef,
  throttledRef,
} from "../composables/useCustomRef";
import { useNavigation } from "../composables/useNavigation";

const { setTitle, setIcon, setStatus } = useNavigation();
setTitle("Custom Ref");
setIcon("🔧");
setStatus("Working with custom refs");

const inputDebounced = debouncedRef("", 500);
const inputValidated = validatedRef("", (val) => val.trim().length >= 3);
const { ref: inputHistory, past: historyList } = historyRef("", 5);
const inputThrottled = throttledRef("", 1000);
</script>

<template>
  <div class="custom-ref">
    <h1>Custom Ref Assignment</h1>

    <!-- Debounced Input -->
    <div class="ref-section">
      <label>Debounced Input</label>
      <input v-model="inputDebounced" placeholder="Type something..." />
      <p>
        Value (after debounce): <strong>{{ inputDebounced }}</strong>
      </p>
    </div>

    <!-- Validated Input -->
    <div class="ref-section">
      <label>Validated Input (min 3 chars)</label>
      <input v-model="inputValidated" placeholder="Type at least 3 chars" />
      <p>
        Current Value: <strong>{{ inputValidated }}</strong>
      </p>
    </div>

    <!-- History Input -->
    <div class="ref-section">
      <label>History Input</label>
      <input v-model="inputHistory" placeholder="Type with history..." />
      <p>
        Current Value: <strong>{{ inputHistory }}</strong>
      </p>
      <h4>History:</h4>
      <ul>
        <li v-for="(item, i) in historyList" :key="i">
          {{ i + 1 }}. {{ item }}
        </li>
      </ul>
    </div>

    <!-- Throttled Input -->
    <div class="ref-section">
      <label>Throttled Input (1s delay)</label>
      <input v-model="inputThrottled" placeholder="Type quickly..." />
      <p>
        Value (throttled): <strong>{{ inputThrottled }}</strong>
      </p>
    </div>
  </div>
</template>

<style scoped>
.custom-ref {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  text-align: center;
}

.ref-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  background: #f9f9f9;
  text-align: left;
}

.ref-section label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.ref-section input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
}

.ref-section p {
  margin: 0;
  font-size: 0.95rem;
}
</style>
