<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useNavigation } from "../composables/useNavigation";

const expression = ref("");
const result = ref<string | number>("");
const history = ref<string[]>([]);

const { updateNavigation } = useNavigation();

watch(result, (newResult) => {
  updateNavigation({
    status: newResult ? `Result: ${newResult}` : "",
  });
});

onMounted(() => {
  updateNavigation({
    title: "Calculator",
    icon: "fal fa-calculator",
    status: "",
  });
});

const appendToExpression = (value: string) => {
  expression.value += value;
};

const clear = () => {
  expression.value = "";
  result.value = "";
};

const deleteLast = () => {
  expression.value = expression.value.slice(0, -1);
};

const calculate = () => {
  try {
    const evalExpr = expression.value.replace(/×/g, "*").replace(/÷/g, "/");

    const calculated = new Function(`return (${evalExpr})`)();
    result.value = calculated;
    history.value.unshift(`${expression.value} = ${calculated}`);
  } catch (e) {
    result.value = "Error";
  }
};

const restoreFromHistory = (item: string) => {
  const parts = item.split("=");
  if (parts.length === 2) {
    expression.value = parts[0].trim();
    result.value = parts[1].trim();
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  const keyMap: Record<string, string> = {
    "/": "÷",
    "*": "×",
  };

  const allowed = "0123456789+-*/().";
  if (allowed.includes(e.key)) {
    appendToExpression(keyMap[e.key] || e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clear();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="calculator-container">
    <div class="display">
      <div class="expression">{{ expression || "0" }}</div>
      <div class="result">{{ result }}</div>
    </div>

    <div class="buttons">
      <button @click="clear" class="gray">C</button>
      <button @click="deleteLast" class="gray">⌫</button>
      <button @click="appendToExpression('(')" class="gray">(</button>
      <button @click="appendToExpression(')')" class="gray">)</button>

      <button @click="appendToExpression('7')">7</button>
      <button @click="appendToExpression('8')">8</button>
      <button @click="appendToExpression('9')">9</button>
      <button @click="appendToExpression('÷')" class="orange">÷</button>

      <button @click="appendToExpression('4')">4</button>
      <button @click="appendToExpression('5')">5</button>
      <button @click="appendToExpression('6')">6</button>
      <button @click="appendToExpression('×')" class="orange">×</button>

      <button @click="appendToExpression('1')">1</button>
      <button @click="appendToExpression('2')">2</button>
      <button @click="appendToExpression('3')">3</button>
      <button @click="appendToExpression('-')" class="orange">−</button>

      <button @click="appendToExpression('0')">0</button>
      <button @click="appendToExpression('.')">.</button>
      <button @click="calculate" class="equal">=</button>
      <button @click="appendToExpression('+')" class="orange">+</button>
    </div>

    <div class="history">
      <h4>History</h4>
      <ul>
        <li
          v-for="(item, index) in history"
          :key="index"
          @click="restoreFromHistory(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.calculator-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: #f9f9f9;
  font-family: "Segoe UI", sans-serif;
}

.display {
  background: #e6e6e6;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: right;
}

.expression {
  font-size: 1.2rem;
  color: #555;
}

.result {
  font-size: 1.8rem;
  font-weight: bold;
  color: #000;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

button {
  font-size: 1.2rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.2s;
}

button:hover {
  background: #dcdcdc;
}

button.gray {
  background: #ccc;
}

button.orange {
  background: #f9a825;
  color: white;
}

button.equal {
  background: #4caf50;
  color: white;
  grid-column: span 1;
}

.history {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}

.history h4 {
  margin-bottom: 0.5rem;
}

.history ul {
  list-style: none;
  padding: 0;
  max-height: 150px;
  overflow-y: auto;
}

.history li {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  font-size: 0.95rem;
}

.history li:hover {
  background-color: #f1f1f1;
}
</style>
