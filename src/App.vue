<script setup lang="ts">
import { CTag } from "@ccm-engineering/ui-components";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <!-- Header Navigation -->
    <header class="app-header">
      <nav class="nav">
        <CTag label="Stopwatch" theme="primary">
          <RouterLink to="/stopwatch" class="nav-link" active-class="active"
            >Stopwatch</RouterLink
          >
        </CTag>
        <CTag label="Stopwatch" theme="primary">
          <RouterLink to="/laps" class="nav-link" active-class="active"
            >Laps</RouterLink
          ></CTag
        >
        <CTag label="Stopwatch" theme="primary">
          <RouterLink to="/worldClocks" class="nav-link" active-class="active"
            >World Clocks</RouterLink
          ></CTag
        >
        <CTag label="Stopwatch" theme="primary">
          <RouterLink to="/calculator" class="nav-link" active-class="active"
            >Calculator</RouterLink
          ></CTag
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
  background: rgba(76, 0, 255, 0.2);
}
.active {
  background: #3498db;
}
</style>
