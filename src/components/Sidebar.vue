<script setup lang="ts">
import {
  CAccordion,
  CButton,
  CIcon,
  CIconLabel,
  CPopperSidePanel,
} from "@ccm-engineering/ui-components";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNavigation } from "../composables/useNavigation";

const router = useRouter();
const route = useRoute();
const sidebarOpen = ref<boolean>(false);
const { navGroups, setActivePath, setTitle } = useNavigation();

const handleAction = (value: string, label?: string) => {
  if (route.path === value) return;
  router.push(value);
  setActivePath(value);
  if (label) setTitle(label);
  sidebarOpen.value = false;
};

onMounted(() => {
  setActivePath(route.path);
});
</script>

<template>
  <div class="sidebar">
    <CPopperSidePanel v-model="sidebarOpen" enable-side-panel theme="mt-black">
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
        <div v-for="(group, idx) in navGroups" :key="idx">
          <CAccordion theme="cobalt">
            <template #title>
              <CIconLabel :icon="group.items[0].icon" :label="group.title" />
            </template>
            <template #body>
              <CButton
                v-for="(item, key) in group.items"
                :key="key"
                :class="item?.class"
                @click="handleAction(item.value, item.label)"
                :icon-class="item?.icon"
                :label="item.label"
                :theme="route.path === item.value ? 'mt-black' : 'neutral'"
                type="border"
                icon-position="left"
                radius="xs"
                size="size-40"
              />
            </template>
          </CAccordion>
        </div>
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
  margin-bottom: 12px;
}

.c-accordion {
  margin: 12px 0;

  .c-button {
    margin-left: 12px;
  }
}
</style>
