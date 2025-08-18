<script setup lang="ts">
import { CCMDataTable } from '@ccm-engineering/ccm-data-table';

import { CTag } from '@ccm-engineering/ui-components';
import { Column } from 'primevue'
import { formatTime, laps } from '../helpers/stopwatch';
</script>

<template>
    <div class="box mt-5 right">
        <h2 class="subtitle is-4 has-text-grey-dark mb-3">Laps</h2>
        <CCMDataTable :value="laps" :resizableColumns="false">
            <template #empty> No laps recorded yet. </template>
            <Column field="lap" header="Lap" />
            <Column field="time" header="Time">
                <template #body="slotProps">
                    <CTag class="is-fullwidth" :label="formatTime(slotProps.data.time)" size="small-24" />
                </template>
            </Column>
        </CCMDataTable>
    </div>
</template>