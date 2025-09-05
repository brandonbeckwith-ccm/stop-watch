<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import { provide } from "vue";
import { stopwatch } from "../composables/useStopWatch";
import { result } from "../composables/useCalculator";
import { useNavbar } from "../composables/useNavbar";
import {statusClock} from '../composables/useWorldClock'

const {currentPage} = useNavbar()

provide("navbarStatus", {
  currentPage,
  stopwatch,
  result,
  statusClock
});
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
