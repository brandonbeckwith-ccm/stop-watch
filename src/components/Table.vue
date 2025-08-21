<script setup lang="ts">
import { CCMDataTable } from '@ccm-engineering/ccm-data-table';

import { CTag } from '@ccm-engineering/ui-components';
import { Column } from 'primevue'
import { formatTime, laps } from '../helpers/stopwatch';
</script>

<template>
    <div class="box mt-5 right">
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