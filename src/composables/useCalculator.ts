import { computed, ref } from "vue";
import type { History } from "../types/calculator";
import { evaluate } from "mathjs";

export const useCalculator = () => {
  const currentInput = ref("");
  const result = computed(() => {
    try {
      return currentInput.value ? evaluate(currentInput.value) : "";
    } catch {
      return "";
    }
  });
  const history = ref<History[]>([]);

  const appendInput = (value: string) => {
    currentInput.value += value;
  };

  const clearInput = () => {
    currentInput.value = "";
  };

  const deleteLast = () => {
    currentInput.value = currentInput.value.slice(0, -1);
  };

  const calculate = () => {
    try {
      if (!currentInput.value) {
        throw new Error("Invalid Expression");
      }

      const evaluated = eval(currentInput.value);
      history.value.unshift({
        expression: currentInput.value,
        result: evaluated,
      });

      currentInput.value = String(evaluated);
    } catch (e: unknown) {
      currentInput.value = "Invalid Input";
    }
  };

  const restoreFromHistory = (item: History) => {
    currentInput.value = item.expression;
  };

  return {
    currentInput,
    appendInput,
    result,
    history,
    clearInput,
    calculate,
    deleteLast,
    restoreFromHistory,
  };
};
