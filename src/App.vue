<script setup lang="ts">
import { CButtonDropdown, CTag } from "@ccm-engineering/ui-components";
import { RouterLink, RouterView } from "vue-router";
import { POSITION, provideToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { provideNavigation } from "./composables/useSLWC";
import Navbar from "./pages/Navbar.vue";

provideToast({
  timeout: 3000,
  position: POSITION.TOP_RIGHT,
});

provideNavigation()

const stopwatchOptions = [
  { label: "Stopwatch", to: "/stopwatch" },
  { label: "Laps", to: "/stopwatch/laps" },
];
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <nav class="nav">
        <CButtonDropdown
          color="black"
          label="Stopwatch"
          noDataText="No data found"
          radius="xl"
          size="size-44"
          type="border"
          icon-class=""
        >
          <template #content>
            <div class="dropdown-menu">
              <RouterLink
                v-for="item in stopwatchOptions"
                :key="item.to"
                :to="item.to"
                class="nav-link"
                active-class="active"
              >
                {{ item.label }}
              </RouterLink>
            </div>
          </template>
        </CButtonDropdown>

        <CTag>
          <RouterLink to="/worldClocks" class="nav-link" active-class="active">
            Clock
          </RouterLink>
        </CTag>
        <CTag>
          <RouterLink to="/calculator" class="nav-link" active-class="active">
            Calculator
          </RouterLink>
        </CTag>
      </nav>
    </header>

    <Navbar/>

    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
.app-header {
  background: #342c50;
  padding: 10px;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.nav-link {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s;
  text-decoration: none;
  display: block;
}
.nav-link:hover {
  background: rgba(76, 0, 255, 0.2);
}
.active {
  background: #3498db;
}
.dropdown-menu {
  display: flex;
  flex-direction: column;
  padding: 4px 0;
}
</style>
