<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopwatch } from "./composables";
import { computed } from "vue";
import Column from "primevue/column";
import { CCMDataTable } from "@ccm-engineering/ccm-data-table";

const { start, laps, elapsed, stop, reset, formatTime, lap, isRunning } =
  useStopwatch();

function handleStart() {
  start();
}
function handleLap() {
  lap();
}
function handleStop() {
  stop();
}

function handleReset() {
  reset();
}

const formattedTime = computed(() => formatTime(elapsed.value));
</script>

<template>
  <div id="app">
    <div class="stopwatch-container">
      <div class="header">
        <h1>Stopwatch</h1>
      </div>
      <CTag :label="formattedTime" size="medium-32" class="stopwatch-time" />
      <div class="buttons">
        <CButton
          label="Start"
          icon-class="fal fa-play"
          class="btn start"
          @clicked="handleStart"
          :disabled="isRunning"
        />
        <CButton
          label="Stop"
          icon-class="fal fa-stop"
          class="btn stop"
          @clicked="handleStop"
        />
        <CButton
          label="Lap"
          icon-class="fal fa-flag"
          class="btn lap"
          @clicked="handleLap"
        />
        <CButton
          label="Reset"
          icon-class="fal fa-xmark"
          class="btn reset"
          @clicked="handleReset"
          type="border"
        />
      </div>
      <div class="laps">
        <h3 class="table-header">Laps</h3>
        <CCMDataTable :value="laps">
          <Column field="id" header="Lap Number" />
          <Column field="timeStamp" header="Lap" />
          <template #empty>
            <span class="empty-message">No laps yet!</span>
          </template>
        </CCMDataTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stopwatch-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-weight: 650;
  font-size: 1.5rem;
  margin-top: 100px;
}

.stopwatch-time {
  font-size: 32px;
  font-weight: 700;
  border-radius: 9px;
  width: 190px;
  margin: 0 auto;
  padding: 7px;
}

.buttons {
  display: flex;
  gap: 13px;
  justify-content: center;
  margin: 30px 0 0 10px;
}

.btn {
  padding: 7px;
  width: 80px;
  font-size: 11px;
  border-radius: 9px;
  border: none;
  cursor: pointer;

  &.start {
    background-color: #14596e;
    color: white;
    border-radius: 999px;
    padding: 10px 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &.stop {
    background-color: #bd1f2d;
    color: white;
    border-radius: 999px;
    padding: 10px 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &.lap {
    background-color: #14596e;
    color: white;
    border-radius: 999px;
    padding: 10px 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &.reset {
    border-radius: 999px;
    padding: 10px 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
}

.laps {
  margin-top: 20px;
  text-align: left;
}

.table-header {
  text-align: center;
}

.empty-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10px;
  font-style: italic;
  color: #888;
}
</style>
