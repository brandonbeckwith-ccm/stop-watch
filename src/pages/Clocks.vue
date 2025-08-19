<script setup>
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import CityList from "../components/CityList.vue";
import { useWorldClock } from "../composables/useWorldClock";

dayjs.extend(utc);
dayjs.extend(timezone);

const {
  list,
  now,
  cities,
  isCityListVisible,
  timeZones,
  toggleVisibility,
  addItem,
  removeItem,
} = useWorldClock();
</script>

<template>
  <div class="new-btn">
    <button class="btn-6" @click="toggleVisibility">
      {{ !isCityListVisible ? "Add New Cities" : "Back" }}
    </button>
  </div>
  <div v-if="!isCityListVisible" class="app">
    <div class="container">
      <ul class="clock-wall">
        <li class="items" v-for="item of list">
          <span class="city-label">{{ item.city }}</span>
          <div class="date">
            <span class="time-label">{{ dayjs(now).tz(timeZones[item.id]).format("hh:mm A") }}</span>
            <span class="date-label">{{ dayjs(now).tz(timeZones[item.id]).format("ddd DD MMM YYYY") }}</span>
          </div>
          <button @click="removeItem(item.id)" class="btn">remove</button>
        </li>
      </ul>
    </div>
  </div>
  <div v-else-if="isCityListVisible">
    <CityList :cities="cities" />
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
  justify-content: center;
  min-height: 500px;
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
  justify-content: center;
  margin-bottom: 30px;
}
.btn-6 {
  align-items: center;
  height: 40px;
  width: 200px;
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
</style>
