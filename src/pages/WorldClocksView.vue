<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";
import { useNavigation, useWorldClocksComposable } from "../composables/useSLWC";
import { CButton, CMultipleSelect } from "@ccm-engineering/ui-components";

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

const nav = useNavigation();
let intervalId: number | null = null;

function updateStatus() {
  if (clocks.value.length > 0) {
    nav.setStatus(`${clocks.value.length} clocks • ${getTime(clocks.value[0])}`);
  } else {
    nav.setStatus("No clocks");
  }
}

onMounted(() => {
  nav.setTitle("World Clocks");
  nav.setIcon("fa-solid fa-globe");
  updateStatus();
  intervalId = window.setInterval(updateStatus, 1000);
});

onUnmounted(() => {
  if (intervalId) window.clearInterval(intervalId);
});

watch(clocks, () => {
  updateStatus();
});
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
