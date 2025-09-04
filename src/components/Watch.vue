<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { CTabs } from "@ccm-engineering/ui-components";

const router = useRouter();
const route = useRoute();

const watchTabs = [
  { label: "StopWatch", value: "stopwatch", icon: "fal fa-stopwatch" },
  { label: "World Clock", value: "world-clock", icon: "fal fa-clock" },
];

const selectedWatchTab = ref<string>("stopwatch");

onMounted(() => {
  const routeName = route.name?.toString().toLowerCase();

  if (routeName?.includes("stopwatch")) {
    selectedWatchTab.value = "stopwatch";
  } else if (routeName?.includes("world-clock")) {
    selectedWatchTab.value = "world-clock";
  } else {
    selectedWatchTab.value = "stopwatch";
    router.replace({ name: "WatchStopwatch" });
  }
});

const handleWatchTabChange = (value: string) => {
  selectedWatchTab.value = value;
  router.push({
    name: value === "stopwatch" ? "WatchStopwatch" : "WatchWorldClock",
  });
};

watch(
  () => route.name,
  (newName) => {
    const name = newName?.toString().toLowerCase();
    if (name?.includes("stopwatch")) selectedWatchTab.value = "stopwatch";
    else if (name?.includes("world-clock"))
      selectedWatchTab.value = "world-clock";
  }
);
</script>

<template>
  <div>
    <CTabs
      :tabs="watchTabs"
      :selected="selectedWatchTab"
      @selectedTab="handleWatchTabChange"
      type="rounded"
      align="centered"
      size="large"
    />
    <router-view />
  </div>
</template>
