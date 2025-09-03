import { ref, computed } from "vue";
import dayjs from "dayjs";
import type { CalculatorButtons, HistoryItem } from "../types/calculator";

export const useCalculator = () => {
  const currentExpression = ref("");
  const currentResult = ref("");
  const history = ref<HistoryItem[]>([]);
  const showHistory = ref(false);
  const lastCalculated = ref(false);
  const error = ref("");

  const displayExpression = computed(() => currentExpression.value || "0");
  const displayResult = computed(
    () => error.value || currentResult.value || ""
  );

  const resetAfterCalc = (newExpr = "") => {
    currentExpression.value = newExpr;
    currentResult.value = "";
    lastCalculated.value = false;
    error.value = "";
  };

  const addNumber = (num: string) => {
    resetAfterCalcIfNeeded();
    currentExpression.value += num;
  };

  const addOperator = (op: string) => {
    resetAfterCalcIfNeeded(true);
    const lastChar = currentExpression.value.trim().slice(-1);
    if (!["+", "-", "×", "÷"].includes(lastChar)) {
      currentExpression.value += ` ${op} `;
    }
  };

  const addDecimal = () => {
    resetAfterCalcIfNeeded();
    const parts = currentExpression.value.split(/[\+\-\×\÷]/g);
    const lastPart = (parts.length > 0 ? parts[parts.length - 1] : "").trim();
    if (!lastPart.includes(".")) {
      currentExpression.value += lastPart === "" ? "0." : ".";
    }
  };

  const addParenthesis = (paren: string) => {
    if (paren === "(") {
      currentExpression.value += "(";
    } else {
      const open = (currentExpression.value.match(/\(/g) || []).length;
      const close = (currentExpression.value.match(/\)/g) || []).length;
      if (open > close) currentExpression.value += ")";
    }
    error.value = "";
  };

  const toggleSign = () => {
    if (lastCalculated.value && currentResult.value) {
      const num = parseFloat(currentResult.value);
      if (!isNaN(num)) {
        resetAfterCalc((-num).toString());
      }
    }
  };

  const deleteLast = () => {
    if (currentExpression.value) {
      currentExpression.value = currentExpression.value.slice(0, -1);
      resetAfterCalc();
    }
  };

  const clearEntry = () => resetAfterCalc();
  const clearAll = () => {
    currentExpression.value = "";
    clearEntry();
  };

  const resetAfterCalcIfNeeded = (useResult = false) => {
    if (lastCalculated.value) {
      currentExpression.value = useResult ? `${currentResult.value} ` : "";
      resetAfterCalc(currentExpression.value);
    }
  };

  const calculate = () => {
    if (!currentExpression.value.trim()) return;

    try {
      let expression = currentExpression.value
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/\s+/g, "");

      if (
        (expression.match(/\(/g) || []).length !==
        (expression.match(/\)/g) || []).length
      ) {
        throw new Error("Mismatched parentheses");
      }

      if (!/^[\d\+\-\*\/\(\)\.]+$/.test(expression)) {
        throw new Error("Invalid expression");
      }

      const result = Function(`"use strict"; return (${expression})`)();

      if (!isFinite(result)) throw new Error("Invalid operation");

      const resultStr = result.toString();
      currentResult.value = resultStr;
      lastCalculated.value = true;

      history.value.unshift({
        expression: currentExpression.value,
        result: resultStr,
        timestamp: new Date(),
      });

      if (history.value.length > 50) {
        history.value.length = 50;
      }

      error.value = "";
    } catch {
      error.value = "Error";
      currentResult.value = "";
    }
  };

  const restoreCalculation = (item: HistoryItem) => {
    currentExpression.value = item.expression;
    currentResult.value = item.result;
    lastCalculated.value = true;
    showHistory.value = false;
  };

  const toggleHistory = () => {
    showHistory.value = !showHistory.value;
  };

  const clearHistory = () => {
    history.value = [];
  };

  const formatTime = (timestamp: Date) => dayjs(timestamp).format("HH:mm:ss");

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (/[\d\+\-\*\/\(\)\.=]|Enter|Escape|Backspace|Delete/.test(key)) {
      event.preventDefault();
    }

    if (/\d/.test(key)) addNumber(key);
    else if (key === ".") addDecimal();
    else if (key === "+") addOperator("+");
    else if (key === "-") addOperator("-");
    else if (key === "*") addOperator("×");
    else if (key === "/") addOperator("÷");
    else if (key === "(") addParenthesis("(");
    else if (key === ")") addParenthesis(")");
    else if (key === "Enter" || key === "=") calculate();
    else if (key === "Escape") clearAll();
    else if (key === "Backspace") deleteLast();
    else if (key === "Delete") clearEntry();
  };

  const buttons: CalculatorButtons[] = [
    { label: "C", action: clearAll, class: "btn-clear" },
    { label: "CE", action: clearEntry, class: "btn-clear" },
    { iconClass: "fal fa-backspace", action: deleteLast, class: "btn-clear" },
    { label: "÷", action: () => addOperator("÷"), class: "btn-operator" },
    { label: "7", action: () => addNumber("7"), class: "btn-number" },
    { label: "8", action: () => addNumber("8"), class: "btn-number" },
    { label: "9", action: () => addNumber("9"), class: "btn-number" },
    { label: "×", action: () => addOperator("×"), class: "btn-operator" },
    { label: "4", action: () => addNumber("4"), class: "btn-number" },
    { label: "5", action: () => addNumber("5"), class: "btn-number" },
    { label: "6", action: () => addNumber("6"), class: "btn-number" },
    { label: "-", action: () => addOperator("-"), class: "btn-operator" },
    { label: "1", action: () => addNumber("1"), class: "btn-number" },
    { label: "2", action: () => addNumber("2"), class: "btn-number" },
    { label: "3", action: () => addNumber("3"), class: "btn-number" },
    { label: "+", action: () => addOperator("+"), class: "btn-operator" },
    { label: "±", action: toggleSign, class: "btn-function" },
    { label: "0", action: () => addNumber("0"), class: "btn-number" },
    { label: ".", action: addDecimal, class: "btn-number" },
    { label: "=", action: calculate, class: "btn-equals" },
    { label: "(", action: () => addParenthesis("("), class: "btn-function" },
    { label: ")", action: () => addParenthesis(")"), class: "btn-function" },
    {
      iconClass: "fal fa-history",
      action: toggleHistory,
      class: "btn-function",
    },
    { iconClass: "fal fa-trash", action: clearHistory, class: "btn-clear" },
  ];

  return {
    displayExpression,
    displayResult,
    history,
    showHistory,
    buttons,
    restoreCalculation,
    toggleHistory,
    formatTime,
    handleKeyPress,
  };
};
