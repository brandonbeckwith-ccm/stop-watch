import { customRef } from "vue";

// Debounced ref (reactivity updates after delay)
export function useDebouncedRef<T>(value: T, delay = 2000) {
    let timeout: number;
    return customRef<T>((track, trigger) => ({
        get() {
            track();
            return value;
        },
        set(newValue: T) {
            clearTimeout(timeout);
            timeout = window.setTimeout(() => {
                value = newValue;
                trigger();
            }, delay);
        },
    }));
}

// Validation ref (only updates if valid)
export function useValidatedRef<T>(
    value: T,
    validator: (v: T) => boolean
) {
    return customRef<T>((track, trigger) => ({
        get() {
            track();
            return value;
        },
        set(newValue: T) {
            if (validator(newValue)) {
                value = newValue;
                trigger();
            } else {
                console.warn("Validation failed for:", newValue);
            }
        },
    }));
}

// History ref (undo capability)
export function useHistoryRef<T>(value: T) {
    const history: T[] = [value];
    let index = 0;

    let triggerFn: (() => void) | null = null;

    const ref = customRef<T>((track, trigger) => {
        triggerFn = trigger; // capture trigger so we can call it in undo/redo
        return {
            get() {
                track();
                return history[index];
            },
            set(newValue: T) {
                if (newValue !== history[index]) {
                    history.splice(index + 1); // cut future
                    history.push(newValue);
                    index++;
                    trigger();
                }
            },
        };
    });

    return {
        ref,
        undo() {
            if (index > 0) {
                index--;
                triggerFn?.(); // notify Vue
            }
        },
        redo() {
            if (index < history.length - 1) {
                index++;
                triggerFn?.(); // notify Vue
            }
        },
        history,
    };
}


// Throttled ref (limit updates)
export function useThrottledRef<T>(value: T, limit = 2000) {
    let lastTime = 0;
    return customRef<T>((track, trigger) => ({
        get() {
            track();
            return value;
        },
        set(newValue: T) {
            const now = Date.now();
            if (now - lastTime > limit) {
                value = newValue;
                lastTime = now;
                trigger();
            }
        },
    }));
}
