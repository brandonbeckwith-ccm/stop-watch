<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { useCalculator } from "../composables/useCalculator";
import { watch } from "vue";
import { useNavigation } from "../composables/useNavigation";

const { expression, result, history, buttons, press } = useCalculator();

const { setTitle, setIcon, setStatus } = useNavigation();
setTitle("Calculator");
setIcon("🧮");
setStatus("Result:");

watch(result, (val) => setStatus(`Result: ${val}`));
</script>

<template>
  <div class="calc">
    <h2>Calculator</h2>

    <div class="display">
      <div class="expr">{{ expression || "0" }}</div>
      <div class="res">{{ result }}</div>
    </div>

    <div class="keys">
      <CButton
        v-for="btn in buttons"
        :key="btn"
        :label="btn"
        size="size-44"
        type="border"
        @click="press(btn)"
      />
    </div>

    <div class="history" v-if="history.length">
      <h3>History</h3>
      <ul>
        <li
          v-for="(h, i) in history"
          :key="i"
          @click="expression = h.split('=')[0].trim()"
        >
          {{ h }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.display {
  border: 1px solid #ddd;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: right;
}

.expr {
  font-size: 1.6rem;
  color: #666;
}

.res {
  font-size: 1.6rem;
  font-weight: bold;
  color: #111;
}

.keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}

button {
  padding: 1rem;
  cursor: pointer;
}

.history {
  margin-top: 1.5rem;
  text-align: left;
}

.history li {
  cursor: pointer;
  padding: 0.3rem 0;
  border-bottom: 1px solid #eee;
}
</style>
