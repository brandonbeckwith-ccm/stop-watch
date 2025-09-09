<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNavigationProvider } from './composables/useNavigation'
import Sidebar from './components/Sidebar.vue'

useNavigationProvider()

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div id="app">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.main-content {
  min-height: 100vh;
  background: var(--ccm-color-background);
  transition: margin-left 0.3s ease;
}

/* Desktop: Add margin for sidebar */
@media (min-width: 769px) {
  .main-content {
    margin-left: var(--sidebar-width);
  }
}

/* Mobile: No margin, full width */
@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>
