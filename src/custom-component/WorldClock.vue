<script setup lang="ts">
import { onMounted } from "vue";
import Clock from "./Clock.vue";
import {
  CButton,
  CMultipleSelect,
} from "@ccm-engineering/ui-components";
import { useWorldClock } from "../composables/worldClock";

const {selectedTimeZone,getClocks,addClock,timeZones,removeClock,clocks} = useWorldClock()
onMounted(()=>{
    getClocks()
})
</script>
<template>
  <div class="outer-wrapper">
    <div class="add-clock">
      <div>
        <CMultipleSelect
          :options="timeZones"
          label="label"
          mode="single"
          size="size-40"
          v-model="selectedTimeZone"
        ></CMultipleSelect>
      </div>
      <div class="add-button">
        <CButton
          label="Add Clock"
          theme="success"
          size="size-44"
          type="border"
          @click="addClock"
        ></CButton>
      </div>
    </div>
    <div class="world-clock-wrapper">
      <Clock
        v-for="clock in clocks"
        :key="clock.id"
        :tz="clock.timezone"
        :label="clock.label"
        :id="clock.id"
        @remove="removeClock"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.outer-wrapper {
  justify-content: center;
}
.add-clock {
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  gap: 2rem;
  border-radius: 12px;
  padding: 2rem;
  margin: 20px auto;
  width: 500px;
  height: 100px;
  justify-content: center;
  background-color: white;
}
.world-clock-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ 4 clocks per row */
  gap: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 2rem;
  margin: 20px auto;
  width: fit-content;
  background-color: white;
}
</style>
