import { ref } from 'vue'
import { evaluate } from 'mathjs'

interface CalculationHistory {
  id: number
  expression: string
  result: string
  timestamp: Date
}

export function useCalculator() {
  const expression = ref('')
  const history = ref<CalculationHistory[]>([])
  const showHistory = ref(false)
  const error = ref('')

  const operators = ['+', '-', '×', '÷']
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']

  const addToExpression = (value: string) => {
    error.value = ''
    
    if (value === '×') value = '*'
    if (value === '÷') value = '/'
    
    if (operators.includes(value)) {
      if (expression.value && !operators.includes(expression.value.slice(-1))) {
        expression.value += value
      }
    } else if (value === '(') {
      const last = expression.value.slice(-1)
      if (!expression.value || operators.includes(last) || last === '(') {
        expression.value += value
      } else if (/\d|\)/.test(last)) {
        expression.value += `*${value}`
      }
    } else if (value === ')') {
      if (expression.value && !operators.includes(expression.value.slice(-1)) && expression.value.slice(-1) !== '(') {
        const openCount = (expression.value.match(/\(/g) || []).length
        const closeCount = (expression.value.match(/\)/g) || []).length
        if (openCount > closeCount) {
          expression.value += value
        }
      }
    } else if (value === '.') {
      if (expression.value && !expression.value.split(/[\+\-\*\/\(\)]/).pop()?.includes('.')) {
        expression.value += value
      }
    } else {
      const last = expression.value.slice(-1)
      if (last === ')') {
        expression.value += `*${value}`
      } else {
        expression.value += value
      }
    }
  }

  const clear = () => {
    expression.value = ''
    error.value = ''
  }

  const clearEntry = () => {
    if (expression.value) {
      expression.value = expression.value.slice(0, -1)
    }
  }

  const calculate = () => {
    if (!expression.value) return
    
    try {
      let calcExpression = expression.value.replace(/×/g, '*').replace(/÷/g, '/')
      if (!/^[0-9+\-*/().\s]+$/.test(calcExpression)) {
        throw new Error('Invalid characters in expression')
      }
      if (calcExpression.includes('/0') && !calcExpression.includes('/0.')) {
        throw new Error('Division by zero')
      }
      
      const resultValue = evaluate(calcExpression)
      const result = typeof resultValue === 'number' ? resultValue : Number(resultValue)
      
      if (!isFinite(result)) {
        throw new Error('Invalid calculation')
      }
      
      const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '')
      
      history.value.unshift({
        id: Date.now(),
        expression: expression.value,
        result: formattedResult,
        timestamp: new Date()
      })
      
      if (history.value.length > 10) {
        history.value = history.value.slice(0, 10)
      }
      
      expression.value = formattedResult
      error.value = ''
      
    } catch (err) {
      error.value = 'Invalid calculation'
    }
  }

  const restoreFromHistory = (item: CalculationHistory) => {
    expression.value = item.expression
    error.value = ''
    showHistory.value = false
  }

  const toggleHistory = () => {
    showHistory.value = !showHistory.value
  }

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key
    
    if (numbers.includes(key)) {
      addToExpression(key)
    } else if (key === '+' || key === '-') {
      addToExpression(key)
    } else if (key === '*') {
      addToExpression('×')
    } else if (key === '/') {
      event.preventDefault()
      addToExpression('÷')
    } else if (key === '(' || key === ')') {
      addToExpression(key)
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault()
      calculate()
    } else if (key === 'Escape') {
      clear()
    } else if (key === 'Backspace') {
      clearEntry()
    } else if (key === 'c' || key === 'C') {
      clear()
    }
  }

  const setupKeyboardListeners = () => {
    document.addEventListener('keydown', handleKeydown)
  }

  const cleanupKeyboardListeners = () => {
    document.removeEventListener('keydown', handleKeydown)
  }

  return {
    expression,
    history,
    showHistory,
    error,
    addToExpression,
    clear,
    clearEntry,
    calculate,
    restoreFromHistory,
    toggleHistory,
    setupKeyboardListeners,
    cleanupKeyboardListeners
  }
}
