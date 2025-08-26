<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { CButton } from '@ccm-engineering/ui-components'

interface CalcHistory {
  id: number
  equation: string
  answer: string
}

const screen = ref('0')
const memory = ref('')
const operator = ref('')
const fresh = ref(false)
const pastCalcs = ref<CalcHistory[]>([])
const showPast = ref(false)
const broken = ref(false)

const equation = computed(() => {
  if (broken.value) return 'Cannot divide by zero'
  if (operator.value && memory.value) {
    const symbol = { multiply: '×', divide: '÷', add: '+', subtract: '−' }[operator.value]
    return `${memory.value} ${symbol} ${fresh.value ? '' : screen.value}`
  }
  return screen.value
})

const addDigit = (digit: string) => {
  if (broken.value) reset()
  screen.value = fresh.value ? digit : (screen.value === '0' ? digit : screen.value + digit)
  fresh.value = false
}

const addDot = () => {
  if (broken.value) reset()
  if (fresh.value) {
    screen.value = '0.'
    fresh.value = false
  } else if (!screen.value.includes('.')) {
    screen.value += '.'
  }
}

const doMath = (a: string, b: string, op: string): number => {
  const x = parseFloat(a), y = parseFloat(b)
  if (op === 'add') return x + y
  if (op === 'subtract') return x - y
  if (op === 'multiply') return x * y
  if (op === 'divide') {
    if (y === 0) { broken.value = true; return 0 }
    return x / y
  }
  return y
}

const useOperator = (op: string) => {
  if (broken.value) return
  
  if (!memory.value || fresh.value) {
    memory.value = screen.value
  } else if (operator.value) {
    const result = doMath(memory.value, screen.value, operator.value)
    screen.value = String(result)
    memory.value = screen.value
  }
  
  fresh.value = true
  operator.value = op
}

const getAnswer = () => {
  if (broken.value || !memory.value || !operator.value) return
  
  const result = doMath(memory.value, screen.value, operator.value)
  const symbols = { multiply: '×', divide: '÷', add: '+', subtract: '−' }
  const equation = `${memory.value} ${symbols[operator.value]} ${screen.value}`
  
  if (!broken.value) {
    saveToPast(equation, String(result))
    screen.value = String(result)
  }
  
  memory.value = ''
  operator.value = ''
  fresh.value = true
}

const reset = () => {
  screen.value = '0'
  memory.value = ''
  operator.value = ''
  fresh.value = false
  broken.value = false
}

const clearEntry = () => {
  screen.value = '0'
  broken.value = false
}

const removeLast = () => {
  if (broken.value) { reset(); return }
  screen.value = screen.value.length > 1 ? screen.value.slice(0, -1) : '0'
}

const flipSign = () => {
  if (broken.value || screen.value === '0') return
  screen.value = screen.value.startsWith('-') ? screen.value.slice(1) : '-' + screen.value
}

const saveToPast = (equation: string, answer: string) => {
  pastCalcs.value.unshift({ id: Date.now(), equation, answer })
  if (pastCalcs.value.length > 20) pastCalcs.value.pop()
}

const usePast = (calc: CalcHistory) => {
  screen.value = calc.answer
  memory.value = ''
  operator.value = ''
  fresh.value = true
  showPast.value = false
}

const handleKeys = (e: KeyboardEvent) => {
  e.preventDefault()
  const key = e.key
  
  if ('0123456789'.includes(key)) addDigit(key)
  else if (key === '.') addDot()
  else if (key === '+') useOperator('add')
  else if (key === '-') useOperator('subtract')
  else if (key === '*') useOperator('multiply')
  else if (key === '/') useOperator('divide')
  else if (['Enter', '='].includes(key)) getAnswer()
  else if (key === 'Escape') reset()
  else if (key === 'Backspace') removeLast()
  else if (key === 'Delete') clearEntry()
}

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
          <CButton 
            label="History" 
            @clicked="showPast = !showPast" 
            radius="xxs"
            :class="{ active: showPast }"
          />
        </div>
        
        <div class="buttons">
          <CButton label="C" @clicked="reset" radius="xxs" class="op" />
          <CButton label="CE" @clicked="clearEntry" radius="xxs" class="op" />
          <CButton label="⌫" @clicked="removeLast" radius="xxs" class="op" />
          <CButton label="÷" @clicked="useOperator('divide')" radius="xxs" class="op" />
          
          <CButton label="7" @clicked="addDigit('7')" radius="xxs" class="num" />
          <CButton label="8" @clicked="addDigit('8')" radius="xxs" class="num" />
          <CButton label="9" @clicked="addDigit('9')" radius="xxs" class="num" />
          <CButton label="×" @clicked="useOperator('multiply')" radius="xxs" class="op" />
          
          <CButton label="4" @clicked="addDigit('4')" radius="xxs" class="num" />
          <CButton label="5" @clicked="addDigit('5')" radius="xxs" class="num" />
          <CButton label="6" @clicked="addDigit('6')" radius="xxs" class="num" />
          <CButton label="−" @clicked="useOperator('subtract')" radius="xxs" class="op" />
          
          <CButton label="1" @clicked="addDigit('1')" radius="xxs" class="num" />
          <CButton label="2" @clicked="addDigit('2')" radius="xxs" class="num" />
          <CButton label="3" @clicked="addDigit('3')" radius="xxs" class="num" />
          <CButton label="+" @clicked="useOperator('add')" radius="xxs" class="op" />
          
          <CButton label="±" @clicked="flipSign" radius="xxs" class="num" />
          <CButton label="0" @clicked="addDigit('0')" radius="xxs" class="num" />
          <CButton label="." @clicked="addDot" radius="xxs" class="num" />
          <CButton label="=" @clicked="getAnswer" radius="xxs" class="equals" />
        </div>
      </div>
      
      <div v-if="showPast" class="box has-background-light history">
        <div class="history-top">
          <h3 class="is-size-5 has-text-weight-semibold">History</h3>
          <CButton 
            label="Clear" 
            @clicked="pastCalcs = []" 
            radius="xxs"
            :disable="!pastCalcs.length"
          />
        </div>
        
        <div class="past-calcs">
          <div 
            v-for="calc in pastCalcs" 
            :key="calc.id"
            class="past-calc"
            @click="usePast(calc)"
          >
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
  
  .active {
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
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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