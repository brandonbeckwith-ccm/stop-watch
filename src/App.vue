<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';


</script>
<template>
   <div id="app" class="ccm-new">
      <Sidebar/>
      <RouterView />
    </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
}
</style>
