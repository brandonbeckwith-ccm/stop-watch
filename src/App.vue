<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import { createNavigation } from "./composables/useNavigation";
import { useRoute } from "vue-router";
import { watch } from "vue";

const { title, setActivePath, setTitle } = createNavigation();
const route = useRoute();

watch(
  () => route.path,
  (p) => {
    setActivePath(p);
  },
  { immediate: true }
);

watch(
  () => route.name,
  (n) => {
    if (typeof n === "string") setActivePath(route.path);
    if (typeof n === "string") {
      const t = n || route.path;
      try {
        setTitle(t as string);
      } catch (e) {}
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="ccm-new">
    <header class="app-header">
      <h1>{{ title }}</h1>
      <Sidebar />
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
