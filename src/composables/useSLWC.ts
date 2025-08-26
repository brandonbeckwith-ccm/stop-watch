import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const isRunning = ref(false);
const elapsedTime = ref(0);
const intervalId = ref<number | null>(null);
const laps = ref<number[]>([]);

let startTime = 0;
const formattedTime = computed(() => formatTime(elapsedTime.value));

const start = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        startTime = Date.now() - elapsedTime.value;
        intervalId.value = window.setInterval(() => {
            elapsedTime.value = Date.now() - startTime;
        }, 10);
    }
};

const stop = () => {
    if (isRunning.value && intervalId.value !== null) {
        clearInterval(intervalId.value);
        intervalId.value = null;
        isRunning.value = false;
    }
};

const reset = () => {
    stop();
    elapsedTime.value = 0;
    laps.value = [];
};

const recordLap = () => {
    if (isRunning.value) {
        laps.value.push(elapsedTime.value);
    }
};

function formatTime(num: number) {
    const totalSeconds = Math.floor(num / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = num % 1000;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}.${String(milliseconds).padStart(3, "0")}`;
}


/* ---------------- STOPWATCH COMPOSABLE ---------------- */
export function useStopWatchComposable() {
    return {
        isRunning,
        elapsedTime,
        intervalId,
        laps,
        formattedTime,
        start,
        stop,
        reset,
        recordLap,
        formatTime,
    };
}

/* ---------------- WORLD CLOCKS COMPOSABLE ---------------- */
export function useWorldClocksComposable() {
    const clocks = ref<string[]>([]);
    const validatedClock = ref<string | null>(null);

    const history = ref<string[][]>([]);
    const future = ref<string[][]>([]);

    const timezones = Intl.supportedValuesOf("timeZone");

    const saved = localStorage.getItem("worldClocksState");
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            clocks.value = parsed.clocks || [];
            history.value = parsed.history || [];
            future.value = parsed.future || [];
        } catch {
            clocks.value = [];
            history.value = [];
            future.value = [];
        }
    }

    // Persist state whenever it changes
    watch(
        [clocks, history, future],
        ([c, h, f]) => {
            localStorage.setItem(
                "worldClocksState",
                JSON.stringify({
                    clocks: c,
                    history: h,
                    future: f,
                })
            );
        },
        { deep: true }
    );

    const addClock = () => {
        if (validatedClock.value && !clocks.value.includes(validatedClock.value)) {
            history.value.push([...clocks.value]);
            clocks.value.push(validatedClock.value);
            validatedClock.value = null;
            future.value = [];
        }
    };

    const removeClock = (index: number) => {
        history.value.push([...clocks.value]);
        clocks.value.splice(index, 1);
        future.value = [];
    };

    const tick = ref(Date.now());
    let intervalId: number | null = null;

    onMounted(() => {
        intervalId = window.setInterval(() => {
            tick.value = Date.now();
        }, 1000);
    });

    onUnmounted(() => {
        if (intervalId) clearInterval(intervalId);
    });

    const getTime = (tz: string) => {
        tick.value;
        return new Date().toLocaleTimeString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    const undo = () => {
        if (history.value.length > 0) {
            future.value.push([...clocks.value]);
            const prev = history.value.pop();
            if (prev) clocks.value = [...prev];
        }
    };

    const redo = () => {
        if (future.value.length > 0) {
            history.value.push([...clocks.value]);
            const next = future.value.pop();
            if (next) clocks.value = [...next];
        }
    };

    const filteredTimezones = computed(() =>
        timezones.filter((tz: any) => !clocks.value.includes(tz))
    );

    return {
        clocks,
        validatedClock,
        addClock,
        removeClock,
        getTime,
        undo,
        redo,
        filteredTimezones,
    };
}

/* ---------------- CALCULATOR COMPOSABLE ---------------- */
const currentInput = ref("");
const result = ref("");
const history = ref<{ input: string; result: string }[]>([]);

function inputKey(key: string) {
    currentInput.value += key;
}

function clearAll() {
    currentInput.value = "";
    result.value = "";
}

function calculate() {
    try {
        // Replace display symbols for eval
        const expression = currentInput.value
            .replace(/÷/g, "/")
            .replace(/×/g, "*");

        // eslint-disable-next-line no-eval
        const evalResult = eval(expression);

        result.value = String(evalResult);
        history.value.unshift({ input: currentInput.value, result: result.value });
    } catch (e) {
        result.value = "Error";
    }
}

function restoreHistory(item: { input: string; result: string }) {
    currentInput.value = item.input;
    result.value = item.result;
}

// Support keyboard typing like Google Calculator
window.addEventListener("keydown", (e) => {
    if (/[0-9+\-*/().]/.test(e.key)) {
        inputKey(e.key);
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Backspace") {
        currentInput.value = currentInput.value.slice(0, -1);
    } else if (e.key.toLowerCase() === "c") {
        clearAll();
    }
});

export function useCalculatorComposable() {
    return {
        currentInput,
        result,
        history,
        inputKey,
        clearAll,
        calculate,
        restoreHistory,
    };
}

