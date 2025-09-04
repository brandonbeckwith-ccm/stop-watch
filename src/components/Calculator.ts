import { ref, onMounted, onBeforeUnmount } from "vue";

export const useCalculator = () => {
  const expression = ref("");
  const result = ref("0");
  const history = ref<string[]>([]);

  const buttons = [
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "(",
    ")",
    "C",
    "=",
    "+",
  ];

  const press = (val: string) => {
    if (val === "C") {
      expression.value = "";
      result.value = "0";
      return;
    }
    if (val === "=") {
      calculate();
      return;
    }
    expression.value += val;
  };

  const calculate = () => {
    try {
      const safe = expression.value.replace(/×/g, "*").replace(/÷/g, "/");
      const ans = eval(safe);
      result.value = String(ans);
      history.value.unshift(`${expression.value} = ${result.value}`);
      if (history.value.length > 10) history.value.pop();
      expression.value = result.value;
    } catch {
      result.value = "Error";
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if ("0123456789+-*/().".includes(e.key)) {
      expression.value += e.key.replace("*", "×").replace("/", "÷");
    } else if (e.key === "Enter") {
      calculate();
    } else if (e.key === "Backspace") {
      expression.value = expression.value.slice(0, -1);
    } else if (e.key.toLowerCase() === "c") {
      expression.value = "";
      result.value = "0";
    }
  };

  onMounted(() => window.addEventListener("keydown", handleKey));
  onBeforeUnmount(() => window.removeEventListener("keydown", handleKey));

  return {
    expression,
    result,
    history,
    buttons,
    press,
  };
};
