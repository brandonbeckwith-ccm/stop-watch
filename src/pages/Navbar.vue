<template>
  <nav class="app-nav">
    <div class="left">
      <i v-if="icon" :class="icon" class="page-icon" aria-hidden="true" />
      <div class="title">{{ title || "App" }}</div>
    </div>
    <div class="status">{{ status }}</div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNavigation } from "../composables/useSLWC";

const { title: titleRef, icon: iconRef, status: statusRef } = useNavigation();

const title = computed(() => titleRef.value);
const icon = computed(() => iconRef.value);
const status = computed(() => statusRef.value);
</script>

<style scoped>
.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #222;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  margin: 10px 0;
}
.left {
  display: flex;
  gap: 8px;
  align-items: center;
}
.page-icon {
  font-size: 18px;
}
.title {
  font-weight: 600;
}
.status {
  font-size: 14px;
  opacity: 0.95;
}
</style>
