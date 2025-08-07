<script setup lang="ts">
import StopWatch from './custom-component/StopWatch.vue';

</script>

<template>
  <div id="app">
   <StopWatch></StopWatch>
  </div>
</template>

<style scoped>
.stopwatch {
  max-width: 400px;
  margin: auto;
  text-align: center;
  padding: 1rem;
}
.controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}
.laps {
  margin-top: 2rem;
  text-align: left;
}
</style>
