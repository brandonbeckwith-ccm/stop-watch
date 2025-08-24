<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { onMounted, ref, watch } from 'vue'
import { CButton, CInput } from '@ccm-engineering/ui-components'

dayjs.extend(utc)
dayjs.extend(timezone)

const STORAGE_KEY = 'world-clocks'
const defaultClocks = [
    { label: 'Local', tz: dayjs.tz.guess() },
    { label: 'EST', tz: 'America/New_York' },
    { label: 'IST', tz: 'Asia/Kolkata' }
]

const clocks = ref<{ label: string, tz: string }[]>([])
const newLabel = ref('')
const newTz = ref('')
const now = ref(dayjs())
const error = ref('')

let timer: number | undefined

const isValidTimezone = (tz: string) => {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: tz })
        return true
    } catch (ex) {
        return false
    }
}

const loadClocks = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    clocks.value = saved ? JSON.parse(saved) : defaultClocks
}
const saveClocks = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clocks.value))
}
const addClock = () => {
    error.value = ''
    if (!newLabel.value || !newTz.value) return
    if (!isValidTimezone(newTz.value)) {
        error.value = 'Invalid timezone! Use IANA format like Europe/London.'
        return
    }
    clocks.value.push({ label: newLabel.value, tz: newTz.value })
    newLabel.value = ''
    newTz.value = ''
}
const removeClock = (idx: number) => {
    clocks.value.splice(idx, 1)
}

onMounted(() => {
    loadClocks()
    timer = setInterval(() => {
        now.value = dayjs()
    }, 1000)
})
watch(clocks, saveClocks, { deep: true })
</script>

<template>
    <div class="container">
        <!-- <h1>World Clocks</h1> -->
        <div class="clocks">
            <div v-for="(clock, idx) in clocks" :key="clock.label + clock.tz" class="clock">
                <div>
                    <strong>{{ clock.label }}</strong>
                    <div>
                        <template v-if="isValidTimezone(clock.tz)">
                            {{ now.tz(clock.tz).format('YYYY-MM-DD HH:mm:ss') }}
                        </template>
                        <template v-else>
                            <span style="color:red;">Invalid timezone</span>
                        </template>
                    </div>
                    <small>{{ clock.tz }}</small>
                </div>
                <CButton label="✕" @clicked="removeClock(idx)" size="size-32" />
            </div>
        </div>
        <form @submit.prevent="addClock" class="add-form">
            <CInput v-model="newLabel" placeholder="Label (e.g. Tokyo)" required />
            <CInput v-model="newTz" placeholder="Timezone (e.g. Asia/Tokyo)" required />
            <CButton type="fill" label="Add Clock" />
        </form>
        <div v-if="error" style="color:red; margin-top:8px;">{{ error }}</div>
    </div>
</template>

<style scoped>
.clocks {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 24px;
}

.clock {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 12px 16px;
    min-width: 180px;
    background: #fafbfc;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.add-form {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
}

.add-form input {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #bbb;
}

.add-form button {
    padding: 4px 12px;
    border-radius: 4px;
    border: none;
    background: #1976d2;
    color: #fff;
    cursor: pointer;
}
</style>