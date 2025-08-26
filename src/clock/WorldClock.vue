<script setup lang="ts">
import { CButton, CMultipleSelect } from "@ccm-engineering/ui-components";
import { useWorldClock } from "../helpers/clock";
import Clock from "../../src/clock/ClockDial.vue";

const { timeZones, selectedTimeZone, addClock, clocks, removeClock } =
  useWorldClock();
</script>

<template>
  <div class="main-container">
    <div class="card stopwatch-card">
      <h2 class="title">Select Timezone</h2>
      <div class="outer-wrapper">
        <div class="add-clock btn-row">
          <div>
            <CMultipleSelect
              :options="timeZones"
              label="label"
              mode="single"
              v-model="selectedTimeZone"
            ></CMultipleSelect>
          </div>
          <div class="add-button">
            <CButton
              label="Add"
              @click="addClock"
              type="border"
              radius="xxs"
              icon-class="fal fa-plus"
              icon-position="left"
              size="size-36"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card laps-card">
      <h2 class="title">World Clock</h2>
      <div v-if="clocks.length" class="world-clock-wrapper all-clocks-wrapper">
        <Clock
          v-for="clock in clocks"
          :key="clock.id"
          :tz="clock.timezone"
          :label="clock.label"
          :id="clock.id"
          @remove="removeClock"
        />
      </div>
      <div v-else> No selected timezones to show</div>
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