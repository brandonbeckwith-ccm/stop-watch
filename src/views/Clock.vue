<script setup lang="ts">
import { CButtonDropdown } from "@ccm-engineering/ui-components";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { selectedTabValue } from "../helper/customRef";
import { useNavigation } from "../composables/useNavigation";

const router = useRouter();

const clocks = [
  { label: "Stopwatch", value: "stopwatch", route: "/clock/stopwatch" },
  { label: "World Clock", value: "worldClock", route: "/clock/worldClock" },
];

const selectClock = (index: number) => {
  const route = clocks[index].route;
  router.push(route);
};

const { updateNavigation } = useNavigation();
onMounted(() => {
  updateNavigation({
    title: "Clocks",
    icon: "fal fa-clock",
    status: "Select a clock",
  });
});
</script>

<template>
  <div class="clocks-dropdown-wrapper">
    <div>
      <CButtonDropdown
        v-if="selectedTabValue === 'clock'"
        color="primary"
        iconClass="fa-solid fa-angle-down"
        label="Clocks"
        noDataText="No data found"
        radius="sm"
        size="size-36"
        type="fill"
        class="cdropdown"
      >
        <template #content>
          <div class="dropdown-container">
            <div
              class="dropdown-item"
              v-for="(value, index) in clocks"
              :key="index"
              @click="selectClock(index)"
            >
              {{ value.label }}
            </div>
          </div>
        </template>
      </CButtonDropdown>
    </div>

    <div class="clock-component">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.clocks-dropdown-wrapper {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.dropdown-container {
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border-radius: 0 0 5px 5px;
  padding: 0 !important;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 0.95rem;
  color: #333;
}

.dropdown-item:hover {
  background-color: #eef3f8;
}

.dropdown-item:nth-child(even) {
  background-color: #f9f9f9;
}
.c-button-dropdown.is-active
  .c-button-dropdown-menu.is-top.c-button-dropdown-rds-xs {
  border-radius: 5px 5px 0 0;
}
.clock-component {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}
.c-button-dropdown-menu {
  background-color: var(--white);
  overflow: hidden;
  width: 100%;
  min-width: 100px;
  border: none !important;
  border-radius: 0 0 var(--rds-md) var(--rds-md);
  position: absolute;
}
@media (max-width: 768px) {
  .dropdown-container {
    min-width: 100%;
  }
}
</style>
