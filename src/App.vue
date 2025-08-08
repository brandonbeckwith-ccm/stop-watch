
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

    <CTag
      v-if="laps.length"
      class="laps"
      label="LAPS"
      size="medium-32"
      theme="primary"
    />
    <div>
      <div v-for="(lap, index) in laps" :key="index">
        Lap {{ index + 1 }} - {{ formatTime(lap) }}
        <hr />
      </div>
  </div>
</template>

<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { onUnmounted } from "vue";
import { useStopWatchComposable } from "./composables/useStopWatch";

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
