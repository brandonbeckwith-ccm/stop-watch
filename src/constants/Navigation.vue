<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import { watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { selectedTabValue } from "../helper/customRef";
import { useNavigation } from "../composables/useNavigation";

const tabs = [
  { label: "Clock", value: "clock", route: "/" },
  { label: "Calculator", value: "calculator", route: "/calculator" },
  { label: "Readme", value: "readme", route: "/readme" },
];


const router = useRouter();
const route = useRoute();

const syncTabWithRoute = () => {
  if (route.path.startsWith("/calculator")) {
    selectedTabValue.value = "calculator";
  } else if (route.path.startsWith("/readme")) {
    selectedTabValue.value = "readme";
  } else if (route.path.startsWith("/clock")) {
    selectedTabValue.value = "clock";
  } else {
    selectedTabValue.value = "clock";
  }
};

watch(() => route.path, syncTabWithRoute);
onMounted(syncTabWithRoute);

const onTabSelect = (tabValue: string) => {
  selectedTabValue.value = tabValue;
  const tab = tabs.find((t) => t.value === tabValue);
  if (tab) {
    router.push(tab.route);
  }
};

const { title, icon, status } = useNavigation();
</script>

<template>
  <div class="nav-container">
    <div class="navigation-bar">
      <div class="tabs-wrap">
        <CTabs
          align="centered"
          :selected="selectedTabValue"
          slider
          :tabs="tabs"
          theme="cobalt"
          @selected-tab="onTabSelect"
          class="tabs"
        />
      </div>

      <div class="nav-info">
        <div class="nav-left">
          <i :class="icon"></i>
          <h1>{{ title }}</h1>
        </div>
        <div class="nav-right">
          <span class="status">{{ status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-container {
  .navigation-bar {
    background: #1e90ff;
    padding: 8px 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .tabs-wrap {
    display: flex;
    align-items: center;
    min-width: 0;
    flex: 1 1 auto;
  }

  .nav-info {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 0 0 auto;
    color: white;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  h1 {
    font-size: 1.05rem;
    margin: 0;
    font-weight: 600;
  }

  .status {
    font-size: 0.9rem;
    opacity: 0.9;
  }
}
</style>
