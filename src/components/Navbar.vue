<script setup lang="ts">
import { CIcon } from "@ccm-engineering/ui-components";
import { useNavbar } from "../composables/useNavbar";
import { inject, watch } from "vue";
import type { NavbarStatus } from "../composables/useNavbar";

const { goHome, goClocks, goStopwatch, goCalculator } = useNavbar();

const navbarStatus = inject("navbarStatus") as NavbarStatus;
const { currentPage, stopwatch, result, statusClock } = navbarStatus;
</script>

<template>
  <div class="navbar">
    <div class="action-buttons">
      <div class="navbar-label">
        <span class="navbar-label-text">ASSIGNMENT</span>
      </div>
      <button v-if="currentPage !== 'Home'" class="btn" @click="goHome">
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
      <button v-if="currentPage !== 'Clocks'" class="btn" @click="goClocks">
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
      <button
        v-if="currentPage !== 'Stopwatch'"
        class="btn"
        @click="goStopwatch"
      >
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
      <button
        v-if="currentPage !== 'Calculator'"
        class="btn"
        @click="goCalculator"
      >
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
    <div class="navbar-status">
      <button class="current-page-btn">
        <CIcon
          :border="false"
          :icon="
            currentPage === 'Home'
              ? 'fa-regular fa-home'
              : currentPage === 'Clocks'
              ? 'fa-regular fa-clock-desk'
              : currentPage === 'Stopwatch'
              ? 'fa-regular fa-stopwatch'
              : currentPage === 'Calculator'
              ? 'fa-regular fa-calculator'
              : ''
          "
          :noSpacing="false"
          size="large-48"
          color="ocean-blue"
          radius="full"
        />
        <span class="btn-label">{{ currentPage }}</span>
      </button>
      <div class="navbar-status-box">
        {{
          currentPage === "Home"
            ? "Hello, Welcome"
            : currentPage === "Clocks"
            ? statusClock
            : currentPage === "Stopwatch"
            ? stopwatch
            : currentPage === "Calculator"
            ? result || "Do Math"
            : "Please wait.."
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 40px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.action-buttons {
  display: flex;
  gap: 10px;
}
.new-label {
  display: flex;
  justify-content: center;
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
.current-page-btn {
  all: unset;
  padding: 0 15px 0 5px;
  padding: 0 15px 0 5px;
  background-color: #e8eff2;
  border-radius: 10px;
}
.navbar-status {
  display: flex;
  gap: 10px;
}
.navbar-status-box {
  all: unset;
  padding: 15px;
  background-color: #e8eff2;
  border-radius: 10px;
  width: 120px;
  font-weight: 500;
  color: #165c7d;
  display: flex;
  justify-content: center;
  font-variant-numeric: tabular-nums;
}
</style>
