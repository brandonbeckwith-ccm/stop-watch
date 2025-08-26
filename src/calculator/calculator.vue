<script setup lang="ts">
import { buttons, expression, history, press, result } from "../helpers/calculator";
</script>

<template>
  <div class="calc">
    <h2>Calculator</h2>

    <div class="display">
      <div>{{ expression || "0" }}</div>
      <div class="res">{{ result }}</div>
    </div>

    <div class="keys">
      <button v-for="btn in buttons" :key="btn" @click="press(btn)">
        {{ btn }}
      </button>
    </div>

    <div v-if="history.length" class="history">
      <h3>History</h3>
        <div v-for="(h, i) in history" :key="i">{{ h }}</div>
    </div>
  </div>
</template>

<style scoped>
.calc {
  max-width: 300px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: sans-serif;
  background: #fff;
}

.display {
  border: 1px solid #ddd;
  padding: 0.5rem;
  margin-bottom: 1rem;
  text-align: right;
  background: #fafafa;
}

.res {
  font-weight: bold;
  font-size: 1.4rem;
}

.keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

button {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f3f3f3;
  cursor: pointer;
}

button:hover {
  background: #e0e0e0;
}

.history {
  margin-top: 1rem;
  text-align: left;
}
</style>