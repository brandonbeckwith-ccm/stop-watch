<script setup lang="ts">
import { onUnmounted } from "vue";
import {
  CButton,
  CTag,
  CLabelValueCapsule,
} from "@ccm-engineering/ui-components";
import { useStopWatch } from "./composables/useStopWatch";

const { formatTime, laps, isRunning, interval, start, stop, reset, lap } = useStopWatch();

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div id="app">
    <h1>Stopwatch Assignment</h1>
    <div class="stopwatch">
      <div class="watch">
        <CTag
          :label="formatTime"
          :showBullet="false"
          size="medium-32"
          class="customTag"
        />
      </div>

      <div class="action-buttons">
        <CButton
          @click="start"
          :disable="isRunning"
          label="Start"
          size="size-40"
        />
        <CButton
          @click="stop"
          :disable="!isRunning"
          label="Stop"
          size="size-40"
        />
        <CButton 
          @click="reset" 
          label="Reset" 
          size="size-40" 
        />
        <CButton
          @click="lap"
          :disable="!isRunning"
          label="Lap"
          size="size-40"
        />
      </div>

      <div class="laps">
        <ul class="lap-ul">
          <li v-for="(lap, index) in laps" :key="index" class="lap-li">
            <CLabelValueCapsule
              :label="`#${lap.id.toString()}`"
              :value="lap.timeString"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stopwatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  border: 1px solid;
}
::v-deep(.c-tag-value) {
  font-size: 20px;
}
::v-deep(.c-tag-rounded) {
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.watch {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
  width: 450px;
  height: 100px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.customTag {
  width: 150px;
  height: 50px;
  font-variant-numeric: tabular-nums;
}
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 7px;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 50px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.lap-li {
  list-style: none;
  padding-bottom: 10px;
}
.lap-ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px;
  padding: 0;
  margin: 0;
}
.laps {
  display: flex;
  justify-content: center;
  height: 150px;
  border-radius: 15px;
  width: 750px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  overflow-y: auto;
}
</style>
