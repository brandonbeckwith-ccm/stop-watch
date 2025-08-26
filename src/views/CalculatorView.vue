<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { CButton } from '@ccm-engineering/ui-components'
import { useCalculator } from '../composables/useCalculator'

const {
  expression,
  history,
  showHistory,
  addToExpression,
  clear,
  clearEntry,
  calculate,
  restoreFromHistory,
  toggleHistory,
  setupKeyboardListeners,
  cleanupKeyboardListeners
} = useCalculator()

onMounted(() => {
  setupKeyboardListeners()
})

onUnmounted(() => {
  cleanupKeyboardListeners()
})
</script>

<template>
  <div class="calculator-container">
    <div class="calculator">
      <!-- Display -->
      <div class="display">
        <div class="expression">{{ expression || '0' }}</div>
      </div>

      <!-- History Toggle -->
      <div class="history-toggle">
        <CButton 
          theme="primary"
          :label="`📋 History (${history.length})`"
          @clicked="toggleHistory"
          :class="{ active: showHistory }"
        />
      </div>

      <!-- History Panel -->
      <div v-if="showHistory" class="history-panel">
        <div v-if="history.length === 0" class="no-history">
          No calculations yet
        </div>
        <div 
          v-for="item in history" 
          :key="item.id"
          class="history-item"
          @click="restoreFromHistory(item)"
        >
          <div class="history-expression">{{ item.expression }}</div>
          <div class="history-result">= {{ item.result }}</div>
          <div class="history-time">{{ item.timestamp.toLocaleTimeString() }}</div>
        </div>
      </div>

      <!-- Calculator Buttons -->
      <div class="buttons">
        <CButton @clicked="clear" theme="neutral" label="C" class="btn btn-clear" />
        <CButton @clicked="clearEntry" theme="neutral" label="CE" class="btn btn-clear" />
        <CButton @clicked="addToExpression('(')" theme="neutral" label="(" class="btn btn-operator" />
        <CButton @clicked="addToExpression(')')" theme="neutral" label=")" class="btn btn-operator" />

        <CButton @clicked="addToExpression('7')" theme="neutral" label="7" class="btn btn-number" />
        <CButton @clicked="addToExpression('8')" theme="neutral" label="8" class="btn btn-number" />
        <CButton @clicked="addToExpression('9')" theme="neutral" label="9" class="btn btn-number" />
        <CButton @clicked="addToExpression('÷')" theme="neutral" label="÷" class="btn btn-operator" />

        <CButton @clicked="addToExpression('4')" theme="neutral" label="4" class="btn btn-number" />
        <CButton @clicked="addToExpression('5')" theme="neutral" label="5" class="btn btn-number" />
        <CButton @clicked="addToExpression('6')" theme="neutral" label="6" class="btn btn-number" />
        <CButton @clicked="addToExpression('×')" theme="neutral" label="×" class="btn btn-operator" />

        <CButton @clicked="addToExpression('1')" theme="neutral" label="1" class="btn btn-number" />
        <CButton @clicked="addToExpression('2')" theme="neutral" label="2" class="btn btn-number" />
        <CButton @clicked="addToExpression('3')" theme="neutral" label="3" class="btn btn-number" />
        <CButton @clicked="addToExpression('-')" theme="neutral" label="-" class="btn btn-operator" />

        <CButton @clicked="addToExpression('.')" theme="neutral" label="." class="btn btn-number" />
        <CButton @clicked="addToExpression('0')" theme="neutral" label="0" class="btn btn-number" />
        <CButton @clicked="calculate" theme="primary" label="=" class="btn btn-equals" />
        <CButton @clicked="addToExpression('+')" theme="neutral" label="+" class="btn btn-operator" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 2rem);
  padding: clamp(0.75rem, 2.5vw, 2rem);
  background: var(--ccm-color-background);
}

.calculator {
  background: var(--ccm-color-surface);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  width: min(100%, 440px);
  border: 1px solid var(--ccm-color-border);
}

.display {
  background: var(--ccm-color-surface);
  padding: clamp(1rem, 3.5vw, 2rem);
  text-align: right;
  border-bottom: 1px solid var(--ccm-color-border);
}

.expression {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
  color: var(--ccm-color-text-secondary);
  margin-bottom: 0.35rem;
  min-height: 1.25rem;
  word-wrap: break-word;
}

.result {
  font-size: clamp(1.75rem, 6vw, 2.4rem);
  font-weight: 700;
  color: var(--ccm-color-text-primary);
  min-height: 2.75rem;
}

.history-toggle {
  padding: 0.75rem clamp(1rem, 3vw, 2rem);
  border-bottom: 1px solid var(--ccm-color-border);
}

.history-panel {
  max-height: 240px;
  overflow-y: auto;
  border-bottom: 1px solid var(--ccm-color-border);
}

.no-history {
  padding: 2rem;
  text-align: center;
  color: var(--ccm-color-text-secondary);
  font-style: italic;
}

.history-item {
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--ccm-color-border);
  cursor: pointer;
  transition: background-color 0.2s;
}

.history-item:hover {
  background: var(--ccm-color-surface-hover);
}

.history-expression {
  font-size: 1rem;
  color: var(--ccm-color-text-secondary);
  margin-bottom: 0.25rem;
}

.history-result {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--ccm-color-text-primary);
  margin-bottom: 0.25rem;
}

.history-time {
  font-size: 0.8rem;
  color: var(--ccm-color-text-secondary);
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: clamp(8px, 2vw, 14px);
  background: transparent;
}

.btn {
  border: 1px solid var(--ccm-color-border);
  padding: clamp(0.9rem, 3.2vw, 1.25rem);
  font-size: clamp(1rem, 3.2vw, 1.15rem);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.06s ease, background-color 0.15s ease, box-shadow 0.2s ease;
  background: var(--ccm-color-surface);
  border-radius: 12px;
  line-height: 1;
  min-height: 48px;
}

.btn:hover {
  background: var(--ccm-color-surface-hover);
}

.btn:active {
  transform: translateY(1px);
}

.btn:focus-visible {
  outline: 2px solid var(--ccm-color-primary);
  outline-offset: 2px;
}

.btn-number {
  color: var(--ccm-color-text-primary);
  background: linear-gradient(180deg, var(--ccm-color-surface) 0%, rgba(0,0,0,0.02) 100%);
}

.btn-operator {
  background: linear-gradient(180deg, var(--ccm-color-surface) 0%, rgba(0,0,0,0.02) 100%);
  color: var(--ccm-color-primary);
  font-weight: 700;
}

.btn-clear {
  background: linear-gradient(180deg, var(--ccm-color-surface) 0%, rgba(0,0,0,0.02) 100%);
  color: var(--ccm-color-text-secondary);
}

.btn-equals {
  background: var(--ccm-color-primary);
  color: white;
  font-weight: 800;
  box-shadow: 0 6px 16px rgba(0, 119, 255, 0.25);
}

.btn-zero {
  grid-column: span 2;
}

@media (max-width: 480px) {
  .calculator-container {
    padding: 1rem;
  }
  
  .calculator {
    border-radius: 14px;
  }
  
  .display {
    padding: 1.25rem;
  }
  
  .result {
    font-size: 1.75rem;
  }
  
  .btn {
    padding: 1rem;
    font-size: 1rem;
    min-height: 44px;
  }
}
</style>
