<script setup lang="ts">
import Stopwatch from './components/Stopwatch.vue';
</script>

<template>
  <div class="ccm-new" id="app">
    <h1>Stopwatch Assignment</h1>
    <Stopwatch />
  </div>
</template>
<style scoped lang="scss">
$primary-color: rgb(51, 51, 51);
$secondary-color: rgb(102, 102, 102);
$background-color: rgb(248, 249, 250);
$border-color: rgb(233, 236, 239);
$hover-color: rgb(222, 226, 230);

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.card {
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(255, 255, 255);
  height: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto;
  }
}

.stopwatch-card {
  display: flex;
  flex-direction: column;
  justify-content: center;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: $primary-color;
  }

  .stopwatch-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .time-display {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      min-height: 40px;

      .time-label {
        font-size: 0.9rem;
        color: $secondary-color;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 200px;
      align-items: stretch;
    }
  }
}

.laps-card {
  flex: 1;

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: $primary-color;
  }

  .lap-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
    max-height: 300px;
    overflow-y: auto;
    padding: 4px;

    .lap-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background-color: $background-color;
      border-radius: 6px;
      border: 1px solid $border-color;

      .lap-label {
        font-size: 0.9rem;
        color: rgb(73, 80, 87);
        font-weight: 500;
      }
    }

    .lap-list-empty {
      color: $secondary-color;
      font-style: italic;
      text-align: center;
      padding: 40px 20px;
      background-color: $background-color;
      border-radius: 6px;
      border: 2px dashed $hover-color;
    }
  }
}

@media (max-width: 768px) {
  #app {
    padding: 16px;
  }

  .stopwatch-card h2 {
    font-size: 1.3rem;
  }

  .button-group {
    max-width: 100%;
  }

  .lap-list-empty {
    padding: 20px;
  }
}
</style>
