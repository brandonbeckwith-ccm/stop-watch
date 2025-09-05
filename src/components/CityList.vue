<script setup lang="ts">
import { useWorldClock } from "../composables/useWorldClock";
import CityRows from "./CityRows.vue";

const { cityGroup } = useWorldClock();
</script>

<template>
  <div>
    <CityRows
      v-for="(cityGroup, index) of cityGroup"
      :key="index"
      :cityGroup="cityGroup"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
}
.items {
  width: fit-content;
  gap: 25px;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
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
.city-list {
  display: flex;
  flex-direction: row;
  gap: 25px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.city-label {
  font-size: 16px;
  font-weight: 500;
}
</style>
