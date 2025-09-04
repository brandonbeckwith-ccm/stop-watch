<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { computed, ref, watch, onMounted } from "vue";
import { useNavigation } from "../Composables/useNavigation";

const nav = useNavigation();

const minutes = ref<number>(0);
const seconds = ref<number>(0);
const milliseconds = ref<number>(0);
const timer = ref<number | null>(null);
const isGoing = ref<boolean>(false);
const laps = ref<string[]>([]);

const currentTime = computed(() => {
  const pad = (num: number, size = 2) => String(num).padStart(size, "0");
  return `${pad(minutes.value)}:${pad(seconds.value)}:${pad(
    Math.floor(milliseconds.value / 10)
  )}`;
});

watch(currentTime, (val) => {
  nav.setStatus(val);
});

onMounted(() => {
  nav.setTitle("Stopwatch");
  nav.setIcon("fal fa-stopwatch");
  nav.setStatus(currentTime.value);
});

const start = (): void => {
  if (isGoing.value) return;
  isGoing.value = true;

  timer.value = window.setInterval(() => {
    milliseconds.value += 10;
    if (milliseconds.value >= 1000) {
      milliseconds.value = 0;
      seconds.value += 1;
    }
    if (seconds.value >= 60) {
      seconds.value = 0;
      minutes.value += 1;
    }
  }, 10);
};

const stop = (): void => {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
  }
  isGoing.value = false;
};

const reset = (): void => {
  stop();
  minutes.value = 0;
  seconds.value = 0;
  milliseconds.value = 0;
  laps.value = [];
};

const lap = (): void => {
  if (isGoing.value) {
    laps.value.push(currentTime.value);
  }
};
</script>

<template>
  <h1>{{ currentTime }}</h1>
  <div class="btns">
    <CButton
      @clicked="start"
      theme="success"
      label="Start"
      icon-class="fal fa-play"
      icon-position="left"
    />
    <CButton
      @clicked="stop"
      theme="danger"
      label="Stop"
      icon-class="fal fa-pause"
      icon-position="left"
    />
    <CButton
      @clicked="reset"
      theme="primary"
      label="Reset"
      icon-class="fal fa-refresh"
      icon-position="left"
    />
    <CButton
      @clicked="lap"
      theme="black"
      label="Lap"
      icon-class="fal fa-flag-checkered"
      icon-position="left"
    />
  </div>
  <h2 v-if="laps.length > 0">Laps</h2>
  <div class="laps">
    <CTag
      v-for="(lapTime, index) in laps"
      :label="`Lap ${index} : ${lapTime}`"
      :key="index"
      size="medium-32"
      theme="in-progress"
    />
  </div>
</template>

<style>
h1 {
  font-size: 3rem;
  text-align: center;
  margin-top: 40px;
  font-family: Arial, sans-serif;
  color: #333;
}

.btns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}

.laps {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
