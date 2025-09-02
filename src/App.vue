<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import { provideNavigation } from "./composables/useNavigation";

provideNavigation();
</script>

<template>
  <Navbar />
  <RouterView />
</template>

<style scoped></style>
