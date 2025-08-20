<script setup lang="ts">
import { CButton, CTag } from '@ccm-engineering/ui-components'
import { useStopwatch } from '../composables/useStopwatch'

const {
  isRunning,
  formattedTime,
  lapTimes,
  reset,
  lap,
  toggle
} = useStopwatch()
</script>

<template>
  <div class="stopwatch-container">
    <h1 class="stopwatch-title">Stopwatch</h1>
    
    <!-- Time Display -->
    <div class="time-display">
      <span class="time-text">{{ formattedTime }}</span>
    </div>

    <!-- Control Buttons -->
    <div class="control-buttons">
      <CButton 
        :theme="isRunning ? 'neutral' : 'primary'"
        :label="isRunning ? 'Stop' : 'Start'"
        @clicked="toggle"
        class="control-button"
      />
      
      <CButton 
        theme="neutral"
        label="Reset"
        :disabled="isRunning && lapTimes.length === 0"
        @clicked="reset"
        class="control-button"
      />
      
      <CButton 
        theme="primary"
        label="Lap"
        :disabled="!isRunning"
        @clicked="lap"
        class="control-button"
      />
    </div>

    <!-- Lap Times -->
    <div v-if="lapTimes.length > 0" class="lap-times">
      <h3 class="lap-title">Lap Times</h3>
      <div class="lap-list">
        <div 
          v-for="lap in lapTimes" 
          :key="lap.id"
          class="lap-item"
        >
          <CTag 
            :label="`Lap ${lap.id}`"
            theme="info"
            size="small-24"
          />
          <span class="lap-time">{{ lap.displayTime }}</span>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div v-if="lapTimes.length === 0 && !isRunning" class="instructions">
      <p>Click <strong>Start</strong> to begin timing</p>
      <p>Use <strong>Lap</strong> to record lap times while running</p>
      <p>Click <strong>Stop</strong> to pause, then <strong>Start</strong> to resume</p>
    </div>
  </div>
</template>

<style scoped>
.stopwatch-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.stopwatch-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ccm-color-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.time-display {
  background: var(--ccm-color-surface);
  border: 2px solid var(--ccm-color-border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.time-text {
  font-family: 'Courier New', monospace;
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--ccm-color-text-primary);
  letter-spacing: 2px;
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.control-button {
  min-width: 100px;
}

.lap-times {
  margin-top: 2rem;
  text-align: left;
}

.lap-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ccm-color-text-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.lap-list {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--ccm-color-border);
  border-radius: 8px;
  background: var(--ccm-color-surface);
}

.lap-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--ccm-color-border);
  transition: background-color 0.2s ease;
}

.lap-item:last-child {
  border-bottom: none;
}

.lap-item:hover {
  background-color: var(--ccm-color-surface-hover);
}

.lap-time {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--ccm-color-text-primary);
}

.instructions {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--ccm-color-surface);
  border: 1px solid var(--ccm-color-border);
  border-radius: 8px;
  text-align: left;
}

.instructions p {
  margin: 0.5rem 0;
  color: var(--ccm-color-text-secondary);
  font-size: 0.9rem;
}

.instructions strong {
  color: var(--ccm-color-primary);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stopwatch-container {
    padding: 1rem;
  }
  
  .stopwatch-title {
    font-size: 2rem;
  }
  
  .time-text {
    font-size: 2.5rem;
  }
  
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .control-button {
    width: 200px;
    margin-bottom: 0.5rem;
  }
  
  .lap-item {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .time-text {
    font-size: 2rem;
  }
  
  .control-button {
    width: 150px;
  }
}
</style> 