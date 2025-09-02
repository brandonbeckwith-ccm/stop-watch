<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useStopwatch } from "../composables/useStopwatch";
import { useNavigation } from "../composables/useNavigation";
import { CButton, CTag } from "@ccm-engineering/ui-components";

const { elapsedTime, formattedTime, laps, formatTime, start, stop, reset, lap, intervalId } =
  useStopwatch();
const isRunning = computed(() => intervalId.value !== null);


const { setTitle, setIcon, setStatus, reset: resetNav } = useNavigation();

onMounted(async () => {
  setTitle("Stopwatch");
  setIcon("⏱️");
  await nextTick();
  setStatus("Ready to start");
});

const updateStatus = async () => {
  await nextTick();
  if (isRunning.value) {
    setStatus(`Running: ${formattedTime.value}`);
  } else if (laps.value.length > 0) {
    setStatus(`Stopped: ${formattedTime.value} (${laps.value.length} laps)`);
  } else {
    setStatus("Ready to start");
  }
};

watch([intervalId, laps], async () => {
  await updateStatus();
}, { immediate: true });


const handleStart = async () => {
  start();

  await nextTick();
  setStatus(`Running: ${formattedTime.value}`);
};

const handleStop = async () => {
  stop();
  await updateStatus();
};

const handleReset = async () => {
  reset();
  await updateStatus();
};

const handleLap = async () => {
  lap();
  await updateStatus();
};


onUnmounted(async () => {
  await resetNav();
});
</script>

<template>
  <div id="app">
    <h1>Stopwatch</h1>

    <div class="stopwatch-container">
      <div class="time-card">
        <h2>{{ formattedTime }}</h2>
      </div>

      <div class="control-buttons">
        <CButton
          @click="handleStart"
          :disable="isRunning"
          label="Start"
          size="size-48"
        ></CButton>
        <CButton @click="handleStop" :disable="!isRunning" label="Stop"></CButton>
        <CButton @click="handleReset" label="Reset"></CButton>
        <CButton @click="handleLap" :disable="!isRunning" label="Lap"></CButton>
      </div>

      <ul v-if="laps.length">
        <CTag
          v-for="(lapTime, index) in laps"
          :key="index"
          theme="sky-blue"
          size="medium-32"
          class="lap-tag"
        >
          Lap {{ laps.length - index }} - {{ formatTime(lapTime) }}
        </CTag>
      </ul>

      <div v-if="laps.length === 0 && !isRunning" class="instructions">
        <p>Click <strong>Start</strong> to begin timing.</p>
        <p>
          Click <strong>Lap</strong> to record lap times while the timer is
          running.
        </p>
        <p>
          Click <strong>Stop</strong> to pause, then click
          <strong>Start</strong> to resume.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  position: relative;
  max-width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.88));
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  text-align: center;
  justify-content: center;
  border: 1px solid rgba(59, 130, 246, 0.25);
  box-shadow: 0 14px 30px rgba(2, 6, 23, 0.32);
  margin-top: 80px;
}

h1 {
  color: #e5e7eb;
  background: linear-gradient(135deg, rgba(2, 6, 23, 0.65), rgba(30, 41, 59, 0.8));
  font-weight: 700;
  font-size: 30px;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.35);
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.stopwatch-container {
  max-width: 600px;
  margin: 0 auto;
}

.time-card {
  background: rgba(255, 255, 255, 0.10);
  color: #f3f4f6;
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.28), inset 0 0 24px rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: center;
  margin: 1rem;
  font-size: 34px;
  min-width: 300px;
  padding: 1.25rem 1.5rem;
}

h2 {
  color: #f9fafb;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0;
  text-shadow: 0 2px 10px rgba(59, 130, 246, 0.25);
}

.control-buttons {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.control-buttons :deep(button) {
  background: rgba(59, 130, 246, 0.16);
  border: 1px solid rgba(59, 130, 246, 0.45);
  color: #f8fafc;
  border-radius: 999px;
  padding: 0.6rem 1.1rem;
  transition: all 0.22s ease;
}

.control-buttons :deep(button:hover) {
  background: rgba(59, 130, 246, 0.24);
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 10px 22px rgba(59, 130, 246, 0.28);
}

.control-buttons :deep(button[disabled]) {
  opacity: 0.7;
  cursor: not-allowed;
}

.control-button {
  min-width: 100px;
}

ul {
  padding: 0.5rem 0.5rem 0.75rem;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 200px;
  overflow-y: auto;
  scroll-behavior: smooth;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.24);
  width: 100%;
  max-width: 500px;
}

.lap-tag {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92%;
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(29, 78, 216, 0.95), rgba(37, 99, 235, 0.95));
  color: #f8fafc;
  border-radius: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 6px 16px rgba(2, 6, 23, 0.35);
  text-align: center;
  border: 1px solid rgba(59, 130, 246, 0.45);
}

.lap-tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(2, 6, 23, 0.45);
  border-color: rgba(59, 130, 246, 0.65);
}

.instructions {
  background: rgba(255, 255, 255, 0.08);
  color: #e5e7eb;
  border: 1px solid rgba(148, 163, 184, 0.3);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-top: 1rem;
  font-size: 16px;
  line-height: 1.6;
  box-shadow: 0 8px 20px rgba(2, 6, 23, 0.24);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 600px) {
  #app {
    padding: 0.5rem;
    margin-top: 60px;
  }

  h1 {
    font-size: 26px;
    padding: 0.8rem 1.5rem;
  }

  .time-card {
    font-size: 24px;
    padding: 1rem;
    min-width: 250px;
  }

  .control-buttons {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  ul {
    width: 90%;
    max-width: none;
    margin: 1rem auto;
  }
}
</style>
