<script setup lang="ts">
import InstructionsModal from "../components/InstructionsModal.vue";
import { useCalculator } from "../composables/useCalculator";

const {
  expression,
  result,
  error,
  history,
  append,
  clear,
  calculate,
  restoreFromHistory
} = useCalculator();
</script>

<template>
  <div class="app">
    <InstructionsModal />
    <div class="container">
      <div class="calculator">
        <div class="display">
          <div class="expression">
            {{ expression }}
          </div>
          <div class="result">{{ error ? "Error" : result }}</div>
        </div>

        <div class="buttons">
          <button class="btn-3" @click="clear">
            <p class="label">C</p>
          </button>
          <button class="btn" @click="append('(')">
            <p class="label">(</p>
          </button>
          <button class="btn" @click="append(')')">
            <p class="label">)</p>
          </button>
          <button class="btn" @click="append('/')">
            <p class="label">÷</p>
          </button>

          <button class="btn" @click="append('7')">
            <p class="label">7</p>
          </button>
          <button class="btn" @click="append('8')">
            <p class="label">8</p>
          </button>
          <button class="btn" @click="append('9')">
            <p class="label">9</p>
          </button>
          <button class="btn" @click="append('*')">
            <p class="label">×</p>
          </button>

          <button class="btn" @click="append('4')">
            <p class="label">4</p>
          </button>
          <button class="btn" @click="append('5')">
            <p class="label">5</p>
          </button>
          <button class="btn" @click="append('6')">
            <p class="label">6</p>
          </button>
          <button class="btn" @click="append('-')">
            <p class="label">-</p>
          </button>

          <button class="btn" @click="append('1')">
            <p class="label">1</p>
          </button>
          <button class="btn" @click="append('2')">
            <p class="label">2</p>
          </button>
          <button class="btn" @click="append('3')">
            <p class="label">3</p>
          </button>
          <button class="btn" @click="append('+')">
            <p class="label">+</p>
          </button>

          <button class="btn" @click="append('0')">
            <p class="label">0</p>
          </button>
          <button class="btn" @click="append('.')">
            <p class="label">.</p>
          </button>
          <button class="btn-2" @click="calculate">
            <p class="label">=</p>
          </button>
        </div>
      </div>

      <div class="history">
        <span class="text-label">History</span>
        <div class="list">
          <ul class="list-ul">
            <li
              v-for="(item, index) in history"
              :key="index"
              @click="restoreFromHistory(item)"
              class="item"
            >
              <p class="history-label">{{ item.expression }}</p>
              <p class="history-label">= {{ item.result }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  height: 550px;
  border-radius: 15px;
  align-items: center;
  min-width: 950px;
}
.calculator {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 515px;
  padding: 10px;
  border-radius: 15px;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.btn {
  align-items: center;
  width: 85px;
  height: 60px;
  border: none;
  border-radius: 11px;
  background-color: #ffffff;
  color: #165c7d;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.btn-2 {
  align-items: center;
  width: 180px;
  height: 60px;
  border: none;
  border-radius: 11px;
  background-color: #165c7d;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.btn-3 {
  align-items: center;
  width: 85px;
  height: 60px;
  border: 1px solid #dfdfdf;
  border-radius: 11px;
  color: #165c7d;
  background-color: #e8eff2;
  cursor: pointer;
  display: flex;
  right: 0px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 33.4929px;
  justify-content: center;
}
.label {
  font-size: 18px;
  font-weight: 700;
}
.buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 370px;
  flex-wrap: wrap;
}
.display {
  width: 370px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  align-items: end;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #e8eff2;
  color: #165c7d;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.expression {
  width: 100%;
  height: 40px;
  padding: 10px 10px 10px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  font-weight: 500;
}
.expression-input {
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.result {
  height: 35px;
  padding: 5px 5px 5px 12px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
}
.history {
  padding: 15px;
  border-radius: 15px;
  min-width: 400px;
  height: 515px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.item {
  height: 65px;
  display: flex;
  justify-content: space-evenly;
  padding: 0 20px 0 20px;
  flex-direction: column;
  align-items: start;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.history-label {
  margin: 0;
}
.text-label {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 1px solid #dfdfdf;
  border-radius: 11px;
  color: #165c7d;
  background-color: #e8eff2;
  font-size: 1rem;
  font-weight: 600;
}
.list {
  height: 420px;
  overflow-y: auto;
}
.list::-webkit-scrollbar {
  display: none;
}
.list-ul {
  padding: 3px;
  margin: 0px;
}
</style>
