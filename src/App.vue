<script setup lang="ts">
import { CTabs } from "@ccm-engineering/ui-components";
import type { TabItem } from "@ccm-engineering/ui-components/dist/C-Tabs/C-Tabs";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { provideNavigation } from "./Composables/useNavigation";
import Navigation from "./components/Navigation.vue";

provideNavigation();

const router = useRouter();
const route = useRoute();

const tabArray: TabItem[] = [
  { label: "Watch", value: "watch", icon: "fal fa-clock" },
  { label: "Custom Ref", value: "custom-ref", icon: "" },
  { label: "Calculator", value: "calculator", icon: "fal fa-calculator" },
];

const selectedTab = ref("watch");

const onTabChange = (value: string) => {
  selectedTab.value = value;

  switch (value) {
    case "watch":
      router.push("/watch/stopwatch");
      break;
    case "custom-ref":
      router.push("/custom-ref");
      break;
    case "calculator":
      router.push("/calculator");
      break;
  }
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes("/watch")) {
      selectedTab.value = "watch";
    } else if (newPath.includes("/custom-ref")) {
      selectedTab.value = "custom-ref";
    } else if (newPath.includes("/calculator")) {
      selectedTab.value = "calculator";
    }
  }
);

onMounted(() => {
  if (route.path === "/") {
    router.push("/watch/stopwatch");
  }
});
</script>

<template>
  <div id="app">
    <Navigation />
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
