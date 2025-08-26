import { ref } from "vue";

export const expression = ref("");
export const result = ref("0");
export const history = ref<string[]>([]);

export const buttons = [
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
  "C",
  "=",
  "+",
];

export const press = (val: string) => {
  if (val === "C") {
    expression.value = "";
    result.value = "0";
  } else if (val === "=") {
    calculate();
  } else {
    expression.value += val;
  }
};

export const calculate = () => {
  try {
    const safe = expression.value.replace(/×/g, "*").replace(/÷/g, "/");
    result.value = String(eval(safe));
    history.value.unshift(`${expression.value} = ${result.value}`);
    if (history.value.length > 5) history.value.pop();
    expression.value = result.value;
  } catch {
    result.value = "Error";
  }
};
