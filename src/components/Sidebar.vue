<script setup lang="ts">
import {
  CAccordion,
  CButton,
  CIcon,
  CIconLabel,
  CPopperSidePanel,
} from "@ccm-engineering/ui-components";
import type { ToolTipContent } from "@ccm-engineering/ui-components/dist/C-Popper-Side-Panel/C-Popper-Side-Panel-Types";
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const isOpenSidePanel = ref(false);
const router = useRouter();
const route = useRoute();

const content = ref<ToolTipContent[]>([
  {
    title: "Home",
    items: [{ label: "Home", value: "/", icon: "fal fa-home" }],
  },
  {
    title: "Clock",
    items: [
      { label: "Stop Watch", value: "/stopwatch", icon: "fal fa-stop" },
      { label: "World CLock", value: "/worldclock", icon: "fal fa-globe" },
    ],
  },
  {
    title: "Calculator",
    items: [
      { label: "Calculator", value: "/calculator", icon: "fal fa-calculator" },
    ],
  },
]);

const handleClick = (route: string) => {
  router.push(route);
  isOpenSidePanel.value = false;
};

const accordians = reactive<Record<string, boolean>>({
  Home: false,
  Clock: false,
  Calculator: false,
});

watch(
  () => route.path,
  (newPath) => {
    Object.keys(accordians).forEach((key) => (accordians[key] = false));

    for (const group of content.value) {
      if (group.items.some((item) => item.value === newPath)) {
        accordians[group.title] = true;
        break;
      }
    }
  }
);
</script>
<template>
  <div class="sidebar">
    <CPopperSidePanel v-model="isOpenSidePanel" :enable-side-panel="true">
      <template #trigger>
        <CIcon icon="fal fa-bars" hover size="large-64" color="new-black" />
      </template>

      <template #header>
        <h1>Sidebar</h1>
      </template>

      <template #action>
        <CIcon icon="fal fa-xmark" @click="isOpenSidePanel = false" />
      </template>

      <template #content>
        <div class="accordions">
          <CAccordion
            v-for="value in content"
            :key="value.title"
            theme="mt-black"
            v-model="accordians[value.title]"
          >
            <template #title>
              <div>
                <CIconLabel :label="value.title" :icon="value.items[0].icon" />
              </div>
            </template>

            <template #body>
              <div class="btn">
                <div v-for="item in value.items" :key="value.title">
                  <CButton
                    :label="item.label"
                    @click="handleClick(item.value)"
                    :icon="item.icon"
                    radius="xxs"
                    size="size-32"
                    :theme="route.path === item.value ? 'success' : 'neutral'"
                  />
                </div>
              </div>
            </template>
          </CAccordion>
        </div>
      </template>
    </CPopperSidePanel>
  </div>
</template>
<style lang="scss">
.sidebar {
  display: flex;
}

.btn {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-width: fit-content;
  margin-left: 10px;
}

.c-button {
  margin-bottom: 10px;
}

.accordions {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
</style>
