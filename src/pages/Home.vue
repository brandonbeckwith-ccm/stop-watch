<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useNavigation } from "../composables/useNavigation";
const route = useRoute();
const { setNavigation } = useNavigation();

const updateNavigation = () => {
  if (route.name === "Home") {
    setNavigation("Home", "fal fa-home", "Welcome to Home Page");
  }
};

onMounted(updateNavigation);

watch(() => route.name, updateNavigation);
</script>
<template></template>
<style scoped></style>
