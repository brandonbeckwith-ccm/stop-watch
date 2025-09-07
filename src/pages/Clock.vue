<script setup lang="ts">
import { ref } from 'vue'
import { CTabs } from '@ccm-engineering/ui-components'
import StopWatch from './StopWatch.vue'
import WorldClock from './WorldClock.vue'
import { router } from '../router'
import type { TabItem } from '@ccm-engineering/ui-components/dist/C-Tabs/C-Tabs'

const tabs: TabItem[] = [
    { label: 'Stopwatch', value: 'stopwatch' },
    { label: 'World Clock', value: 'world-clock' }
]
const selectedTab = ref('stopwatch')

const onTab = (value: string) => {
    selectedTab.value = value
    console.log(value, 'val');
    router.push(`/clock/${value}`)
}
</script>

<template>
    <div class="container">
        <div class="tabs-cont">
            <CTabs :tabs="tabs" :selected="selectedTab" @selected-tab="onTab" />
        </div>
        <div>
            <StopWatch v-if="selectedTab === 'stopwatch'" />
            <WorldClock v-else-if="selectedTab === 'world-clock'" />
        </div>
    </div>
</template>
<style scoped>
.tabs-cont{
    margin-top: 10px;
    text-align: center;
}
:deep(.c-tabs .c-tabs-header) {
    text-align: center;
}
:deep(.c-tabs .c-tab-content) {
    padding: 0;
}
</style>