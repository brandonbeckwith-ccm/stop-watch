<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <!-- Header Navigation -->
    <header class="app-header">
      <nav class="nav">
        <RouterLink to="/stopwatch" class="nav-link" active-class="active"
          >Stopwatch</RouterLink
        >
        <RouterLink to="/laps" class="nav-link" active-class="active"
          >Laps</RouterLink
        >
        <RouterLink to="/worldClocks" class="nav-link" active-class="active"
          >World Clocks</RouterLink
        >
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 700px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}
.app-header {
  background: #342c50;
  padding: 10px;
}
.nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.nav-link {
  color: white;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.3s;
  text-decoration: none;
}
.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}
.active {
  background: #3498db;
}
</style>
