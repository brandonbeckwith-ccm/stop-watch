import { useStorage } from "@vueuse/core";
import moment from "moment-timezone";
import { ref, computed, onMounted, onUnmounted, readonly, provide, inject } from "vue";
import { useToast } from 'vue-toastification';

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

    const clocks = useStorage<string[]>("world-clocks:clocks", []);
    const history = useStorage<string[][]>("world-clocks:history", []);
    const future = useStorage<string[][]>("world-clocks:future", []);

    const validatedClock = ref<string | null>(null);
    const tick = ref(Date.now());

    const timezones = moment.tz.names();

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
        tick.value; // reactive trigger
        return moment().tz(tz).format("hh:mm:ss A");
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
        timezones.filter((tz) => !clocks.value.includes(tz))
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
export function useCalculatorComposable() {
    const currentInput = ref("");
    const result = ref("");
    const history = ref<{ input: string; result: string }[]>([]);
    const toast = useToast()

    function inputKey(key: string) {
        currentInput.value += key;
    }

    function clearAll() {
        currentInput.value = "";
        result.value = "";
    }

    function calculate() {
        try {
            if (!currentInput.value.trim()) {
                toast.error("Empty expression");
                return;
            }

            const expression = currentInput.value
                .replace(/÷/g, "/")
                .replace(/×/g, "*");

            // eslint-disable-next-line no-eval
            const evalResult = eval(expression);

            if (!isFinite(evalResult)) {
                toast.error("Division by zero is not possible");
                return
            }

            result.value = String(evalResult);
            history.value.unshift({ input: currentInput.value, result: result.value });
        } catch (err: any) {
            result.value = "";
            toast.error(err.message || "Invalid calculation");
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

const NAV_KEY = Symbol("nav-service");

/* ---------------- NAVIGATION USING PROVIDE/INJECT ---------------- */
export function provideNavigation() {
    const _title = ref<string>("");
    const _icon = ref<string>("");
    const _status = ref<string>("");

    const api = {
        title: readonly(_title),
        icon: readonly(_icon),
        status: readonly(_status),
        setTitle(title: string) {
            _title.value = title;
        },
        setIcon(icon: string) {
            _icon.value = icon;
        },
        setStatus(status: string) {
            _status.value = status;
        },
        reset() {
            _title.value = "";
            _icon.value = "";
            _status.value = "";
        },
    };

    provide(NAV_KEY, api);
    return api;
}

export function useNavigation() {
    const nav = inject(NAV_KEY) as ReturnType<typeof provideNavigation> | undefined;
    if (!nav) {
        throw new Error("useNavigation must be used after provideNavigation()");
    }
    return nav;
}