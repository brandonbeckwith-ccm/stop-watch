<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import Stopwatch from "./custom-component/Stopwatch.vue";
import WorldClock from "./custom-component/WorldClock.vue";
import CustomRef from "./custom-component/CustomRef.vue";

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
  {
    label: "Custom Ref",
    value: "customRef",
    icon: "fal fa-code",
  },
];
</script>

<template>
  <div id="app">
    <CTabs
      selected="stopWatch"
      theme="sky-blue"
      :tabs="tabs"
      :full-width="true"
    >
      <template #tab="{ activeValue }">
        <div v-if="activeValue == 'stopWatch'">
          <Stopwatch />
        </div>
        <div v-if="activeValue == 'worldClock'">
          <WorldClock />
        </div>
        <div v-if="activeValue == 'customRef'">
          <CustomRef />
        </div>
      </template>
    </CTabs>
  </div>
</template>
