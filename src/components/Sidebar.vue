<script setup lang="ts">
import {
  CButton,
  CIcon,
  CPopperSidePanel,
} from "@ccm-engineering/ui-components";
import type { ToolTipContent } from "@ccm-engineering/ui-components/dist/C-Popper-Side-Panel/C-Popper-Side-Panel-Types";
import { ref } from "vue";
import { useRouter } from "vue-router";

const isOpenSidePanel = ref(false);
const router = useRouter();
const content: Omit<ToolTipContent, "title"> = {
  items: [
    { label: "Home", value: "/", icon: "fal fa-home" },
    { label: "About Us", value: "/about", icon: "fal fa-info" },
    { label: "Stop Watch", value: "/stopwatch", icon: "fal fa-stop" },
    { label: "World Clock", value: "/worldclock", icon: "fal fa-stop" },
  ],
};

const handleClick = (route: string) => {
  router.push(route);
  isOpenSidePanel.value=false
};
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
        <div class="btn">
        <CButton
          
          v-for="item in content.items"
          :label="item.label"
          @click="handleClick(item.value)"
          :icon="item.icon"
        />
        </div>
      </template>
    </CPopperSidePanel>
  </div>
</template>
<style lang="scss">
.sidebar {
  display: flex;
}

.btn{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
