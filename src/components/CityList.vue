<script setup lang="ts">
import { useWorldClock } from "../composables/useWorldClock";

const props = defineProps(["cities"]);

const { addItem } = useWorldClock();
</script>

<template>
  <div>
    <ul class="city-list">
      <li class="items" v-for="item of props.cities">
        <p class="city-label">{{ item.city }}</p>
        <button @click="addItem(item)" class="btn">add</button>
      </li>
    </ul>
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
}
.city-label {
  font-size: 16px;
  font-weight: 500;
}
</style>
