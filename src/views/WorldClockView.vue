<template>
  <div class="world-clock-view">
    <h1>World Clock</h1>
    <div class="controls">
      <select v-model="selectedTimezone" class="custom-select">
        <option disabled value="">Select a city</option>
        <option v-for="city in cities" :key="city.zone" :value="city.zone">
          {{ city.name }} ({{ city.zone }})
        </option>
      </select>
      <CButton class="add-btn" @click="() => addClock(selectedTimezone)" :disabled="!selectedTimezone || userTimezones.includes(selectedTimezone)" label="Add" size="size-44"></CButton>
    </div>
    <div class="cards">
      <TimeCard
        v-for="city in userClocksWithTime"
        :key="city.zone"
        :name="city.name"
        :time="city.time"
        :day="city.day"
        :zone="city.zone"
        v-bind:show-remove="!defaultTimezones.includes(city.zone)"
        @remove="() => removeClock(city.zone)"
      />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import { useWorldclock } from '../composables/useWorldclock';
import TimeCard from '../components/TimeCard.vue';
import { CButton } from '@ccm-engineering/ui-components';

const {
  cities,
  userTimezones,
  userClocksWithTime,
  addClock,
  removeClock,
  defaultTimezones,
} = useWorldclock();

const selectedTimezone = ref('');
</script>

<style scoped>
.world-clock-view {
  max-width: 900px;
  margin: 2em auto 0 auto;
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
}
h1 {
  text-align: center;
  font-size: 2.2em;
  font-weight: 700;
  color: #2b5876;
  margin-bottom: 1.5em;
  letter-spacing: 1px;
}
.controls {
  display: flex;
  gap: 1em;
  margin-bottom: 2em;
  justify-content: center;
  align-items: center;
}
.custom-select {
  padding: 0.6em 1.2em;
  border-radius: 24px;
  border: 1.5px solid #4e4376;
  background: #f7f8fa;
  color: #2b5876;
  font-size: 1.1em;
  font-weight: 500;
  outline: none;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
  transition: border 0.2s, box-shadow 0.2s;
}
.custom-select:focus {
  border: 2px solid #2b5876;
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.13);
}
/* .add-btn {
  background: linear-gradient(90deg, #2b5876 0%, #4e4376 100%);
  color: #fff;
  border: none;
  border-radius: 24px;
  padding: 0.6em 2em;
  font-size: 1.1em;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.10);
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
} */
/* .add-btn:disabled {
  background: #bfc4d1;
  color: #fff;
  cursor: not-allowed;
  box-shadow: none;
}
.add-btn:not(:disabled):hover {
  background: linear-gradient(90deg, #4e4376 0%, #2b5876 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 4px 16px rgba(44, 62, 80, 0.18);
} */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5em;
}
@media (max-width: 1100px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .cards {
    grid-template-columns: 1fr;
  }
  .controls {
    flex-direction: column;
    gap: 0.7em;
  }
}
</style>

