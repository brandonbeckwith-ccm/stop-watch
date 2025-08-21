<script setup lang="ts">
import { CButton, CInput } from '@ccm-engineering/ui-components'
import { validationRef } from '../helpers/validationRef'
import { historyRef } from '../helpers/historyRef'
import { throttledRef } from '../helpers/throttledRef'

const validated = validationRef(10, (v:number) => v > 10)
const [history, undoHistory] = historyRef('default value')
const throttled = throttledRef('', 1000)
</script>

<template>
    <div class="container" style="margin-top:40px;">
        <div class="flex">
            <div class="card">
                <h3>Validation Ref</h3>
                <CInput v-model="validated" placeholder="Only numbers > 10" type="number" />
                <div>Value: <b>{{ validated }}</b></div>
            </div>
            <div class="card">
                <h3>History Ref</h3>
                <CInput v-model="history" placeholder="Type and undo" />
                <div>Value: <b>{{ history }}</b></div>
                <CButton label="Undo" @clicked="undoHistory" size="size-32" />
            </div>
            <div class="card">
                <h3>Throttled Ref</h3>
                <CInput v-model="throttled" placeholder="Updates every 1s" />
                <div>Value: <b>{{ throttled }}</b></div>
            </div>
        </div>
    </div>
</template>