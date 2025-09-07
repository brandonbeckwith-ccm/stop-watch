<script setup lang="ts">
import { useNavigation } from '../composables/useNavigation'
import { CButton } from '@ccm-engineering/ui-components'
import { ref } from 'vue'

const menuOpen = ref(false)
const closeMenu = () => (menuOpen.value = false)

const { title, icon, status } = useNavigation()
</script>

<template>
  <header class="navbar">
    <div class="nav-info">
      <span v-if="icon" class="nav-icon" v-html="icon"></span>
      <span class="nav-title">{{ title }}</span>
      <span v-if="status" class="nav-status">{{ status }}</span>
    </div>
    <div class="menu-btn">
      <CButton @clicked="menuOpen = !menuOpen" label="☰" radius="xs" />
    </div>
    <nav :class="['menu', { open: menuOpen }]">
      <RouterLink to="/clock" class="menu-link" @click="closeMenu">Clock</RouterLink>
      <RouterLink to="/custom-ref-demo" class="menu-link" @click="closeMenu">CustomRef Demo</RouterLink>
      <RouterLink to="/calculator" class="menu-link" @click="closeMenu">Calculator</RouterLink>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  margin: 0;
  font-size: 1.8rem;
  
  a {
    text-decoration: none;
    color: #2c3e50;
    font-weight: bold;
    transition: color 0.3s ease;
    
    &:hover {
      color: grey;
    }
  }
}

.menu-btn {
  display: none;
  
  :deep(button) {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    font-size: 18px;
    padding: 8px 12px;
    
    &:hover {
      background: #e9ecef;
    }
  }
}

.menu {
  display: flex;
  gap: 8px;
}

.menu-link {
  text-decoration: none;
  color: #495057;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
  
  &.router-link-active {
    background: grey;
    color: white;
  }
}

.nav-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.nav-title {
  font-size: 1.3rem;
  font-weight: bold;
}
.nav-icon {
  font-size: 1.5rem;
}
.nav-status {
  font-size: 1rem;
  color: #1976d2;
  margin-left: 8px;
}

// Mobile responsive
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    padding: 12px 16px;
    position: relative;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .menu-btn {
    display: block;
  }
  
  .menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background: #fff;
    border-top: 1px solid #ddd;
    margin-top: 12px;
    padding: 12px 0;
    gap: 4px;
    
    &.open {
      display: flex;
    }
  }
  
  .menu-link {
    padding: 12px 16px;
    border-radius: 0;
    border-bottom: 1px solid #f1f3f4;
    
    &:last-child {
      border-bottom: none;
    }
  }
}

// Tablet
@media (max-width: 1024px) and (min-width: 769px) {
  // .navbar {
  //   padding: 14px 18px;
  // }
  
  .menu {
    gap: 6px;
  }
  
  .menu-link {
    padding: 8px 12px;
    font-size: 0.9rem;
  }
}

// Large screens
@media (min-width: 1200px) {
  // .navbar {
  //   max-width: 1200px;
  //   margin: 0 auto;
  //   padding: 18px 24px;
  // }
  
  .menu {
    gap: 12px;
  }
  
  .menu-link {
    padding: 12px 20px;
  }
}
</style>