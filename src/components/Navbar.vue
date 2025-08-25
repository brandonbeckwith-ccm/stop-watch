<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const route = useRoute();
const isActive = (path: string) => route.path === path;
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="menu" :class="{ open: isMenuOpen }">
        <RouterLink to="/" :class="{ active: isActive('/') }" class="nav-button"
          >Home</RouterLink
        >
        <RouterLink
          to="/stopwatch"
          :class="{ active: isActive('/stopwatch') }"
          class="nav-button"
          >Stopwatch</RouterLink
        >
        <RouterLink
          to="/worldclock"
          :class="{ active: isActive('/worldclock') }"
          class="nav-button"
          >WorldClock</RouterLink
        >
        <RouterLink
          to="/about"
          :class="{ active: isActive('/about') }"
          class="nav-button"
          >About</RouterLink
        >
      </div>

      <div class="hamburger" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #165c7d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
}

.menu {
  display: flex;
  gap: 1.5rem;
  margin-left: 2rem;
  font-size: large;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.nav-button {
  background-color: #0078a0;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: white;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  line-height: 1.25rem;
}

.nav-button:hover {
  background-color: #00aced;
}

.nav-button.active {
  background-color: #005f80;
}

.nav-button.active::after {
  content: none;
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    background-color: #111;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    padding: 1rem 2rem;
    display: none;
  }

  .menu.open {
    display: flex;
  }

  .hamburger {
    display: flex;
  }
}
</style>
