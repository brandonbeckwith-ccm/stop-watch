<script setup lang="ts">
import { CIcon } from "@ccm-engineering/ui-components";
import { useNavbar } from "../composables/useNavbar";

const { goHome, goClocks, goStopwatch, goCalculator } = useNavbar();
</script>

<template>
  <div class="action-buttons">
    <div class="navbar-label">
      <span class="navbar-label-text">ASSIGNMENT</span>
    </div>
    <button class="btn" @click="goHome">
      <CIcon
        :border="false"
        icon="fa-regular fa-home"
        :noSpacing="false"
        size="large-48"
        color="ocean-blue"
        radius="full"
      />
      <span class="btn-label">Home</span>
    </button>
    <button class="btn" @click="goClocks">
      <CIcon
        :border="false"
        icon="fa-regular fa-clock-desk"
        :noSpacing="false"
        size="large-48"
        color="ocean-blue"
        radius="full"
      />
      <span class="btn-label">Clocks</span>
    </button>
    <button class="btn" @click="goStopwatch">
      <CIcon
        :border="false"
        icon="fa-regular fa-stopwatch"
        :noSpacing="false"
        size="large-48"
        color="ocean-blue"
        radius="full"
      />
      <span class="btn-label">Stopwatch</span>
    </button>
    <button class="btn" @click="goCalculator">
      <CIcon
        :border="false"
        icon="fa-regular fa-calculator"
        :noSpacing="false"
        size="large-48"
        color="ocean-blue"
        radius="full"
      />
      <span class="btn-label">Calculator</span>
    </button>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 40px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
::v-deep(.c-icon-wrapper.c-icon-size-48) {
  width: 0px;
  min-width: 35px;
}
.btn {
  all: unset;
  cursor: pointer;
  padding: 0 15px 0 5px;
}
.btn:hover {
  padding: 0 15px 0 5px;
  background-color: #e8eff2;
  border-radius: 10px;
}
.btn-label {
  font-weight: 500;
  color: #165c7d;
}
.navbar-label {
  display: flex;
  align-items: center;
  padding-right: 30px;
  padding-left: 50px;
}
.navbar-label-text {
  font-size: 20px;
  font-weight: 600;
  color: cornflowerblue;
}
</style>
