<script setup lang="ts">
import { computed } from "vue";
import { useStopwatch } from "./composables/useStopwatch";
import { CButton, CTag } from "@ccm-engineering/ui-components";

const { formattedTime, laps, formatTime, start, stop, reset, lap, intervalId } =
  useStopwatch();
const isRunning = computed(() => intervalId.value !== null);
</script>

<template>
  <div id="app">
    <h1>Stopwatch</h1>

    <div>
      <div class="time-card">
        <h2>{{ formattedTime }}</h2>
      </div>

      <div class="control-buttons">
        <CButton
          @click="start"
          :disable="isRunning"
          label="Start"
          size="size-48"
        ></CButton>
        <CButton @click="stop" :disable="!isRunning" label="Stop"></CButton>
        <CButton @click="reset" label="Reset"></CButton>
        <CButton @click="lap" :disable="!isRunning" label="Lap"></CButton>
      </div>

      <ul v-if="laps.length">
        <CTag
          v-for="(lapTime, index) in laps"
          :key="index"
          theme="sky-blue"
          size="medium-32"
          class="lap-tag"
        >
          Lap {{ laps.length - index }} - {{ formatTime(lapTime) }}
        </CTag>
      </ul>

      <div v-if="laps.length === 0 && !isRunning" class="instructions">
        <p>Click <strong>Start</strong> to begin timing.</p>
        <p>
          Click <strong>Lap</strong> to record lap times while the timer is
          running.
        </p>
        <p>
          Click <strong>Stop</strong> to pause, then click
          <strong>Start</strong> to resume.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #edf2f1;
  border-radius: 12px;
  text-align: center;
  justify-content: center;
  border: 2px #165c7d solid;
}
h1 {
  color: #ffffff;
  background-color: #165c7d;
  font-weight: 700;
  font-size: 48px;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(22, 92, 125, 0.4);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
h2 {
  color: #ffffff;
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 0;
  padding: 1rem 2rem;
  border-radius: 16px;
  background-color: #165c7d;
  box-shadow: 0 4px 10px rgba(22, 92, 125, 0.3);
}
.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}
.control-button {
  min-width: 100px;
}
.time-card {
  background-color: #165c7d;
  color: white;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  margin: 1.5rem;
  text-align: center;
  font-size: 32px;
  min-width: 400px;
}
ul {
  padding: 0;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
  border: 1px solid #c5e4ee;
  border-radius: 12px;
  background-color: #f4fafa;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 500px;
}
.lap-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  font-size: 16px;
  font-weight: 500;
  margin: 10px;
  padding: 0.75rem 1rem;
  background-color: #165c7d;
  color: #ffffff;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.lap-tag:hover {
  background-color: #134e6a;
  transform: translateY(-2px);
}

.instructions {
  background-color: #f4fafa;
  color: #165c7d;
  border: 1px solid #c5e4ee;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  font-size: 16px;
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
