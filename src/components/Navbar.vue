<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useNavigation } from "../composables/useNavigation";

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

const { title, icon, status } = useNavigation();
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="nav-info" v-if="title || icon || status">
        <div class="page-info">
          <span v-if="icon" class="page-icon">{{ icon }}</span>
          <span v-if="title" class="page-title">{{ title }}</span>
        </div>
        <div v-if="status" class="page-status">{{ status }}</div>
      </div>

      <div class="menu" :class="{ open: isMenuOpen }">
        <RouterLink to="/" :class="{ active: isActive('/') }" class="nav-button">
          Home
        </RouterLink>
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
              >
              Stopwatch
            </RouterLink>
            <RouterLink
              to="/worldclock"
              :class="{ active: isActive('/worldclock') }"
              class="sublink"
              @click="isClockOpen = false"
              >
              World Clock
            </RouterLink>
          </div>
        </div>

        <RouterLink
          to="/calculator"
          :class="{ active: isActive('/calculator') }"
          class="nav-button"
          >
          Calculator
        </RouterLink>
        <RouterLink
          to="/about"
          :class="{ active: isActive('/about') }"
          class="nav-button"
          >
          About
        </RouterLink>
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
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.88), rgba(42, 82, 152, 0.88), rgba(102, 126, 234, 0.88));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.25);
  box-shadow: 0 10px 30px rgba(2, 12, 27, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.25rem;
  color: white;
}

.nav-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  min-width: 200px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(2, 12, 27, 0.18);
}

.page-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.page-icon {
  font-size: 1.1rem;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.25));
}

.page-title {
  font-size: 1.05rem;
  white-space: nowrap;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-status {
  font-size: 0.9rem;
  opacity: 0.92;
  font-style: italic;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.page-status::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00d4ff;
  box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.18);
}

.nav-info:hover {
  border-color: rgba(0, 212, 255, 0.38);
  box-shadow: 0 10px 24px rgba(2, 12, 27, 0.24);
}

.menu {
  display: flex;
  gap: 0.75rem;
  margin-left: 1rem;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}

.nav-button {
  background: rgba(30, 60, 114, 0.25);
  border: 1px solid rgba(0, 212, 255, 0.28);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  line-height: 1.25rem;
}

.dropdown-toggle.nav-button {
  line-height: 1.25rem;
  padding: 0.5rem 0.9rem;
}

.dropdown-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.nav-button:hover {
  background: rgba(0, 212, 255, 0.18);
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 6px 16px rgba(0, 212, 255, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.nav-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.45);
}

.nav-button.active {
  background: linear-gradient(135deg, rgba(0, 153, 204, 0.35), rgba(0, 212, 255, 0.3));
  border-color: rgba(0, 212, 255, 0.6);
  box-shadow: 0 8px 18px rgba(0, 212, 255, 0.28) inset, 0 4px 14px rgba(0, 212, 255, 0.18);
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
  background: linear-gradient(135deg, rgba(14, 47, 61, 0.9), rgba(30, 60, 114, 0.9));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 8px;
  display: none;
  box-shadow: 0 12px 30px rgba(2, 12, 27, 0.35);
}

.submenu.show {
  display: flex;
  flex-direction: column;
}

.sublink {
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.sublink:hover {
  background: rgba(0, 212, 255, 0.12);
  border-color: rgba(0, 212, 255, 0.28);
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem 1rem;
  }

  .nav-info {
    order: 1;
    margin-bottom: 0.5rem;
    min-width: auto;
    text-align: center;
    align-items: center;
  }

  .page-info {
    justify-content: center;
  }

  .page-title {
    max-width: 70vw;
  }

  .menu {
    order: 2;
    flex-direction: column;
    background: linear-gradient(135deg, rgba(10, 25, 47, 0.94), rgba(30, 60, 114, 0.94));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    padding: 1rem 1rem 1.25rem;
    display: none;
    z-index: 999;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
  }

  .menu.open {
    display: flex;
  }

  .hamburger {
    order: 3;
    display: flex;
    align-self: flex-end;
    margin-top: -2rem;
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
    background: transparent;
    box-shadow: none;
    padding: 4px 0 0 12px;
    width: 100%;
  }

  .sublink {
    background: rgba(0, 153, 204, 0.18);
    border: 1px solid rgba(0, 212, 255, 0.32);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    color: white;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    line-height: 1.25rem;
    margin: 4px 0;
    width: 100%;
    text-align: center;
  }

  .sublink:hover {
    background: rgba(0, 212, 255, 0.26);
    border-color: rgba(0, 212, 255, 0.48);
  }
}
</style>
