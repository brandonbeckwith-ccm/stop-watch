<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isSidebarOpen = ref(false)

const navigationItems = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Stopwatch', path: '/stopwatch', icon: '⏱️' },
  { name: 'World Clock', path: '/world-clock', icon: '🌍' },
]

const currentRoute = computed(() => route.path)

const navigateTo = (path: string) => {
  router.push(path)
  if (window.innerWidth <= 768) {
    isSidebarOpen.value = false
  }
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  if (window.innerWidth <= 768) {
    isSidebarOpen.value = false
  }
}
</script>

<template>
  <div class="sidebar-container">
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside class="sidebar" :class="{ open: isSidebarOpen }">
      <!-- Sidebar Header -->
      <div class="sidebar-header">
        <div class="sidebar-brand" @click="navigateTo('/')">
          <span class="brand-icon">⏱️</span>
          <span class="brand-text">TimeApp</span>
        </div>
        <button class="close-button" @click="toggleSidebar">
          <span>×</span>
        </button>
      </div>

      <!-- Navigation Items -->
      <nav class="sidebar-nav">
        <div 
          v-for="item in navigationItems" 
          :key="item.path"
          class="nav-item"
          :class="{ active: currentRoute === item.path }"
          @click="navigateTo(item.path)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-text">{{ item.name }}</span>
        </div>
      </nav>

      <!-- Sidebar Footer -->
      <div class="sidebar-footer">
        <p class="footer-text">Time Management App</p>
        <p class="footer-version">v1.0.0</p>
      </div>
    </aside>

    <!-- Toggle Button (mobile) -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <span class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.sidebar-container {
  position: relative;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background: var(--ccm-color-surface);
  border-right: 1px solid var(--ccm-color-border);
  display: flex;
  flex-direction: column;
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--ccm-color-border);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.sidebar-brand:hover {
  opacity: 0.8;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ccm-color-primary);
}

.close-button {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--ccm-color-text-secondary);
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--ccm-color-surface-hover);
  color: var(--ccm-color-text-primary);
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--ccm-color-text-secondary);
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: var(--ccm-color-surface-hover);
  color: var(--ccm-color-text-primary);
  border-left-color: var(--ccm-color-primary);
}

.nav-item.active {
  background: var(--ccm-color-primary);
  color: white;
  border-left-color: white;
}

.nav-icon {
  font-size: 1.3rem;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-weight: 500;
  font-size: 1rem;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--ccm-color-border);
  text-align: center;
}

.footer-text {
  margin: 0;
  color: var(--ccm-color-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.footer-version {
  margin: 0;
  color: var(--ccm-color-text-secondary);
  font-size: 0.8rem;
  opacity: 0.7;
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 997;
  background: var(--ccm-color-primary);
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hamburger {
  width: 20px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
  transform-origin: center;
}

/* Desktop Styles */
@media (min-width: 769px) {
  .sidebar {
    transform: translateX(0);
    position: fixed;
  }
  
  .sidebar-toggle {
    display: none;
  }
  
  .close-button {
    display: none;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .sidebar {
    width: var(--sidebar-width);
  }
  
  .close-button {
    display: block;
  }
  
  .sidebar-toggle {
    display: block;
  }
  
  .sidebar-brand {
    flex: 1;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: var(--sidebar-width);
  }
  
  .sidebar-header {
    padding: 1rem;
  }
  
  .nav-item {
    padding: 0.75rem 1rem;
  }
  
  .sidebar-footer {
    padding: 1rem;
  }
}
</style> 