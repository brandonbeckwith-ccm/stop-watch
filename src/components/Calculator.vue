<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useNavigation } from "../Composables/useNavigation";

const nav = useNavigation();

const expression = ref("");
const result = ref("");
const history = ref<string[]>([]);
const error = ref("");

watch(result, (val) => {
  nav.setStatus(val ? `Result: ${val}` : "");
});

const handleKey = (event: KeyboardEvent) => {
  const key = event.key;
  if (/[0-9+\-*/().]/.test(key)) {
    append(key === "*" ? "\u00d7" : key === "/" ? "\u00f7" : key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clear();
  }
};

onMounted(() => {
  nav.setTitle("Calculator");
  nav.setIcon("fal fa-calculator");
  nav.setStatus(result.value ? `Result: ${result.value}` : "");
  window.addEventListener("keydown", handleKey);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKey);
});

const append = (char: string) => {
  if (error.value) error.value = "";
  expression.value += char;
};

const clear = () => {
  expression.value = "";
  result.value = "";
  error.value = "";
};

const backspace = () => {
  expression.value = expression.value.slice(0, -1);
};

const calculate = () => {
  try {
    const exp = expression.value
      .replace(/\u00d7/g, "*")
      .replace(/\u00f7/g, "/");
    const evalResult = eval(exp);
    result.value = evalResult.toString();
    if (!isNaN(evalResult)) {
      history.value.unshift(`${expression.value} = ${evalResult}`);
    }
    error.value = "";
  } catch {
    result.value = "";
    error.value = "Invalid Expression";
  }
};

const restoreFromHistory = (item: string) => {
  const [prevExpr] = item.split(" = ");
  expression.value = prevExpr;
  result.value = "";
  error.value = "";
};
</script>

<template>
  <div class="calculator">
    <div class="display">
      <div class="expression">{{ expression || "0" }}</div>
      <div class="result" :class="{ error: error }">{{ error || result }}</div>
    </div>

    <div class="buttons">
      <CButton label="C" @clicked="clear" radius="xs" theme="danger" />
      <CButton label="←" @clicked="backspace" radius="xs" type="border" />
      <CButton label="(" @clicked="append('(')" radius="xs" />
      <CButton label=")" @clicked="append(')')" radius="xs" />

      <CButton label="7" @clicked="append('7')" radius="xs" />
      <CButton label="8" @clicked="append('8')" radius="xs" />
      <CButton label="9" @clicked="append('9')" radius="xs" />
      <CButton label="÷" @clicked="append('÷')" radius="xs" type="border" />

      <CButton label="4" @clicked="append('4')" radius="xs" />
      <CButton label="5" @clicked="append('5')" radius="xs" />
      <CButton label="6" @clicked="append('6')" radius="xs" />
      <CButton label="×" @clicked="append('×')" radius="xs" type="border" />

      <CButton label="1" @clicked="append('1')" radius="xs" />
      <CButton label="2" @clicked="append('2')" radius="xs" />
      <CButton label="3" @clicked="append('3')" radius="xs" />
      <CButton label="−" @clicked="append('-')" radius="xs" type="border" />

      <CButton label="0" @clicked="append('0')" radius="xs" />
      <CButton label="." @clicked="append('.')" radius="xs" type="border" />
      <CButton label="=" @clicked="calculate" radius="xs" theme="success" />
      <CButton label="+" @clicked="append('+')" radius="xs" type="border" />
    </div>

    <div class="history" v-if="history.length">
      <h3>History</h3>
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
.calculator {
  max-width: 400px;
  margin: 40px auto;
  padding: 16px;
  background: #f5f9fc;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.display {
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  word-break: break-word;
}

.expression {
  font-size: 1.1rem;
  color: #555;
  width: 100%;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result {
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
  width: 100%;
  text-align: right;
}

.result.error {
  color: #e53935;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  width: 100%;
}

.buttons > * {
  width: 100%;
  min-width: 0;
}

.history {
  margin-top: 8px;
  width: 100%;
}

.history ul {
  list-style: none;
  padding: 0;
  margin: 8px 0 0 0;
}

.history li {
  background: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  border: 1px solid #edf4fb;
}

@media (max-width: 480px) {
  .calculator {
    margin: 16px;
    padding: 12px;
  }

  .buttons {
    gap: 6px;
  }

  .expression {
    font-size: 1rem;
  }

  .result {
    font-size: 1.25rem;
  }
}
</style>
