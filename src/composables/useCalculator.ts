import { ref, watch } from "vue";
type HistoryEntry = { expression: string; result: string };

export function useCalculator() {
  const expression = ref("");
  const result = ref("0");

  let initialHistory: HistoryEntry[] = [];
  try {
    const saved = localStorage.getItem("calc_history");
    if (saved) initialHistory = JSON.parse(saved);
  } catch {}

  const history = ref<HistoryEntry[]>(initialHistory);

  watch(
    history,
    (newHistory) => {
      localStorage.setItem("calc_history", JSON.stringify(newHistory));
    },
    { deep: true }
  );

  const append = (character: string) => {
    expression.value += character;
  };

  const clear = () => {
    expression.value = "";
    result.value = "0";
  };

  const backspace = () => {
    expression.value = expression.value.slice(0, -1);
  };

  const calculate = () => {
    try {
      const numericResult = eval(expression.value);
      result.value = numericResult.toLocaleString();

      if (expression.value.trim() !== "") {
        history.value.push({
          expression: expression.value,
          result: result.value,
        });
      }
    } catch {
      result.value = "Error";
    }
  };

  const clearHistory = () => {
    history.value = [];
    localStorage.removeItem("calc_history");
  };

  return {
    expression,
    result,
    append,
    clear,
    backspace,
    calculate,
    history,
    clearHistory,
  };
}
