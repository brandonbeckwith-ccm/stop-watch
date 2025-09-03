<script setup lang="ts">
import NavigationBar from './components/NavigationBar.vue';
import Sidebar from './components/Sidebar.vue';

import { provideNavigation } from './composables/useNavigation';
const navigation=provideNavigation()

</script>
<template>
   <div id="app" class="ccm-new">
    <NavigationBar/>
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
