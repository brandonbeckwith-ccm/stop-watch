<script setup lang="ts">
import {
  CAccordion,
  CCollapsibleSidebar,
  CIcon,
} from "@ccm-engineering/ui-components";
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
    <div class="page-layout">
      <div class="left-panel">
        <CCollapsibleSidebar v-model="openSlideBar">
          <router-link to="/">
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
          </router-link>
          <div class="nav-tab">
            <CAccordion v-model="clockAccordian">
              <template #title>
                <CIcon icon="fa-solid fa-clock"></CIcon>
                <span>Clock</span>
              </template>
              <template #content>
                <router-link to="/clock/stopwatch">
                  <div
                    class="sub-nav-tab"
                    :class="{ active: selectedTab === 'stopWatch' }"
                    @click="selectTab('stopWatch')"
                  >
                    <div class="title-head">
                      <CIcon icon="fa-solid fa-stopwatch"></CIcon>
                      <span class="sub-title">Stop Watch</span>
                    </div>
                  </div>
                </router-link>
                <router-link to="/clock/worldClock">
                  <div
                    class="sub-nav-tab"
                    :class="{ active: selectedTab === 'worldClock' }"
                    @click="selectTab('worldClock')"
                  >
                    <div class="title-head">
                      <CIcon icon="fa-solid fa-clock"></CIcon>
                      <span class="sub-title">World Clock</span>
                    </div>
                  </div>
                </router-link>
              </template>
            </CAccordion>
          </div>
          <router-link to="/customRef">
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
          </router-link>
          <router-link to="/calculator">
            <div
              class="nav-tab"
              :class="{ active: selectedTab === 'calculator' }"
              @click="selectTab('calculator')"
            >
              <div class="title">
                <CIcon icon="fa-regular fa-calculator"></CIcon>
                <span class="sub-title">Calculator</span>
              </div>
            </div>
          </router-link>
        </CCollapsibleSidebar>
      </div>
      <div class="right-panel">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-layout {
  display: flex;
}
.right-panel {
  margin-left: 20px;
  margin-top: 0px;
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
.title,
.title-head {
  padding: 10px 0px 10px 24px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.title-head {
  padding: 10px 0px 10px 0px;
}
.nav-tab.active .title {
  border-color: darkblue;
  background: #f0f4ff;
}

.sub-nav-tab.active .title-head {
  border-color: darkblue;
  background: #f0f4ff;
}
.sub-title {
  margin-top: 5px;
}
a:-webkit-any-link {
  text-decoration: none !important;
}
</style>
