<script setup lang="ts">
import Sidebar from './components/Sidebar.vue';


</script>
<template>
   <div id="app" class="ccm-new">

     <!-- <nav class="sidebar">
       <RouterLink to="/">Home</RouterLink>
       <RouterLink to="/about">About Us</RouterLink>
       <RouterLink to="/stopwatch">Stopwatch</RouterLink>
       <RouterLink to="/worldclock">World Clock</RouterLink>
      </nav> -->
      <Sidebar/>
      <RouterView />
    </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

/* .sidebar {
  width: 200px;
  background: #f3e8ec;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.sidebar a {
  color: black;
  text-decoration: none;
  padding: 0.7rem 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  transition: background 0.3s;
}

.sidebar a:hover {
  background: #ecdbe0;
}

.sidebar a.router-link-exact-active {
  background: #e5cdd5;
  font-weight: bold;
  border-left: 4px solid #c999a8;
} */

.main {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
}
/* 
@media (max-width: 600px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }

  .sidebar a {
    margin-bottom: 0;
  }
} */
</style>
