<script setup>
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import CityList from "../components/CityList.vue";
import { CModal } from "@ccm-engineering/ui-components";
import { useWorldClock } from "../composables/useWorldClock";
import CitySelectModal from "../components/CitySelectModal.vue";

dayjs.extend(utc);
dayjs.extend(timezone);

const { list, now, timeZones, timeLabel, dateLabel, addItem, removeItem } = useWorldClock();
</script>

<template>
  <div class="app">
    <div class="container">
      <ul class="clock-wall">
        <li class="items" v-for="(item, index) of list" :key="index">
          <span class="city-label">{{ item.city }}</span>
          <div class="date">
            <span class="time-label">{{ timeLabel(item.id) }}</span>
            <span class="date-label">{{ dateLabel(item.id) }}</span>
          </div>
          <button @click="removeItem(item.id)" class="btn">remove</button>
        </li>
      </ul>
      <div class="new-btn">
        <CitySelectModal />
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  max-width: 1200px;
}
.items {
  width: calc(50% - 30px);
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.btn {
  align-items: center;
  height: 40px;
  border: 1px solid #dfdfdf;
  border-radius: 11px;
  color: #165c7d;
  background-color: #e8eff2;
  cursor: pointer;
  display: flex;
  right: 0px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 33.4929px;
  justify-content: center;
}
.clock-wall {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 500px;
  width: -webkit-fill-available;
  gap: 30px;
  align-content: flex-start;
  padding: 20px 0 20px 35px;
  margin: 0;
  overflow-y: auto;
}
.date {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
.container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 550px;
  border-radius: 15px;
  min-width: 1200px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.city-label {
  font-size: 18px;
  font-weight: 500;
}
.time-label {
  font-size: 20px;
  font-weight: 500;
}
.date-label {
  font-size: 15px;
  font-weight: 500;
}
.new-btn {
  display: flex;
  padding-left: 35px;
  margin-bottom: 20px;
}
</style>
