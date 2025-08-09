<script setup lang="ts">
import { onUnmounted } from "vue";
import { useComposable } from "./composables";

const { formattedTime, start, pause, stop, laptime, time_laps } =
  useComposable();

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div id="app">
    <p class="timer">{{ formattedTime }}</p>
    <div class="button-group">
      <button @click="start">Start</button>
      <button @click="pause">Pause</button>
      <button @click="stop">Stop</button>
      <button @click="laptime">Lap</button>
    </div>

    <div class="laps">
      <div v-for="(item, index) in time_laps" :key="index">
        <span>Lap {{ index + 1 }}:</span> {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
  font-family: 'Segoe UI', sans-serif;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.timer {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.button-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

.laps {
  text-align: left;
  margin-top: 10px;
  font-size: 1rem;
  color: #444;
  max-height: 200px;
  overflow-y: auto;
  padding: 0 10px;
}

.laps div {
  padding: 4px 0;
  border-bottom: 1px solid #eee;
}
</style>

