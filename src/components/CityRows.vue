<script setup lang="ts">
import { useWorldClock } from "../composables/useWorldClock";
import { CIconLabel } from "@ccm-engineering/ui-components";

const props = defineProps(["cityGroup"]);

const { addItem, isAdded } = useWorldClock();
</script>

<template>
  <div>
    <div class="index">
      <CIconLabel
        :label="props.cityGroup.char"
        labelType="dialer"
        iconColor="informative"
        size="large-48"
      />
    </div>
    <ul class="city-list">
      <div v-for="(item, index) of props.cityGroup.citySort" :key="index">
        <li class="added-items" v-if="isAdded.includes(item.id)">
          <p class="city-label">{{ item.city }}</p>
        </li>
        <div v-else>
          <li class="items">
            <p class="city-label">{{ item.city }}</p>
            <button @click="addItem(item)" class="btn">add</button>
          </li>
        </div>
      </div>
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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.added-items {
  width: fit-content;
  gap: 25px;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  align-items: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, #20b357 0px 0px 0px 1px;
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
  padding: 0 0 0 40px;
  margin: 10px 0 30px 0;
}
.city-label {
  font-size: 16px;
  font-weight: 500;
}
.index {
  display: flex;
  padding-left: 20px;
}
</style>
