<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const expanded = ref(new Set(['clock']))

const nav = [
  { name: 'Home', path: '/', icon: '🏠' },
  {
    name: 'Clock',
    icon: '⏰',
    items: [
      { name: 'Stopwatch', path: '/stopwatch', icon: '⏱️' },
      { name: 'World Clock', path: '/world-clock', icon: '🌍' },
    ]
  },
  { name: 'Calculator', path: '/calculator', icon: '🧮' },
]

const isActive = (path: string) => route.path === path
const isExpanded = (name: string) => expanded.value.has(name)
const toggle = (name: string) => {
  expanded.value.has(name) ? expanded.value.delete(name) : expanded.value.add(name)
}
</script>

<template>
  <aside class="sidebar">
    <div class="header" @click="router.push('/')">
      <span>⏱️</span>
      <span>TimeApp</span>
    </div>

    <nav class="nav">
      <div v-for="item in nav" :key="item.name">
        <!-- Regular item -->
        <div 
          v-if="!item.items"
          class="item"
          :class="{ active: isActive(item.path) }"
          @click="router.push(item.path)"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.name }}</span>
        </div>

        <!-- Category -->
        <div v-else class="category">
          <div 
            class="header"
            :class="{ active: item.items.some(i => isActive(i.path)) }"
            @click="toggle(item.name)"
          >
            <span>{{ item.icon }}</span>
            <span>{{ item.name }}</span>
            <span :class="{ expanded: isExpanded(item.name) }">▼</span>
          </div>
          
          <div v-if="isExpanded(item.name)" class="items">
            <div 
              v-for="sub in item.items"
              :key="sub.path"
              class="item sub"
              :class="{ active: isActive(sub.path) }"
              @click="router.push(sub.path)"
            >
              <span>{{ sub.icon }}</span>
              <span>{{ sub.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
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
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--ccm-color-border);
  cursor: pointer;
}

.header span:last-child {
  font-weight: 700;
  color: var(--ccm-color-primary);
}

.nav {
  flex: 1;
  padding: 0.5rem 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  color: var(--ccm-color-text-secondary);
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.item:hover {
  background: var(--ccm-color-surface-hover);
  color: var(--ccm-color-text-primary);
  border-left-color: var(--ccm-color-primary);
}

.item.active {
  background: var(--ccm-color-primary);
  color: white;
  border-left-color: white;
}

.category .header {
  border-bottom: none;
  border-left: 3px solid transparent;
}

.category .header.active {
  background: rgba(var(--ccm-color-primary-rgb), 0.1);
  color: var(--ccm-color-primary);
  border-left-color: var(--ccm-color-primary);
}

.category .header span:last-child {
  margin-left: auto;
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.category .header span:last-child.expanded {
  transform: rotate(180deg);
}

.items {
  background: var(--ccm-color-surface-hover);
  border-left: 3px solid var(--ccm-color-primary);
  margin-left: 0.75rem;
  margin-right: 0.5rem;
  border-radius: 0 8px 8px 0;
}

.sub {
  padding: 0.6rem 1.25rem 0.6rem 2rem;
  border-left: none;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .nav {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem;
  }
  
  .item, .category .header {
    padding: 0.5rem 1rem;
    white-space: nowrap;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .items {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--ccm-color-surface);
    border: 1px solid var(--ccm-color-border);
    margin: 0;
    z-index: 1000;
  }
}
</style> 