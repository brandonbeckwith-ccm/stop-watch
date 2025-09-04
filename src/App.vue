<script setup lang="ts">

import { useRoute } from "vue-router";
import { provideNavigation } from "./composables/useNavigation";
import Navigation from "./constants/Navigation.vue";
const route = useRoute();
provideNavigation(route);
</script>

<template>
  <div id="app">
    <Navigation />
    <RouterView></RouterView>
  </div>
</template>
