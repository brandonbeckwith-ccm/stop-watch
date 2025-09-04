<script setup lang="ts">
import { useNavigation } from "../composables/useNavigation";

const { title, icon, status } = useNavigation();
</script>

<template>
  <header class="nav-bar">
    <span class="icon" aria-hidden="true">{{ icon }}</span>
    <h1 class="title">{{ title || '—' }}</h1>
    <div class="spacer" />
    <div class="status" :title="status">{{ status }}</div>
  </header>
</template>

<style scoped>
.nav-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #e6e6e6;
  background: #fafafa;
  width: 1000px;
  border: 1px solid rgb(53, 53, 70);
}
.icon { font-size: 18px; }
.title { font-size: 16px; font-weight: 600; margin: 0; }
.spacer { flex: 1; }
.status { font-size: 13px; opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
