<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import StopWatch from "../src/StopWatch.vue";
import WorldClock from "./WorldClock.vue";
const tabs = [
  {
    label: "Stop Watch",
    value: "stopWatch",
    icon: "fal fa-stopwatch",
  },
  {
    label: "WorldClock",
    value: "worldClock",
    icon: "fa-light fa-clock",
  },
];
</script>

<template>
  <CTabs selected="stopWatch" theme="sky-blue" :tabs="tabs" size="small" :full-width="true">
    <template #tab="{ activeValue }">
      <div v-if="activeValue == 'stopWatch'">
        <StopWatch/>
      </div>
      <div v-if="activeValue == 'worldClock'">
        <WorldClock />
      </div>
    </template>
  </CTabs>
</template>


