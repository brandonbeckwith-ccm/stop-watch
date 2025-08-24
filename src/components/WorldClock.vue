<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Clock {
  id: number
  zone: string
}

const clocks = ref<Clock[]>([])

// Load saved clocks
onMounted(() => {
  const saved = localStorage.getItem('clocks')
  if (saved) {
    clocks.value = JSON.parse(saved)
  } else {
    clocks.value = [
      { id: 1, zone: dayjs.tz.guess() }, // Local
      { id: 2, zone: 'America/New_York' }, // EST
      { id: 3, zone: 'Asia/Kolkata' } // Example: your timezone
    ]
    localStorage.setItem('clocks', JSON.stringify(clocks.value))
  }
})

function addClock(zone: string) {
  clocks.value.push({ id: Date.now(), zone })
  saveClocks()
}
function removeClock(id: number) {
  clocks.value = clocks.value.filter(c => c.id !== id)
  saveClocks()
}
function saveClocks() {
  localStorage.setItem('clocks', JSON.stringify(clocks.value))
}
</script>

<template>
  <div class="clocks">
    <div v-for="clock in clocks" :key="clock.id" class="clock">
      <p>{{ clock.zone }}</p>
      <p>{{ dayjs().tz(clock.zone).format('HH:mm:ss') }}</p>
      <button @click="removeClock(clock.id)">Remove</button>
    </div>

    <div class="add">
      <input v-model="newZone" placeholder="Enter timezone (e.g. Europe/London)" />
      <button @click="addClock(newZone)">Add Clock</button>
    </div>
  </div>
</template>
