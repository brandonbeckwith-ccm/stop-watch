<script setup lang="ts">
import { CButton, CIcon, CModal } from "@ccm-engineering/ui-components";
import { useStopWatch } from "../composables/stopwatch";

const {
  start,
  timeDisplay,
  reset,
  lap,
  stop,
  formatTime,
  laps,
  getTotal,
  showModal,
} = useStopWatch();
</script>
<template>
  <CModal
    :modelValue="showModal"
    horizontal-alignment="center"
    vertical-alignment="center"
    size="small"
    :hideHeaderClose="false"
  >
    <template #header>Are you sure you want to reset?</template>
    <template #body>
      <p class="sub-title">Resting will remove the lap data as well</p>
    </template>
    <template #footer>
      <div class="action-button">
        <CButton label="Reset" theme="danger" type="border" @clicked="reset" />
        <CButton
          label="Cancel"
          theme="black"
          type="border"
          @clicked="showModal = false"
        />
      </div>
    </template>
  </CModal>

  <div class="stop-watch-wrapper">
    <div class="card stop-watch-card">
      <div class="stop-watch-timmer">
        <p>{{ timeDisplay }}</p>
      </div>
      <div class="action-button">
        <CButton label="Start" theme="success" type="border" @clicked="start" />
        <CButton label="Stop" theme="danger" type="border" @clicked="stop" />
        <CButton
          label="Reset"
          theme="black"
          type="border"
          @clicked="showModal = true"
        />
        <CButton label="Lap" theme="black" type="border" @clicked="lap" />
      </div>
    </div>
    <div class="card laps-list">
      <div class="lap-header">
        <div>Lap</div>
        <div>LapTime</div>
        <div>Total Time</div>
      </div>
      <hr />
      <ul v-if="laps.length">
        <li v-for="(lap, index) in laps" :key="index">
          <div><CIcon icon="fa regular fa-flag"></CIcon>{{ index + 1 }}</div>
          <div><CIcon icon=""></CIcon>{{ formatTime(lap) }}</div>
          <div>{{ getTotal(laps) }}</div>
        </li>
      </ul>
    </div>
  </div>


</template>

<style scoped lang="scss">

.sub-title {
  color: gray;
}
.action-button {
  display: flex;
  gap: 20px;
  justify-content: end;
}
.stop-watch-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  margin: 20px;
  justify-content: center;
  .card {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 1.5rem;
    flex: 1 1 300px;
    max-width: 500px;
  }
  .stop-watch-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .stop-watch-timmer {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1.5rem;
    }
    .action-button {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  }

  .laps-list {
    .lap-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        font-size: 0.95rem;
      }
    }
  }
}
</style>
