<script setup lang="ts">
import { useNavBar } from '../composables/navBar';

const {setTitle,setIcon,setStatus}=useNavBar()
setTitle('Home Page')
setIcon('fa-solid fa-house')
setStatus('')
</script>
<template>
  <div>
    <h2>Home Page</h2>
  </div>
</template>
