<script setup lang="ts">
import { ref } from 'vue'
import { CButton } from '@ccm-engineering/ui-components'
import { useWorldClocks } from '../composables/useWorldClocks'

const { clocks, formattedNow, addClock, removeClock, resetDefaults, popularTimezones } = useWorldClocks()

const tzError = ref('')

const quickAdd = (tz: string, label?: string) => {
  tzError.value = ''
  // prevent duplicate timezone entries
  if (clocks.value.some(c => c.tz === tz)) {
    tzError.value = 'Clock already added'
    return
  }
  const err = addClock(tz, label)
  if (err) tzError.value = err
}
</script>

<template>
  <div class="view-container">
    <header class="view-header">
      <h1>World Clock</h1>
      <div class="actions">
        <CButton theme="neutral" label="Reset to Defaults" @clicked="resetDefaults" />
      </div>
    </header>

    <section class="quick-add">
      <h3>Add Timezone</h3>
      <div class="chips">
        <CButton
          v-for="tz in popularTimezones"
          :key="tz.tz"
          class="chip"
          theme="neutral"
          :label="tz.label"
          @clicked="quickAdd(tz.tz, tz.label)"
        />
      </div>
      <p v-if="tzError" class="error">{{ tzError }}</p>
    </section>

    <section class="clock-grid">
      <div v-for="c in clocks" :key="c.id" class="clock-card">
        <div class="card-header">
          <div class="title">
            <span class="emoji">🕒</span>
            <div class="labels">
              <div class="label">{{ c.label }}</div>
              <div class="subtle">{{ c.tz }}</div>
            </div>
          </div>
          <button class="icon-btn" title="Remove" @click="removeClock(c.id)">✕</button>
        </div>
        <div class="time">{{ formattedNow(c.tz) }}</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.view-container {
  padding: 1.5rem;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.quick-add {
  background: var(--ccm-color-surface);
  border: 1px solid var(--ccm-color-border);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.quick-add h3 {
  margin: 0 0 1rem 0;
  color: var(--ccm-color-text-primary);
  font-size: 1.1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.error {
  color: #d33;
  margin: 0;
  font-size: 0.9rem;
}

.clock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1rem;
}

.clock-card {
  background: var(--ccm-color-surface);
  border: 2px solid var(--ccm-color-border);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.emoji { font-size: 1.25rem; }
.labels .label { font-weight: 600; }
.labels .subtle { color: var(--ccm-color-text-secondary); font-size: 0.85rem; }

.time {
  font-size: 1.15rem;
  font-variant-numeric: tabular-nums;
}

.icon-btn {
  background: transparent;
  border: 1px solid var(--ccm-color-border);
  border-radius: 6px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
}

@media (max-width: 768px) {
  .view-container {
    padding: 1rem;
  }
}
</style>


