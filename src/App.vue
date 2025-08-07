<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopwatch } from "./composables/useStopwatch";
import { computed, ref } from "vue";

const {
  startStopWatch,
  stopStopWatch,
  addLap,
  resetStopWatch,
  elapsedTime,
  laps,
} = useStopwatch();

const formatTime = (milliseconds: number): string => {
  const totalMs = Math.floor(milliseconds);
  const minutes = Math.floor(totalMs / 6000);
  const seconds = Math.floor((totalMs % 6000) / 100);
  const centiseconds = Math.floor(totalMs % 100);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`;
};

const isStarted = ref(false);

const isResetDisabled = computed(() => {
  return elapsedTime.value === 0 && laps.length === 0;
});

const triggerHandler = () => {
  if (isStarted.value) {
    stopStopWatch();
    isStarted.value = false;
  } else {
    startStopWatch();
    isStarted.value = true;
  }
};

const resetHandler = () => {
  resetStopWatch();
  isStarted.value = false;
};
</script>

<template>
  <div class="ccm-new" id="app">
    <h1>Stopwatch Assignment</h1>

    <div class="grid-container">
      <div class="card stopwatch-card">
        <h2>Stopwatch</h2>
        <div class="stopwatch-controls">
          <div class="time-display">
            <label class="time-label">Current Time</label>
            <CTag
              :label="formatTime(elapsedTime)"
              size="medium-32"
              theme="default"
              is-outlined
              :is-rounded="false"
            />
          </div>
          <div class="button-group">
            <CButton
              :label="isStarted ? 'Stop' : 'Start'"
              :icon-class="isStarted ? 'fal fa-pause' : 'fal fa-play'"
              @clicked="triggerHandler"
              :theme="isStarted ? 'danger' : 'success'"
              type="border"
              size="size-48"
              icon-position="left"
              radius="md"
            />
            <CButton
              label="Reset"
              @clicked="resetHandler"
              theme="black"
              :disable="isResetDisabled"
              type="border"
              size="size-48"
              radius="md"
              icon-class="fal fa-rotate"
              icon-position="left"
            />
            <CButton
              label="Lap"
              @clicked="addLap"
              theme="black"
              :disable="!isStarted"
              size="size-48"
              radius="md"
              icon-class="fal fa-flag-checkered"
              icon-position="left"
            />
          </div>
        </div>
      </div>

      <div class="card laps-card">
        <h2>Lap Times</h2>
        <div class="lap-list">
          <div
            v-if="laps.length > 0"
            v-for="(l, idx) in laps"
            :key="idx"
            class="lap-item"
          >
            <label class="lap-label">Lap {{ laps.length - idx }}</label>
            <CTag
              :label="formatTime(l)"
              theme="success"
              is-outlined
              size="medium-32"
              :is-rounded="false"
            />
          </div>
          <div v-else class="lap-list-empty">No laps recorded yet</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$primary-color: rgb(51, 51, 51);
$secondary-color: rgb(102, 102, 102);
$background-color: rgb(248, 249, 250);
$border-color: rgb(233, 236, 239);
$hover-color: rgb(222, 226, 230);

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 255, 255);
  height: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto;
  }
}

.stopwatch-card {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: $primary-color;
  }

  .stopwatch-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .time-display {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      min-height: 40px;

      .time-label {
        font-size: 0.9rem;
        color: $secondary-color;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 200px;
      align-items: stretch;
    }
  }
}

.laps-card {
  flex: 1;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: $primary-color;
  }

  .lap-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    max-height: 300px;
    overflow-y: auto;
    padding: 4px;

    .lap-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background-color: $background-color;
      border-radius: 6px;
      border: 1px solid $border-color;

      .lap-label {
        font-size: 0.9rem;
        color: rgb(73, 80, 87);
        font-weight: 500;
      }
    }

    .lap-list-empty {
      color: $secondary-color;
      font-style: italic;
      text-align: center;
      padding: 40px 20px;
      background-color: $background-color;
      border-radius: 6px;
      border: 2px dashed $hover-color;
    }
  }
}

@media (max-width: 768px) {
  #app {
    padding: 16px;
  }

  .stopwatch-card h2 {
    font-size: 1.3rem;
  }

  .button-group {
    max-width: 100%;
  }

  .lap-list-empty {
    padding: 20px;
  }
}
</style>
