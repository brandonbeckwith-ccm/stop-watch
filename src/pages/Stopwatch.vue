<script setup lang="ts">
import { CButton, CTag } from "@ccm-engineering/ui-components";
import { useStopwatch } from "../composables/useStopwatch";
import { computed, onMounted, watch } from "vue";
import Column from "primevue/column";
import { CCMDataTable } from "@ccm-engineering/ccm-data-table";
import { useNavigation } from "../composables/useNavigation";

const { start, laps, elapsed, stop, reset, formatTime, lap, isRunning } =
  useStopwatch();

const { setNavigation } = useNavigation();
const handleStart = () => {
  start();
};
const handleLap = () => {
  lap();
};
const handleStop = () => {
  stop();
};

const handleReset = () => {
  reset();
};

const formattedTime = computed(() => formatTime(elapsed.value));

onMounted(() => {
  setNavigation(
    "Stop Watch",
    "fal fa-hourglass",
    `timer: ${formattedTime.value}`
  );
});

watch(formattedTime, (newVal) => {
  setNavigation("Stop Watch", "fal fa-hourglass", `timer: ${newVal}`);
});
</script>

<template>
  <div class="stopwatch-page">
    <div class="stopwatch-container">
      <!-- <div class="header">
        <h1>Stopwatch</h1>
      </div> -->
      <CTag :label="formattedTime" size="medium-32" class="stopwatch-time" />
      <div class="buttons">
        <CButton
          label="Start"
          icon-class="fal fa-play"
          @clicked="handleStart"
          :disabled="isRunning"
          icon-position="left"
        />
        <CButton
          label="Stop"
          icon-class="fal fa-stop"
          @clicked="handleStop"
          theme="danger"
          type="border"
          icon-position="left"
        />
        <CButton
          label="Lap"
          icon-class="fal fa-flag"
          @clicked="handleLap"
          icon-position="left"
        />
        <CButton
          label="Reset"
          icon-class="fal fa-xmark"
          @clicked="handleReset"
          type="border"
          icon-position="left"
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
.stopwatch-page {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.stopwatch-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  text-align: center;
  margin: auto;
}

h1 {
  font-weight: 650;
  font-size: 1.5rem;
  margin-top: 100px;
}

.stopwatch-time {
  margin: 0 auto;
}

.buttons {
  display: flex;
  gap: 13px;
  justify-content: center;
  margin: 30px 0 0 10px;
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
