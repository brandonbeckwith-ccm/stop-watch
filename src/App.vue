<template>
  <div class="stopwatch-app">
    <h1>Stopwatch Assignment</h1>

    <div class="time-display">{{ formattedTime }}</div>

    <div class="controls">
      <CButton
        :icon-class="isRunning ? 'fa-solid fa-stop' : 'fa-solid fa-play'"
        icon-position="left"
        :label="isRunning ? 'Stop' : 'Start'"
        @click="isRunning ? stop() : start()"
      />

      <CButton
        icon-class="fa-solid fa-rotate"
        icon-position="left"
        label="Reset"
        @click="reset"
        :disabled="!elapsedTime && laps.length === 0"
      />
      <CButton
        icon-class="fa-solid fa-flag"
        icon-position="left"
        label="Lap"
        @click="recordLap"
        :disabled="!isRunning"
      />
    </div>

    <div v-if="laps.length" class="laps">
      <h2>Laps</h2>
      <ul>
        <li v-for="(lap, index) in laps" :key="index">
          Lap {{ index + 1 }} - {{ formatTime(lap) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { ref, computed, onUnmounted } from "vue";

const isRunning = ref(false);
const elapsedTime = ref(0);
const intervalId = ref<number>(0);
const laps = ref<number[]>([]);

const formattedTime = computed(() => formatTime(elapsedTime.value));

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = (n: number, z = 2) => n.toString().padStart(z, "0");
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function start() {
  if (isRunning.value) return;
  isRunning.value = true;
  const startTime = Date.now() - elapsedTime.value;

  intervalId.value = setInterval(() => {
    elapsedTime.value = Date.now() - startTime;
  }, 10);
}

function stop() {
  isRunning.value = false;
  if (intervalId.value !== 0) {
    clearInterval(intervalId.value);
    intervalId.value = 0;
  }
}

function reset() {
  stop();
  elapsedTime.value = 0;
  laps.value = [];
}

function recordLap() {
  laps.value.push(elapsedTime.value);
}

onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>

<style scoped>
.stopwatch-app {
  max-width: 400px;
  margin: 40px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.time-display {
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: bold;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin: 0 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.laps {
  margin-top: 20px;
  text-align: left;
}

.laps ul {
  list-style: none;
  padding: 0;
}

.laps li {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}
</style>
