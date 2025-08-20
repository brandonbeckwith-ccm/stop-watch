<script setup lang="ts">
import { CInput } from "@ccm-engineering/ui-components";
import {
  useDebouncedRef,
  useHistoryRef,
  useThrottledRef,
  useValidatedRef,
} from "../helpers/customRef";
const debouncedInput = useDebouncedRef("", 500);
const validatedInput = useValidatedRef("", (v) => v.length >= 3);
const historyInput = useHistoryRef("", 5);
const throttledInput = useThrottledRef("", 1000);
const { state, history } = useHistoryRef<string>("", 5);
</script>
<template>
  <div class="ref-demo-wrapper">
    <div class="grid-card">
      <!-- Debounced -->
      <div class="field">
        <label class="field__label">Debounced Input</label>
        <CInput v-model="debouncedInput" placeholder="Type to search..." />
        <p class="desc">Updates only after 500ms idle.</p>
        <p class="value">Current: {{ debouncedInput }}</p>
      </div>

      <!-- Validated -->
      <div class="field">
        <label class="field__label">Validated Input</label>
        <CInput v-model="validatedInput" placeholder="Min 3 characters" />
        <p class="desc">Only valid when ≥ 3 characters.</p>
        <p class="value">Current: {{ validatedInput }}</p>
      </div>

      <!-- History -->
      <div class="field">
        <label class="field__label">Enter text</label>
        <input
          v-model="state"
          class="c-input"
          placeholder="Type something..."
        />

        <p class="desc">History of what you typed:</p>
        <ul class="value">
          <li v-for="(item, idx) in history" :key="idx">
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- Throttled -->
      <div class="field">
        <label class="field__label">Throttled Input</label>
        <CInput v-model="throttledInput" placeholder="Type quickly..." />
        <p class="desc">Updates at most once per second.</p>
        <p class="value">Current: {{ throttledInput }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ref-demo-wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.grid-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
}

.field {
  display: flex;
  flex-direction: column;

  .field__label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: #111827;
  }

  .desc {
    font-size: 0.8rem;
    color: #6b7280;
    margin-top: 0.4rem;
  }

  .value {
    font-size: 0.85rem;
    margin-top: 0.2rem;
    color: #374151;
  }

  .error {
    font-size: 0.8rem;
    color: #dc2626;
    margin-top: 0.4rem;
  }

  .btn {
    margin-top: 0.6rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: #f9fafb;
    cursor: pointer;
    &:hover {
      background: #f3f4f6;
    }
  }
}
</style>
