<script setup lang="ts">
import { CTag } from "@ccm-engineering/ui-components";
import { useStopWatchComposable } from "../composables/useSLW";

const { laps, formatTime } = useStopWatchComposable();
</script>
<template>
  <div class="laps-view">
    <h2>Laps</h2>

    <CTag
      v-if="laps.length"
      class="laps"
      label="LAPS"
      size="medium-32"
      theme="primary"
    />

    <div v-if="laps.length">
      <div v-for="(lap, index) in laps" :key="index" class="lap-item">
        Lap {{ index + 1 }} - {{ formatTime(lap) }}
        <hr />
      </div>
    </div>

    <p v-else>No laps recorded yet.</p>
  </div>
</template>

<style scoped>
.laps-view {
  padding: 20px;
  text-align: center;
}
.lap-item {
  padding: 6px 0;
  border-bottom: 1px solid #ccc;
}
</style>
