<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useLocalStorage } from "@vueuse/core";
import { useIntervalFn } from "@vueuse/core";
import { CButton, CInput } from "@ccm-engineering/ui-components";
import { useNavigation } from "../Composables/useNavigation";

dayjs.extend(utc);
dayjs.extend(timezone);

const nav = useNavigation();

const defaultTimezones = [
  { label: "Local Time", value: "local" },
  { label: "EST (Eastern Standard Time)", value: "America/New_York" },
  { label: "Your Timezone", value: "Europe/London" },
];

const clocks = useLocalStorage("clocks", defaultTimezones);
const inputNewClock = ref<string>("");

const addClock = (newClock: string) => {
  if (!newClock || newClock === "select time Zone") {
    alert("Please Selecte a valid Time zone! Thank you");
    return;
  }
  if (newClock) {
    clocks.value.push({
      label: `Custom (${newClock})`,
      value: newClock,
    });
    newClock = "";
  } else {
    alert(
      "Invalid timezone. Please use a valid IANA timezone (e.g., Europe/Paris)"
    );
  }
  inputNewClock.value = "";
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

useIntervalFn(updateTimes, 1000);

watch(clocks, (val) => {
  nav.setStatus(`${val.length} clocks`);
});

onMounted(() => {
  nav.setTitle("World Clocks");
  nav.setIcon("fal fa-clock");
  nav.setStatus(`${clocks.value.length} clocks`);
  updateTimes();
});
</script>

<template>
  <div>
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
        theme="danger"
        @click="removeClock(index)"
      />
    </div>
    <div class="add-timeZone">
      <CInput
        v-model="inputNewClock"
        placeholder="Enter timezone (e.g. Europe/Paris)"
      />

      <CButton
        label="Add Clock"
        icon-class="fal fa-plus"
        radius="xs"
        icon-position="left"
        @click="addClock(inputNewClock)"
        class="add-btn"
      />
    </div>
  </div>
</template>

<style scoped>
.clock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 10px;
  gap: 10px;
  padding: 10px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.add-btn {
  margin-top: 10px;
}

.add-timeZone {
  margin-top: 15px;
}
</style>
