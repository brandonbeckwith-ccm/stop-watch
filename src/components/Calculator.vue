<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useCalculator } from "../composables/useCalculator";
import { CButton, CIcon } from "@ccm-engineering/ui-components";
import { useNavigation } from "../composables/useNavigation";

const { setTitle } = useNavigation();

const {
  displayExpression,
  displayResult,
  history,
  showHistory,
  buttons,
  restoreCalculation,
  toggleHistory,
  formatTime,
  handleKeyPress,
} = useCalculator();

onMounted(() => {
  setTitle("Calculator");
  document.addEventListener("keydown", handleKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyPress);
});
</script>

<template>
  <div class="calculator-app">
    <div class="calculator">
      <div class="display-section">
        <div class="expression">{{ displayExpression || "0" }}</div>
        <div class="result">{{ displayResult }}</div>
      </div>

      <div class="button-grid">
        <CButton
          v-for="(btn, idx) in buttons"
          :key="idx"
          :label="btn.label || ''"
          :icon-class="btn.iconClass"
          :class="btn.class"
          size="size-48"
          radius="xs"
          @clicked="btn.action"
        />
      </div>
    </div>

    <div v-if="showHistory" class="history-panel">
      <div class="history-header">
        <h3>History</h3>
        <CIcon icon="fal fa-times" @click="toggleHistory" hover />
      </div>
      <div class="history-content">
        <div v-if="history.length === 0" class="no-history">
          No calculations yet
        </div>
        <div
          v-for="(item, index) in history"
          :key="index"
          @click="restoreCalculation(item)"
          class="history-item"
        >
          <div class="history-expression">{{ item.expression }}</div>
          <div class="history-result">= {{ item.result }}</div>
          <div class="history-time">{{ formatTime(item.timestamp) }}</div>
        </div>
      </div>
    </div>
    <div v-if="showHistory" @click="toggleHistory" class="overlay"></div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/calculator.scss";
</style>
