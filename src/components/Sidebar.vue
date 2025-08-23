<script setup lang="ts">
import {
  CButton,
  CIcon,
  CPopperSidePanel,
} from "@ccm-engineering/ui-components";
import type { ToolTipContent } from "@ccm-engineering/ui-components/dist/C-Popper-Side-Panel/C-Popper-Side-Panel-Types";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const sidebarOpen = ref<boolean>(false);
const tooltipContent: Omit<ToolTipContent, "title"> = {
  items: [
    { label: "Home", value: "/", icon: "fal fa-home" },
    { label: "Stopwatch", value: "/stopwatch", icon: "fal fa-stopwatch" },
    { label: "World Clock", value: "/worldclock", icon: "fal fa-globe" },
  ],
};

const handleAction = (value: string) => {
  router.push(value);
  sidebarOpen.value = false;
};
</script>

<template>
  <div class="sidebar">
    <CPopperSidePanel v-model="sidebarOpen" enable-side-panel>
      <template #trigger>
        <CIcon icon="fal fa-bars" size="large-64" hover />
      </template>

      <template #header>
        <h1>Sidebar</h1>
      </template>

      <template #action>
        <CIcon
          icon="fal fa-xmark"
          size="large-48"
          @click="sidebarOpen = false"
          hover
        />
      </template>

      <template #content>
        <CButton
          v-for="(item, key) in tooltipContent.items"
          :key="key"
          :class="item?.class"
          @click="handleAction(item.value)"
          :icon-class="item?.icon"
          :label="item.label"
          :theme="route.path === item.value ? 'success' : 'primary'"
          type="border"
          size="size-48"
          icon-position="left"
          :disable="route.path === item.value"
        />
      </template>
    </CPopperSidePanel>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  display: flex;
  justify-content: flex-end;
}
.c-button {
  margin-bottom: 20px;
}
</style>
