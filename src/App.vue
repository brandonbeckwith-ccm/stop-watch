<script setup lang="ts">
import { computed } from 'vue'
import { CButton, CTag } from '@ccm-engineering/ui-components'
import { useStopwatch } from '../src/helpers/stopwatch'
import { CCMDataTable } from '@ccm-engineering/ccm-data-table'
import { Column } from 'primevue'

const {
  time,
  isRunning,
  laps,
  start,
  stop,
  reset,
  lap,
  formatTime
} = useStopwatch()

const toggleLabel = computed(() => isRunning.value ? 'Stop' : 'Start')
const toggleAction = () => {
  isRunning.value ? stop() : start()
}
</script>

<template>
  <div id="app">
    <h1>Stopwatch Assignment</h1>

        <div class="wrapper">
          <div class="box has-background-light left">
            <h1 class="is-size-1 has-text-weight-bold">
              {{ formatTime(time) }}
            </h1>

            <div class="buttons-wrapper">
            <CButton :label="toggleLabel" @clicked="toggleAction" radius="xxs" />
            <CButton label="Lap" @clicked="lap" :disable="!isRunning" radius="xxs" />
            <CButton label="Reset" @clicked="reset" radius="xxs" />
            </div>
          </div>

          <div class="box mt-5 right" >
            <h2 class="subtitle is-4 has-text-grey-dark mb-3">Laps</h2>
            <CCMDataTable :value="laps" :resizableColumns="false" >
            <template #empty>
            No laps recorded yet.
            </template>
              <Column field="lap" header="Lap" />
              <Column field="time" header="Time">
                <template #body="slotProps">
                  <CTag class="is-fullwidth" :label="formatTime(slotProps.data.time)" size="small-24" />
                </template>
              </Column>
            </CCMDataTable>
          </div>
        </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
gap: 25px;
}
.left{
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
}
.buttons-wrapper {
  display: flex;
  gap: 10px;
}
.right {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 15px;
}
</style>
