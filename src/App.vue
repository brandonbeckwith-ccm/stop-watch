<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import type { TabItem } from "@ccm-engineering/ui-components/dist/C-Tabs/C-Tabs";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";

const router = useRouter();
const route = useRoute();

const tabArray: TabItem[] = [
  { label: "StopWatch", value: "stopwatch", icon: "fal fa-stopwatch" },
  { label: "World Clock", value: "world-clock", icon: "fal fa-clock" },
];

const selectedTab = ref("stopwatch");

const onTabChange = (value: string) => {
  selectedTab.value = value;
  if (value !== route.path) {
    router.push(value === "stopwatch" ? "/" : "/" + value);
  }
};

watch(
  () => route.path,
  (newPath) => {
    selectedTab.value = newPath;
  }
);

onMounted(() => {
  router.push("/");
});
</script>

<template>
  <div id="app">
    <CTabs
      :tabs="tabArray"
      :selected="selectedTab"
      @selectedTab="onTabChange"
      type="rounded"
      align="centered"
      size="large"
    />
    <router-view />
  </div>
</template>

<style></style>
