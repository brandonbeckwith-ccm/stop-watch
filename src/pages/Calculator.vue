<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { CButton, CTabs } from '@ccm-engineering/ui-components'
import { useNavigation } from '../composables/useNavigation'

interface CalcHistory {
    id: number
    equation: string
    answer: string
}

const expression = ref('')
const screen = ref('0')
const fresh = ref(false)
const broken = ref(false)
const pastCalcs = ref<CalcHistory[]>([])
const showPast = ref(false)

const equation = computed(() => {
    return broken.value ? 'Error' : expression.value
})

const addChar = (char: string) => {
    if (broken.value) reset()
    if (fresh.value) {
        expression.value = ''
        fresh.value = false
    }

    if (expression.value === '' && '+*/)'.includes(char)) return

    expression.value += char
    screen.value = expression.value
}

const addDot = () => addChar('.')

const evaluateExpression = () => {
    if (broken.value || expression.value.trim() === '') return

    try {
        const sanitized = expression.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-')

        const result = eval(sanitized)

        if (!isFinite(result)) {
            broken.value = true
            screen.value = 'Cannot divide by zero'
            return
        }

        saveToPast(expression.value, String(result))
        screen.value = String(result)
        expression.value = String(result)
        fresh.value = true
    } catch (err) {
        screen.value = 'Error'
        broken.value = true
    }
}

const reset = () => {
    screen.value = '0'
    expression.value = ''
    fresh.value = false
    broken.value = false
}

const clearEntry = () => {
    screen.value = '0'
    broken.value = false
}

const removeLast = () => {
    if (broken.value) { reset(); return }
    expression.value = expression.value.slice(0, -1)
    screen.value = expression.value || '0'
}

const flipSign = () => {
    if (broken.value) return
    const tokens = expression.value.match(/[\d.]+|[+\-×÷()]/g) || []
    if (!tokens.length) return

    for (let i = tokens.length - 1; i >= 0; i--) {
        if (!isNaN(Number(tokens[i]))) {
            tokens[i] = tokens[i].startsWith('-') ? tokens[i].slice(1) : '-' + tokens[i]
            break
        }
    }
    expression.value = tokens.join('')
    screen.value = expression.value
}

const saveToPast = (equation: string, answer: string) => {
    pastCalcs.value.unshift({ id: Date.now(), equation, answer })
    if (pastCalcs.value.length > 20) pastCalcs.value.pop()
}

const usePast = (calc: CalcHistory) => {
    screen.value = calc.answer
    expression.value = calc.answer
    fresh.value = true
    showPast.value = false
}

const handleKeys = (e: KeyboardEvent) => {
    const key = e.key

    if ('0123456789'.includes(key)) addChar(key)
    else if (key === '.') addDot()
    else if (key === '+') addChar('+')
    else if (key === '-') addChar('−')
    else if (key === '*') addChar('×')
    else if (key === '/') addChar('÷')
    else if (key === '(' || key === ')') addChar(key)
    else if (['Enter', '='].includes(key)) evaluateExpression()
    else if (key === 'Escape') reset()
    else if (key === 'Backspace') removeLast()
    else if (key === 'Delete') clearEntry()
}

const { setTitle, setIcon, setStatus } = useNavigation()
setTitle('Calculator')
setIcon('🧮')
watch(screen, () => setStatus(`Result: ${screen.value}`), { immediate: true })

onMounted(() => window.addEventListener('keydown', handleKeys))
onUnmounted(() => window.removeEventListener('keydown', handleKeys))
</script>
<template>
    <div class="outer">
    
        <div class="wrapper">
            <div class="box has-background-light calc">
                <div class="screen">
                    <div class="equation">{{ equation }}</div>
                    <div class="display" :class="{ error: broken }">{{ screen }}</div>
                </div>

                <div class="controls">
                    <CButton label="C" @clicked="reset" radius="xxs" class="op" />
                    <CButton label="History" @clicked="showPast = !showPast" radius="xxs"
                        :class="{ active: showPast }" />
                </div>

                <div class="buttons">
                    <CButton label="(" @clicked="addChar('(')" radius="xxs" class="op" />
                    <CButton label=")" @clicked="addChar(')')" radius="xxs" class="op" />

                    <CButton label="⌫" @clicked="removeLast" radius="xxs" class="op" />
                    <CButton label="+" @clicked="addChar('+')" radius="xxs" class="op" />
                    <!-- <CButton label="CE" @clicked="clearEntry" radius="xxs" class="op" /> -->

                    <CButton label="7" @clicked="addChar('7')" radius="xxs" class="num" />
                    <CButton label="8" @clicked="addChar('8')" radius="xxs" class="num" />
                    <CButton label="9" @clicked="addChar('9')" radius="xxs" class="num" />
                    <CButton label="−" @clicked="addChar('−')" radius="xxs" class="op" />

                    <CButton label="4" @clicked="addChar('4')" radius="xxs" class="num" />
                    <CButton label="5" @clicked="addChar('5')" radius="xxs" class="num" />
                    <CButton label="6" @clicked="addChar('6')" radius="xxs" class="num" />
                    <CButton label="×" @clicked="addChar('×')" radius="xxs" class="op" />

                    <CButton label="1" @clicked="addChar('1')" radius="xxs" class="num" />
                    <CButton label="2" @clicked="addChar('2')" radius="xxs" class="num" />
                    <CButton label="3" @clicked="addChar('3')" radius="xxs" class="num" />
                    <CButton label="÷" @clicked="addChar('÷')" radius="xxs" class="op" />


                    <CButton label="±" @clicked="flipSign" radius="xxs" class="num" />
                    <CButton label="0" @clicked="addChar('0')" radius="xxs" class="num" />
                    <CButton label="." @clicked="addDot" radius="xxs" class="num" />


                    <CButton label="=" @clicked="evaluateExpression" radius="xxs" class="equals" />
                </div>
            </div>

            <div v-if="showPast" class="box has-background-light history">
                <div class="history-top">
                    <h3 class="is-size-5 has-text-weight-semibold">History</h3>
                    <CButton label="Clear" @clicked="pastCalcs = []" radius="xxs" :disable="!pastCalcs.length" />
                </div>

                <div class="past-calcs">
                    <div v-for="calc in pastCalcs" :key="calc.id" class="past-calc" @click="usePast(calc)">
                        <div class="past-equation">{{ calc.equation }}</div>
                        <div class="past-answer">= {{ calc.answer }}</div>
                    </div>

                    <div v-if="!pastCalcs.length" class="empty">
                        No calculations yet
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    display: flex;
    gap: 25px;
    margin: 10px 0;
}

.calc {
    flex: 0 0 320px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background: #f5f5f5;
}

.history {
    flex: 1;
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    max-height: 500px;
    overflow-y: auto;
}

.screen {
    background: #fff;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    text-align: right;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.equation {
    font-size: 14px;
    color: #666;
    min-height: 20px;
    margin-bottom: 5px;
}

.display {
    font-size: 32px;
    font-weight: bold;
    color: #000;
    word-wrap: break-word;

    &.error {
        color: #e74c3c;
    }
}

.controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    gap: 10px;

    .active {
        // margin-left: 15px;
        background-color: #007acc;
        color: white;
    }
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

:deep(.num) {
    background-color: #fff;
    border: 1px solid #ddd;

    &:hover {
        background-color: #f0f0f0;
    }
}

:deep(.op) {
    background-color: #e0e0e0;
    border: 1px solid #ccc;

    &:hover {
        background-color: #d0d0d0;
    }
}

:deep(.equals) {
    background-color: #007acc;
    color: white;
    border: 1px solid #006bb3;

    &:hover {
        background-color: #006bb3;
    }
}

.history-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
}

.past-calcs {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.past-calc {
    padding: 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #f0f8ff;
        border-color: #007acc;
        transform: translateY(-1px);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
}

.past-equation {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
}

.past-answer {
    font-size: 16px;
    font-weight: bold;
    color: #000;
}

.empty {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 20px;
}

@media (max-width: 900px) {
    .wrapper {
        flex-direction: column;
    }

    .calc {
        flex: 1;
    }

    .history {
        max-width: none;
    }
}

@media (max-width: 480px) {
    .calc {
        padding: 15px;
    }

    .display {
        font-size: 28px;
    }

    .buttons {
        gap: 6px;
    }
}
</style>