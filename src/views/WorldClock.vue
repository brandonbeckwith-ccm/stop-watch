<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useLocalStorage } from "@vueuse/core";
import { useIntervalFn } from "@vueuse/core";
import {
  CButton,
  CButtonDropdown,
  CInput,
} from "@ccm-engineering/ui-components";
import { debouncedRef } from "../helper/customRef";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(timezone);

const defaultTimezones = [
  { label: "Local Time", value: "local" },
  { label: "EST (Eastern Standard Time)", value: "America/New_York" },
  { label: "Your Timezone", value: "Europe/London" },
];

const timezoneOptions = [
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Asia/Shanghai",
  "Asia/Singapore",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Australia/Sydney",
  "Pacific/Auckland",
  "Africa/Johannesburg",
  "Africa/Nairobi",
];

const clocks = useLocalStorage("clocks", defaultTimezones);
const dropNewClock = ref<string | null>(null);
const inputNewClock = debouncedRef<string | null>(null, 1000);

const addClock = (newClock: string | null) => {
  if (!newClock || newClock === "select time Zone") {
    alert("Please Selecte a valid Time zone! Thank you");
    return;
  }
  if (newClock) {
    clocks.value.push({
      label: `Custom (${newClock})`,
      value: newClock,
    });
    console.log(newClock);
    newClock = "";
  } else {
    alert(
      "Invalid timezone. Please use a valid IANA timezone (e.g., Europe/Paris)"
    );
  }
  dropNewClock.value = null;
  inputNewClock.value = null;
};

const removeClock = (index: number) => {
  clocks.value.splice(index, 1);
};

const currentTimes = ref<{ [key: string]: string }>({});
const updateTimes = () => {
  clocks.value.forEach((clock) => {
    if (clock.value === "local") {
      currentTimes.value[clock.value] = dayjs().format("YYYY-MM-DD HH:mm:ss");
    } else {
      currentTimes.value[clock.value] = dayjs()
        .tz(clock.value)
        .format("YYYY-MM-DD HH:mm:ss");
    }
  });
};

const selectClock = (index: number) => {
  dropNewClock.value = timezoneOptions[index];
};

const disable = computed(() => (dropNewClock.value ? true : false));
const disable2 = computed(() => (inputNewClock.value ? true : false));

useIntervalFn(updateTimes, 1000);
onMounted(updateTimes);
</script>

<template>
  <div class="world-clock">
    <h2>World Clocks</h2>
    <div v-for="(clock, index) in clocks" :key="index" class="clock-item">
      <div>
        <strong>{{ clock.label }}: </strong>
        <span>{{ currentTimes[clock.value] }}</span>
      </div>
      <CButton
        label="Remove"
        icon-class="fal fa-trash"
        radius="xs"
        icon-position="left"
        @click="removeClock(index)"
      />
    </div>
    <div class="add-clock">
      <CButtonDropdown
        color="primary"
        :disable="disable2"
        iconClass="fal fa-watch"
        :label="dropNewClock ?? 'select time Zone'"
        noDataText="No data found"
        radius="xs"
        size="size-32"
        type="fill"
        v-model="dropNewClock"
        class="cdropdown"
      >
        <template #content>
          <div class="dropdown-container">
            <div
              class="timezones"
              v-for="(value, index) in timezoneOptions"
              :key="index"
            >
              <span @click="selectClock(index)">{{ value }}</span>
            </div>
          </div>
        </template>
      </CButtonDropdown>
      <h3><b>OR</b></h3>
      <CInput
        :disable="disable"
        v-model="inputNewClock"
        placeholder="Enter timezone (e.g. Europe/Paris)"
      />
      <span>{{ inputNewClock }}</span>
    </div>

    <CButton
      label="Add Clock"
      icon-class="fal fa-plus"
      radius="xs"
      icon-position="left"
      @click="addClock(inputNewClock || dropNewClock)"
    />
  </div>
</template>

<style scoped>
.world-clock {
  font-family: Arial, sans-serif;
  padding: 1rem;
  max-width: 600px;
  margin: auto;
}

.clock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.clock-item div {
  flex: 1;
  min-width: 200px;
  margin-bottom: 0.5rem;
}

.add-clock {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.add-clock :deep(.c-input) {
  flex: 1 1 250px;
  min-width: 200px;
}

.add-clock :deep(.c-button) {
  flex: 0 0 auto;
}
.cdropdown {
  min-width: 250px;
}

.dropdown-container {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem 0;
}
.timezones {
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.95rem;
  color: #333;
}

.timezones:hover {
  background-color: #eef3f8;
}

.timezones:nth-child(even) {
  background-color: #f9f9f9;
}
.c-button-dropdown.is-active
  .c-button-dropdown-menu.is-top.c-button-dropdown-rds-xs {
  border-radius: 5px 5px 0 0;
}
@media (max-width: 602px) {
  .add-clock {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    width: 100%;
  }

  .cdropdown {
    width: 100%;
  }

  .add-clock :deep(.c-input) {
    width: 100%;
  }
  .add-clock :deep(.c-input) {
    flex: 1 1;
    min-width: 200px;
    margin-bottom: 10px;
  }
  h3 {
    margin: 0;
  }

  .clock-item {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
}
</style>
