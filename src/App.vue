<script setup lang="ts">
import { CTabs } from '@ccm-engineering/ui-components';
import StopWatch from './custom-component/StopWatch.vue';
import WorldClock from './custom-component/WorldClock.vue';
import { tabs } from './helpers';
import RefPanel from './custom-component/RefPanel.vue';

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
          <StopWatch></StopWatch>
        </div>
        <div v-if="activeValue == 'worldClock'">
         <WorldClock></WorldClock>
        </div>
        <div v-if="activeValue =='customRef'">
          <RefPanel></RefPanel>
        </div>
      </template>
    </CTabs>
  </div>
</template>

<style>

</style>
