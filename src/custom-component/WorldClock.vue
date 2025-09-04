<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  CButton,
  CMultipleSelect,
  CIcon,
} from "@ccm-engineering/ui-components";
import { useWorldClock } from "../composables/useWorldClock";
import { useNavigation } from "../composables/useNavigation";

dayjs.extend(utc);
dayjs.extend(timezone);

const { setTitle, setIcon, setStatus } = useNavigation();
setTitle("World Clock");
setIcon("🌍");
setStatus("Tracking global zones");

const { currentZone, clockList, availableZones, insertClock, deleteClock } =
  useWorldClock();

const times = ref<{ [key: number]: string }>({});

const updateTimes = () => {
  const now: Record<number, string> = {};
  clockList.value.forEach((c) => {
    now[c.id] =
      c.zone === "local" || c.tz === "local"
        ? dayjs().format("HH:mm:ss")
        : dayjs()
            .tz(c.zone || c.tz)
            .format("HH:mm:ss");
  });
  times.value = now;
  setStatus(`Showing ${clockList.value.length} clocks`);
};

let timer: number | undefined;

onMounted(() => {
  updateTimes();
  timer = setInterval(updateTimes, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <h1>World Clock Assignment</h1>

  <div class="world-clock">
    <div class="controls">
      <CMultipleSelect
        :options="availableZones"
        label="title"
        mode="single"
        size="size-40"
        v-model="currentZone"
      />
      <CButton
        label="Add Clock"
        theme="success"
        size="size-44"
        type="border"
        @click="insertClock"
      />
    </div>

    <div class="clocks">
      <div v-for="clock in clockList" :key="clock.id" class="clock">
        <div class="delete-icon">
          <CIcon
            icon="fal fa-close"
            type="border"
            theme="danger"
            @click="deleteClock(clock.id)"
          />
        </div>
        <h4 class="label">{{ clock.title }}</h4>
        <p class="time">{{ times[clock.id] }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.world-clock {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.clocks {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.clock {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  width: 120px;
  text-align: center;
  position: relative;
}

.label {
  margin: 0.5rem 0;
}

.time {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
}
</style>
