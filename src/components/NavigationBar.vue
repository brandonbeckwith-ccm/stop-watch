<script setup lang="ts">
import { CIconLabel } from "@ccm-engineering/ui-components";
import { useNavigation } from "../composables/useNavigation";

const { title, icon, status } = useNavigation();
</script>

<template>
  <header class="flex items-center gap-4 p-4 bg-gray-900 text-white">
    <CIconLabel :icon="icon" :label="title" /> 
    <span class="ml-auto text-sm opacity-75">{{ status }}</span>
  </header>
</template>