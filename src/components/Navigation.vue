<script setup lang="ts">
import { computed } from "vue";
import { useNavigation } from "../Composables/useNavigation";

const nav = useNavigation();

const title = computed(() => nav.title.value);
const icon = computed(() => nav.icon.value);
const status = computed(() => nav.status.value);
</script>

<template>
  <div class="nav-bar">
    <div class="nav-left">
      <i v-if="icon" :class="icon" aria-hidden="true"></i>
      <span class="nav-title">{{ title }}</span>
    </div>
    <div class="nav-status">
      <small>{{ status }}</small>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
}
.nav-left {
  display: flex;
  gap: 8px;
  align-items: center;
}
.nav-title {
  font-weight: 600;
  font-size: 1.1rem;
}
.nav-status {
  color: var(--c-secondary, #9aa7b2);
}
i {
  font-size: 1.2rem;
}
</style>
