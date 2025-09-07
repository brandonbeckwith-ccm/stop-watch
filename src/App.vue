<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { createNavigation } from './composables/useNavigation'

createNavigation()
</script>

<template>
  <NavBar />
  <main>
    <router-view />
  </main>
</template>