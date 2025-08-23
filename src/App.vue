<script setup lang="ts">
import {
  CAccordion,
  CCollapsibleSidebar,
  CIcon,
  CIconLabel,
  CTabs,
  CTag,
} from "@ccm-engineering/ui-components";
import StopWatch from "./custom-component/StopWatch.vue";
import WorldClock from "./custom-component/WorldClock.vue";
import { tabs } from "./helpers";
import RefPanel from "./custom-component/RefPanel.vue";
import { ref } from "vue";
const openSlideBar = ref(false);
const clockAccordian = ref(false);
const selectedTab = ref<string | null>(null);

const selectTab = (tab: string) => {
  selectedTab.value = tab;
};
</script>

<template>
  <div id="app">
    <CCollapsibleSidebar v-model="openSlideBar" closed-class="hello">
      <div
        class="nav-tab"
        :class="{ active: selectedTab === 'home' }"
        @click="selectTab('home')"
      >
        <div class="title">
          <CIcon icon="fa-solid fa-house"></CIcon>
          <span class="sub-title">Home</span>
        </div>
      </div>
      <div class="nav-tab">
        <CAccordion v-model="clockAccordian">
          <template #title>
            <CIcon icon="fa-solid fa-clock"></CIcon>
            <span>Clock</span>
          </template>
          <template #content>
            <div
              class="sub-nav-tab"
              :class="{ active: selectedTab === 'stopWatch' }"
              @click="selectTab('stopWatch')"
            >
              <div class="title">
                <CIcon icon="fa-solid fa-stopwatch"></CIcon>
                <span class="sub-title">Stop Watch</span>
              </div>
            </div>
            <div
              class="sub-nav-tab"
              :class="{ active: selectedTab === 'worldClock' }"
              @click="selectTab('worldClock')"
            >
              <div class="title">
                <CIcon icon="fa-solid fa-clock"></CIcon>
                <span class="sub-title">World Clock</span>
              </div>
            </div>
          </template>
        </CAccordion>
      </div>
      <div
        class="nav-tab"
        :class="{ active: selectedTab === 'customRef' }"
        @click="selectTab('customRef')"
      >
        <div class="title">
          <CIcon icon="fa-solid fa-code"></CIcon>
          <span class="sub-title">Custom Ref</span>
        </div>
      </div>
    </CCollapsibleSidebar>
    
    <!-- <CTabs
      selected="stopWatch"
      theme="sky-blue"
      :tabs="tabs"
      :full-width="true"
    >
      <template #tab="{ activeValue }">
        <div v-if="activeValue == 'stopWatch'">
          <StopWatch></StopWatch>
        </div>
        <div v-if="activeValue == 'worldClock'">
          <WorldClock></WorldClock>
        </div>
        <div v-if="activeValue == 'customRef'">
          <RefPanel></RefPanel>
        </div>
      </template>
    </CTabs> -->
  </div>
</template>

<style scoped lang="scss">
.hello {
  width: 300px;
}
.nav-tab {
  padding: 15px;
  cursor: pointer;
}
.sub-nav-tab {
  padding: 15px 0px 15px 0px;
  cursor: pointer;
}
.sub-tab {
  padding: 0;
  margin-bottom: 5px;
}
.title {
  padding: 10px 0px 10px 24px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.nav-tab.active .title {
  border-color: darkblue;
  background: #f0f4ff;
}

.sub-nav-tab.active .title {
  border-color: darkblue;
  background: #f0f4ff;
}

.sub-title {
  margin-top: 5px;
}
</style>
