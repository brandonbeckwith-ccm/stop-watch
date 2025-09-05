import { ref, onMounted, onBeforeUnmount} from "vue";

export type HistoryItem = {
    expression: string;
    result: number;
}
export const result = ref<string | number>('');

export const useCalculator = () => {
    const expression = ref<string>('');
    const error = ref<boolean>(false);
    const history = ref<HistoryItem[]>([]);

    const append = (char: string): void => {
        expression.value += char;
        error.value = false;
    };

    const clear = (): void => {
        expression.value = "";
        result.value = "";
        error.value = false;
    };

    const calculate = (): void => {
        if (!expression.value) return;
        try {
            const newExpression = expression.value.replace(/÷/g, "/").replace(/×/g, "*");
            result.value = eval(newExpression);
            error.value = false;
            history.value.unshift({ expression: expression.value, result: result.value as number });
        } catch (_) {
            result.value = "";
            error.value = true;
        }
    };

    const restoreFromHistory = (item: HistoryItem): void => {
        expression.value = item.expression;
        result.value = item.result;
        error.value = false;
    };

    const handleKey = (e: KeyboardEvent): void => {
        if (/^[0-9+\-*/().]$/.test(e.key)) {
            append(e.key);
        } else if (e.key === "Enter") {
            calculate();
        } else if (e.key === "Backspace") {
            expression.value = expression.value.slice(0, -1);
        } else if (e.key === "Escape") {
            clear();
        }
    };

    onMounted(() => {
        window.addEventListener("keydown", handleKey);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("keydown", handleKey);
    });

    return {
        expression,
        result,
        error,
        history,
        append,
        clear,
        calculate,
        restoreFromHistory
    }
}


