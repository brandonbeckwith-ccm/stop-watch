<script setup lang="ts">
import { useRouter } from "vue-router";
import { createNavigation } from "./composables/useNavigation";
import NavBar from "./custom-component/NavBar.vue";
import { ref } from "vue";
import { CButton } from "@ccm-engineering/ui-components";

createNavigation();

const router = useRouter();
const showClockMenu = ref(false);

const goTo = (path: string) => {
  router.push(path);
  showClockMenu.value = false;
};
</script>

<template>
  <div id="app">
    <NavBar />
    <nav class="nav-bar">
      <div class="dropdown">
        <CButton label="Clock ⌵" @click="showClockMenu = !showClockMenu" />
        <div v-if="showClockMenu" class="dropdown-menu">
          <CButton label="Stopwatch" @click="goTo('/clock/stopwatch')" />
          <CButton label="World Clock" @click="goTo('/clock/worldClock')" />
        </div>

        <CButton label="Custom Ref" @click="goTo('/customRef')" />
        <CButton label="Calculator" @click="goTo('/calculator')" />
      </div>
    </nav>

    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.nav-bar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  position: relative;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 2.8rem;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem;
  z-index: 10;
}
</style>
