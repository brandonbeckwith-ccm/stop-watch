<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from "vue";
import { useNavigation } from "../composables/useNavigation";

import { useStopwatch } from "../helpers/clock";
import { CButton, CTag } from "@ccm-engineering/ui-components";

const { formattedTime, start, stop, reset, isRunning, lap, laps } =
  useStopwatch();


function handleStart() {
  start();
  status.value = formattedTime.value;
}

function handleReset() {
  reset();
  status.value = "";
}

const { title, icon, status } = useNavigation();

let intervalId: number | undefined;

onMounted(() => {
  title.value = "Stopwatch";
  icon.value = "⏱️";
  status.value = "";
});

watch(formattedTime, (newTime) => {
  if (isRunning.value) {
    status.value = newTime;
  }
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
   <div class="main-container">
    <div class="card stopwatch-card">
      <h2 class="title">Stopwatch</h2>
      <div class="time-display">
        <h1>{{ formattedTime }}</h1>
      </div>
      <div class="btn-row">
        <CButton
          v-if="!isRunning"
          radius="xs"
          label="Start"
          @click="handleStart"
          icon-class="fal fa-play"
          iconPosition="left"
          type="border"
        />
        <CButton
          v-else
          radius="xs"
          label="Stop"
          @click="stop"
          icon-class="fal fa-pause"
          iconPosition="left"
          type="border"
        />
        <CButton
          radius="xs"
          label="Lap"
          @click="lap"
          icon-class="fa fa-flag-checkered"
          iconPosition="left"
          type="border"
          :disable="!isRunning"
        />
        <CButton
          radius="xs"
          label="Reset"
          @click="handleReset"
          :disable="isRunning"
          type="border"
          icon-class="fa fa-refresh"
          iconPosition="left"
        />
      </div>
    </div>
    <div class="card laps-card">
      <h2 class="title">Laps</h2>
      <div v-if="laps.length" class="laps-list">
        <div
          v-for="(lapTime, idx) in [...laps].reverse()"
          :key="laps.length - idx"
          class="lap-row"
        >
          <CTag
            label=""
            theme="info"
            :is-outlined="true"
            :is-rounded="true"
            :no-bg="false"
          >
            Lap {{ laps.length - idx }}: {{ lapTime }}
          </CTag>
        </div>
      </div>
      <div v-else class="no-laps">No laps yet.</div>
    </div>
  </div>
</template>
<style>
.main-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: white;
  min-height: 100vh;
  padding: 20px;
  gap: 20px; 
  flex-wrap: wrap; 
}

.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  padding: 36px 32px 32px 32px;
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.stopwatch-card {
  flex: 1;
}
.laps-card {
  flex: 1;
}

.all-clocks-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-height: 300px; 
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
}


.btn-row {
  display: flex;
  gap: 16px;
  justify-content: center;
  width: 100%;
}

.lap-row {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
</style>