<script setup lang="ts">
import { useNavigation } from "../composables/useNavigation";

const { title, icon, status } = useNavigation();
</script>
<template>
  <nav class="nav-bar">
    <div>
      <span class="icon">{{ icon }}</span>
      <span class="title">{{ title }}</span>
    </div>
    <div class="status">
      {{ status }}
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: #a083e3;
  border-radius: 10px;
}

.status {
  color: #555;
}
</style>
