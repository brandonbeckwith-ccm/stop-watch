<template>
  <div class="app-container">
    <!-- Header Navigation -->
    <header class="app-header">
      <nav class="nav">
        <button
          class="nav-link"
          :class="{ active: currentView === 'stopwatch' }"
          @click="currentView = 'stopwatch'"
        >
          Stopwatch
        </button>
        <button
          class="nav-link"
          :class="{ active: currentView === 'laps' }"
          @click="currentView = 'laps'"
        >
          Laps
        </button>
      </nav>
    </header>

    <!-- Stopwatch View -->
    <main v-if="currentView === 'stopwatch'" class="stopwatch-app">
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
    </main>

    <!-- Laps View -->
    <main v-else class="laps-view">
      <h2>Laps</h2>

      <CTag
        v-if="laps.length"
        class="laps"
        label="LAPS"
        size="medium-32"
        theme="primary"
      />

      <div v-if="laps.length">
        <div v-for="(lap, index) in laps" :key="index" class="lap-item">
          Lap {{ index + 1 }} - {{ formatTime(lap) }}
          <hr />
        </div>
      </div>

      <p v-else>No laps recorded yet.</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopWatchComposable } from "./composables/useStopWatch";

const currentView = ref<"stopwatch" | "laps">("stopwatch");

const {
  isRunning,
  elapsedTime,
  intervalId,
  laps,
  formattedTime,
  start,
  stop,
  reset,
  recordLap,
  formatTime,
} = useStopWatchComposable();

onUnmounted(() => {
  if (intervalId.value !== null) {
    clearInterval(intervalId.value);
  }
});
</script>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.app-header {
  background: #2c3e50;
  padding: 10px;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.active {
  background: #3498db;
}

.stopwatch-app,
.laps-view {
  padding: 20px;
  text-align: center;
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
}

.lap-item {
  padding: 6px 0;
  border-bottom: 1px solid #ccc;
}
</style>
