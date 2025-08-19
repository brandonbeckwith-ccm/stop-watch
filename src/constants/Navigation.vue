<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const tabs = [
  { label: "Welcome", value: "welcome", route: "/" },
  { label: "Stopwatch", value: "stopwatch", route: "/stopwatch" },
  { label: "World Clock", value: "worldClock", route: "/world-clock" },
];

const selectedTabValue = ref<string>("welcome");
const router = useRouter();
const route = useRoute();

const syncTabWithRoute = () => {
  if (route.path.startsWith("/world-clock")) {
    selectedTabValue.value = "worldClock";
  } else if (route.path.startsWith("/stopwatch")) {
    selectedTabValue.value = "stopwatch";
  } else {
    selectedTabValue.value = "welcome";
  }
};

onMounted(syncTabWithRoute);
watch(() => route.path, syncTabWithRoute);

const onTabSelect = (tabValue: string) => {
  selectedTabValue.value = tabValue;
  const tab = tabs.find(t => t.value === tabValue);
  if (tab) {
    router.push(tab.route);
  }
};
</script>

<template>
  <CTabs
    align="centered"
    fullWidth
    :selected="selectedTabValue"
    slider
    :tabs="tabs"
    theme="primary"
    @selected-tab="onTabSelect"
  />
</template>
