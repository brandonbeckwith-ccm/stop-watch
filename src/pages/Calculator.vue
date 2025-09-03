<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { useCalculator } from "../composables/useCalculator";
import { onMounted, onUnmounted, watch } from "vue";
import { useNavigation } from "../composables/useNavigation";

const { setNavigation } = useNavigation();

const {
  currentInput,
  appendInput,
  result,
  history,
  clearInput,
  calculate,
  deleteLast,
  restoreFromHistory,
} = useCalculator();

const handleKeyPress = (k: KeyboardEvent) => {
  const key = k.key;

  if (/[\d+\-*/().]/.test(key)) {
    appendInput(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key.toLowerCase() === "c") {
    clearInput();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyPress);
  setNavigation("Calculator", "fal fa-calculator", `Result: ${result.value}`);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyPress);
});

watch(result, (newResult) => {
  setNavigation("Calculator", "fal fa-calculator", `Result: ${newResult}`);
});
</script>
<template>
  <div class="calculator">
    <div class="display">
      <div class="expression">{{ currentInput }}</div>
      <div class="result">{{ result }}</div>
    </div>
    <div class="buttons">
      <CButton label="C" @clicked="clearInput" type="border" radius="xxs" />
      <CButton label="⌫" @clicked="deleteLast" type="border" radius="xxs" />
      <CButton
        label="("
        @clicked="appendInput('(')"
        type="border"
        radius="xxs"
      />
      <CButton
        label=")"
        @clicked="appendInput(')')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="7"
        @clicked="appendInput('7')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="8"
        @clicked="appendInput('8')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="9"
        @clicked="appendInput('9')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="%"
        @clicked="appendInput('/')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="4"
        @clicked="appendInput('4')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="5"
        @clicked="appendInput('5')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="6"
        @clicked="appendInput('6')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="*"
        @clicked="appendInput('*')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="1"
        @clicked="appendInput('1')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="2"
        @clicked="appendInput('2')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="3"
        @clicked="appendInput('3')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="-"
        @clicked="appendInput('-')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="0"
        @clicked="appendInput('0')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="."
        @clicked="appendInput('.')"
        type="border"
        radius="xxs"
      />
      <CButton
        label="="
        class="equals"
        @clicked="calculate"
        type="border"
        radius="xxs"
      />
      <CButton
        label="+"
        @clicked="appendInput('+')"
        type="border"
        radius="xxs"
      />
    </div>

    <div class="history">
      <h3>History</h3>
      <ul>
        <li
          v-for="item in history"
          :key="item.expression"
          @click="restoreFromHistory(item)"
        >
          <span class="exp">{{ item.expression }}</span>
          <span class="res">{{ item.result }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.calculator {
  max-width: 460px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: auto;
  padding: 1rem;
  border-radius: 12px;
  background: #1e1e1e;
  color: white;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .display {
    height: 5rem;
    margin-bottom: 1rem;
    background: #2d2d2d;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: right;
    font-family: monospace;

    .expression {
      font-size: 1rem;
      color: #bbb;
    }

    .result {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
    }
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;

    .c-button {
      padding: 0.5rem;
      font-size: 0.9rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      background: #2d2d2d;
      color: white;
      transition: background 0.2s;
    }

    .c-button:hover {
      background: #3a3a3a;
    }

    .equals {
      grid-column: span 2;
      background: #ff7043;
      color: white;
      font-weight: bold;
    }
  }

  .history {
    max-height: 100px;
    overflow-y: auto;
    background: #2d2d2d;
    padding: 0.5rem;
    border-radius: 6px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 0.25rem 0.5rem;
      cursor: pointer;
    }

    li:hover {
      background: #3a3a3a;
    }

    .exp {
      color: #ccc;
    }

    .res {
      color: #81c784;
      font-weight: bold;
      float: right;
    }
  }
}
</style>
