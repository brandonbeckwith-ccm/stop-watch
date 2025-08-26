<script setup lang="ts">
import { useStopWatchComposable } from "../composables/useSLWC";
import { CButton } from "@ccm-engineering/ui-components";

const { isRunning, laps, formattedTime, start, stop, reset, recordLap } =
  useStopWatchComposable();
</script>

<template>
  <div class="stopwatch-app">
    <h1>Stopwatch</h1>

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
        :disabled="isRunning && laps.length === 0"
      />

      <CButton
        icon-class="fa-solid fa-flag"
        icon-position="left"
        label="Lap"
        @click="recordLap"
        :disabled="!isRunning"
      />
    </div>
  </div>
</template>

<style scoped>
.stopwatch-app {
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
}
</style>
