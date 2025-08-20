<script setup>
import { CButton } from "@ccm-engineering/ui-components";
import {computed, watch } from "vue";
import {myRef} from '../helper/customRef'
const startTime = myRef(0);
const updatedTime = myRef(0);
const difference = myRef(0);
const running = myRef(false);
const interval = myRef(null);
const laps = myRef([]);


const toggleStartStop = () => {
  if (!running.value) {
    startTime.value = Date.now() - difference.value;
    interval.value = setInterval(updateTime, 1);
  } else {
    clearInterval(interval.value);
  }
  running.value = !running.value;
};

const updateTime = () => {
  updatedTime.value = Date.now();
  difference.value = updatedTime.value - startTime.value;
};

const formattedTime = computed(() => {
  const minutes = Math.floor((difference.value / 1000 / 60) % 60);
  const seconds = Math.floor((difference.value / 1000) % 60);
  const milliseconds = Math.floor((difference.value % 1000) / 10);
  return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
});

const pad = (time) => (time < 10 ? "0" + time : time);

const resetTime = () => {
  clearInterval(interval.value);
  running.value = false;
  difference.value = 0;
  laps.value = [];
};

const recordLap = () => {
  if (running.value) {
    const lapTime = formattedTime.value;
    laps.value.push(lapTime);
  }
};

watch(running, (newVal) => {
  if (!newVal) {
    clearInterval(interval.value);
  }
});
</script>

<template>
  <div class="stopwatch-container">
    <div class="time-display">{{ formattedTime }}</div>
    <div class="buttons">
      <CButton
        :label="running ? 'Stop' : 'Start'"
        @click="toggleStartStop"

        type="fill"
        :icon-class="
          running ? 'fa-solid fa-circle-stop' : 'fa-solid fa-circle-play'
        "
        icon-position="left"
        :theme="running ? 'neutral' : 'success'"
        size="size-40"
      />
      <CButton
        type="fill"
        icon-class="fa-solid fa-refresh"
        icon-position="left"
        theme="danger"
        size="size-40"
        label="Reset"
        @click="resetTime"
      />
      <CButton
        type="fill"
        icon-class="fa-solid fa-timer"
        icon-position="left"
        theme="primary"
        size="size-40"
        label="Lap"
        @click="recordLap"
        :disabled="!running"
      />
    </div>
    <div v-if="laps.length" class="lap-times">
      <h3>Laps:</h3>
      <ul>
        <li v-for="(lap, index) in laps" :key="index">
          <span class="lap-index">Lap - {{ index + 1 }}</span>
          <span class="lap-time">{{ lap }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.stopwatch-container {
  text-align: center;
  padding: 20px;
  /* background-color: #403a3a; */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

.time-display {
  font-size: 3em;
  margin-bottom: 20px;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
.lap-index,
.lap-time {
  background: #2f61c5;
  font-weight: 500;
  text-transform: uppercase;
  width: 100px;
  border-radius: 4px;
}

.lap-times {
  margin-top: 20px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #db8dd0;
  border-radius: 8px;
  font-size: 1.2em;
  margin: 5px 0;
}
</style>
