<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { useCalculatorComposable } from "../composables/useSLWC";

const {
  currentInput,
  result,
  history,
  inputKey,
  clearAll,
  calculate,
  restoreHistory,
} = useCalculatorComposable();
</script>

<template>
  <div class="calculator">
    <!-- Display -->
    <div class="display">
      <div class="calculation">{{ currentInput || "0" }}</div>
      <div class="result">{{ result }}</div>
    </div>

    <!-- Buttons -->
    <div class="buttons">
      <CButton @click="clearAll" label="C" theme="neutral" />
      <CButton @click="inputKey('(')" label="(" theme="neutral" />
      <CButton @click="inputKey(')')" label=")" theme="neutral" />
      <CButton @click="inputKey('/')" label="÷" theme="primary" />

      <CButton @click="inputKey('7')" label="7" theme="neutral" />
      <CButton @click="inputKey('8')" label="8" theme="neutral" />
      <CButton @click="inputKey('9')" label="9" theme="neutral" />
      <CButton @click="inputKey('*')" label="×" theme="primary" />

      <CButton @click="inputKey('4')" label="4" theme="neutral" />
      <CButton @click="inputKey('5')" label="5" theme="neutral" />
      <CButton @click="inputKey('6')" label="6" theme="neutral" />
      <CButton @click="inputKey('-')" label="−" theme="primary" />

      <CButton @click="inputKey('1')" label="1" theme="neutral" />
      <CButton @click="inputKey('2')" label="2" theme="neutral" />
      <CButton @click="inputKey('3')" label="3" theme="neutral" />
      <CButton @click="inputKey('+')" label="+" theme="primary" />

      <CButton
        @click="inputKey('0')"
        label="0"
        class="col-span-2"
        theme="neutral"
      />
      <CButton @click="inputKey('.')" label="." theme="neutral" />
      <CButton @click="calculate" label="=" theme="primary" />
    </div>

    <!-- History -->
    <div class="history" v-if="history.length">
      <h3>History</h3>
      <div
        v-for="(item, idx) in history"
        :key="idx"
        class="history-item"
        @click="restoreHistory(item)"
      >
        <div class="equation">{{ item.input }}</div>
        <div class="result">= {{ item.result }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  margin: auto;
  padding: 20px;
}
.display {
  background: #222;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: right;
}
.calculation {
  font-size: 20px;
  color: #bbb;
}
.result {
  font-size: 28px;
  font-weight: bold;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.col-span-2 {
  grid-column: span 2;
}
.history {
  margin-top: 20px;
}
.history-item {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.history-item:hover {
  background: #f5f5f5;
}
</style>
