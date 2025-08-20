<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopwatch } from "./composables/useStopWatch";

const { start, stop, reset, lap, formattedTime, formattedLaps, running } =
  useStopwatch();
</script>
<template>
  <div id="app">
    <h1>Stopwatch Assignment</h1>

    <div class="stopwatch">
      <h1>{{ formattedTime }}</h1>

      <div class="controls">
        <CButton label="Start" v-if="!running" @click="start" />
        <CButton label="Stop" v-if="running" @click="stop" />
        <CButton label="Reset" @click="reset" />
        <CButton label="Lap" :disabled="!running" @click="lap" />
      </div>

      <div class="laps" v-if="formattedLaps.length">
        <h2>Laps</h2>
        <ul>
          <li v-for="(lap, index) in formattedLaps" :key="index">
            <CTag :label="`Lap ${index + 1}: ${lap}`" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stopwatch {
  max-width: 400px;
  margin: auto;
  text-align: center;
  padding: 1rem;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.laps {
  margin-top: 2rem;
  text-align: left;
}
</style>
