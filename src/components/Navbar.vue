<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const isClockOpen = ref(false);
const toggleClock = () => {
  isClockOpen.value = !isClockOpen.value;
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
        <div class="dropdown">
          <button class="nav-button dropdown-toggle" @click="toggleClock">
            Clock
            <span class="caret" :class="{ rotate: isClockOpen }">▾</span>
          </button>
          <div class="submenu" :class="{ show: isClockOpen }">
            <RouterLink
              to="/stopwatch"
              :class="{ active: isActive('/stopwatch') }"
              class="sublink"
              @click="isClockOpen = false"
              >Stopwatch</RouterLink
            >
            <RouterLink
              to="/worldclock"
              :class="{ active: isActive('/worldclock') }"
              class="sublink"
              @click="isClockOpen = false"
              >World Clock</RouterLink
            >
          </div>
        </div>

        <RouterLink
          to="/calculator"
          :class="{ active: isActive('/calculator') }"
          class="nav-button"
          >Calculator</RouterLink
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

.dropdown-toggle.nav-button {
  /* font: inherit; */
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

.dropdown {
  position: relative;
}

.caret {
  font-size: 0.85em;
  transition: transform 0.2s ease;
}

.caret.rotate {
  transform: rotate(180deg);
}

.submenu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background-color: #0e2f3d;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 8px;
  display: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.submenu.show {
  display: flex;
  flex-direction: column;
}

.sublink {
  background-color: transparent;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: white;
  text-decoration: none;
}

.sublink:hover {
  background-color: rgba(255, 255, 255, 0.08);
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
    background-color: #165c7d;
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

  .dropdown {
    width: 100%;
  }

  .dropdown-toggle.nav-button {
    width: 100%;
    justify-content: center;
  }

  .submenu {
    position: static;
    border: none;
    background-color: transparent;
    box-shadow: none;
    padding: 4px 0 0 12px;
    width: 100%;
  }

  .sublink {
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
    margin: 4px 0;
    width: 100%;
    text-align: center;
  }

  .sublink:hover {
    background-color: #00aced;
  }

  .sublink.active {
    background-color: #005f80;
  }
}
</style>
