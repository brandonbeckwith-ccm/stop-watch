<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCalculator } from "../composables/useCalculator";

const {expression,result,append,clear,backspace,calculate,history,clearHistory,} = useCalculator();
const showHistory = ref(false);

const toggleHistory = () => {
  showHistory.value = !showHistory.value;
}

const loadFromHistory = (item: { expression: string; result: string }) => {
  expression.value = item.expression;
  result.value = item.result;
  showHistory.value = false;
}

const handleKeyDown = (e: KeyboardEvent) => {
  const allowedKeys = ["0","1","2","3","4","5","6","7","8","9","+","-","*","/",".","(",")"];

  if (allowedKeys.includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Escape") {
    clear();
  } else {
    e.preventDefault();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="calculator-container">
    <div class="background-circle"></div>

    <div class="calculator">
      <div class="display">
        <span class="expression">{{ expression }}</span>
        <span class="result">{{ result }}</span>
      </div>

      <button class="btn history-btn" @click="toggleHistory">History</button>

      <div class="buttons">
        <button class="btn" @click="append('(')">(</button>
        <button class="btn" @click="append(')')">)</button>
        <button class="btn danger" @click="clear">Ac</button>
        <button class="btn" @click="backspace">⌫</button>

        <button class="btn" @click="append('/')">/</button>
        <button class="btn" @click="append('*')">*</button>
        <button class="btn" @click="append('-')">-</button>
        <button class="btn" @click="append('+')">+</button>

        <button class="btn" @click="append('7')">7</button>
        <button class="btn" @click="append('8')">8</button>
        <button class="btn" @click="append('9')">9</button>
        <button class="btn equals" @click="calculate">=</button>

        <button class="btn" @click="append('4')">4</button>
        <button class="btn" @click="append('5')">5</button>
        <button class="btn" @click="append('6')">6</button>

        <button class="btn" @click="append('1')">1</button>
        <button class="btn" @click="append('2')">2</button>
        <button class="btn" @click="append('3')">3</button>

        <button class="btn zero" @click="append('0')">0</button>
        <button class="btn" @click="append('.')">.</button>
      </div>
    </div>

    <div v-if="showHistory" class="modal-overlay" @click.self="toggleHistory">
      <div class="modal-content">
        <div class="modal-header">
          <h4>History</h4>
          <span class="badge">{{ history.length }}</span>
        </div>
        <div v-if="history.length === 0" class="history-empty">
          No calculations yet
        </div>
        <ul v-else class="history-list">
          <li
            v-for="(item, index) in history"
            :key="index"
            @click="loadFromHistory(item)"
            class="history-item"
          >
            <div class="calc">
              <div class="calc-expression">{{ item.expression }}</div>
              <div class="calc-result">= {{ item.result }}</div>
            </div>
            <div class="calc-action">Load</div>
          </li>
        </ul>
        <div class="modal-buttons">
          <button class="btn clear-btn" @click="clearHistory">Clear All</button>
          <button class="btn close-btn" @click="toggleHistory">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.background-circle {
  position: absolute;
  width: 320px;
  height: 320px;
  background: #4caf50;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.25;
  top: 30%;
  left: 35%;
}

.calculator {
  position: relative;
  width: 280px;
  padding: 20px;
  border-radius: 24px;
  background-color: #2c2c3a;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.display {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 16px;
  min-height: 64px;
  width: 100%;
}

.expression {
  font-size: 14px;
  color: #ccc;
  word-wrap: break-word;
  min-height: 18px;
  max-width: 100%;
}

.result {
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  line-height: 1.2;
  min-height: 36px;
  max-width: 100%;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.btn {
  padding: 12px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  background: #3a3a4d;
  border: none;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn:active {
  transform: scale(0.95);
  background: #4c4c5e;
}

.equals {
  grid-row: span 2;
  background: #4caf50;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.zero {
  grid-column: span 2;
}

.danger {
  background: #dc3545;
  color: #fff;
}

.danger:hover {
  background: #c82333;
}

.danger:active {
  background: #bd2130;
}

.history-btn {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 12px;
  width: fit-content;
  margin-bottom: 12px;
  background: #6c63ff;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #3c3c50;
  padding: 20px;
  border-radius: 16px;
  width: 280px;
  max-height: 320px;
  color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.badge {
  background: #2196f3;
  color: #fff;
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 700;
}

.history-empty {
  font-size: 14px;
  color: #cfd8dc;
  text-align: center;
  padding: 24px 0;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  padding-right: 4px;
  flex: 1;
  min-height: 0;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  margin: 6px 0;
  background: #2f2f42;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease, border-color 0.2s ease;
}

.history-item:hover {
  background: #383854;
  border-color: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}

.calc {
  display: flex;
  flex-direction: column;
  max-width: 75%;
}

.calc-expression {
  font-size: 14px;
  color: #e0e0e0;
  word-break: break-word;
}

.calc-result {
  font-size: 13px;
  color: #90caf9;
  margin-top: 2px;
}

.calc-action {
  font-size: 12px;
  color: #cfd8dc;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 4px 8px;
  border-radius: 999px;
}

.modal-buttons {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.modal-buttons .btn {
  flex: 1;
}

.history-list::-webkit-scrollbar {
  width: 6px;
}
.history-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}
</style>
