<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopwatch } from "../composables/useStopwatch";
import { formatTimeInMs } from "../utils/formatter";
import { onMounted } from "vue";
import { useNavigation } from "../composables/useNavigation";

const {
  elapsedTime,
  laps,
  isResetDisabled,
  isStarted,
  addLap,
  triggerHandler,
  resetHandler,
} = useStopwatch();

const { setTitle } = useNavigation();

onMounted(() => {
  setTitle("Stopwatch");
});
</script>

<template>
  <div class="stopwatch">
    <h1>Stopwatch Assignment</h1>

    <div class="grid-container">
      <div class="card stopwatch-card">
        <h2>Stopwatch</h2>
        <div class="stopwatch-controls">
          <div class="time-display">
            <label class="time-label">Current Time</label>
            <CTag
              :label="formatTimeInMs(elapsedTime)"
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
              :label="formatTimeInMs(l)"
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
@use "../styles/stopwatch.scss";
</style>
