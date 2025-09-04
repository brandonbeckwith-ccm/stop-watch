<script setup lang="ts">
import { computed } from "vue";
import { CButton, CTag } from "@ccm-engineering/ui-components";
import {
  formatTime,
  isRunning,
  lap,
  laps,
  reset,
  start,
  stop,
  time,
} from "../helpers/stopwatch";

const toggleLabel = computed(() => (isRunning.value ? "Stop" : "Start"));
const toggleAction = () => {
  isRunning.value ? stop() : start();
};
</script>

<template>
  <div>
    <!-- <h1>Stopwatch Assignment</h1> -->

    <div class="wrapper">
      <div class="box has-background-light left">
        <h1 class="is-size-1 has-text-weight-bold">
          {{ formatTime(time) }}
        </h1>

        <div class="buttons-wrapper">
          <CButton :label="toggleLabel" @clicked="toggleAction" radius="xxs" />
          <CButton
            label="Lap"
            @clicked="lap"
            :disable="!isRunning"
            radius="xxs"
          />
          <CButton label="Reset" @clicked="reset" radius="xxs" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 25px;
}

.left,
.right {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
}

.buttons-wrapper {
  display: flex;
  gap: 10px;
}

@media (max-width: 900px) {
  .wrapper {
    flex-direction: column;
  }
}
</style>
