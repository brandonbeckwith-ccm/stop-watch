<script setup lang="ts">
import { CButton, CMultipleSelect } from "@ccm-engineering/ui-components";
import { useWorldClocksComposable } from "../composables/useSLW";

const {
  clocks,
  addClock,
  removeClock,
  getTime,
  validatedClock,
  undo,
  redo,
  filteredTimezones,
} = useWorldClocksComposable();
</script>

<template>
  <div class="clocks-view">
    <h2>World Clocks</h2>

    <div class="clock-list">
      <div v-for="(clock, index) in clocks" :key="clock" class="clock-item">
        <span>{{ clock }}: {{ getTime(clock) }}</span>
        <CButton
          icon-class="fa-solid fa-xmark"
          label="Remove"
          icon-position="left"
          size="size-32"
          @click="removeClock(index)"
        />
      </div>
    </div>

    <div class="add-clock">
      <CMultipleSelect
        v-model="validatedClock"
        :options="filteredTimezones"
        mode="single"
        placeholder="Search or select timezone..."
      />
      <div class="function-btns">
        <CButton label="Add Clock" @click="addClock" />
        <CButton label="Undo" @click="undo" />
        <CButton label="Redo" @click="redo" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.function-btns {
  display: flex;
  justify-content: space-between;
}

.clocks-view {
  padding: 20px;
  text-align: center;
}
.clock-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.clock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-clock {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
