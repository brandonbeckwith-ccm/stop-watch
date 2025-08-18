<script setup lang="ts">
import { CButton } from '@ccm-engineering/ui-components';
import { ref } from 'vue'

const menuOpen = ref(false)
const closeMenu = () => (menuOpen.value = false)
</script>
<template>
    <header class="nav-bar">
        <h1 class="logo">
            <RouterLink to="/">My App</RouterLink>
        </h1>

        <div class="menu-btn">
            <CButton @clicked="menuOpen = !menuOpen" label="☰">
            </CButton>
        </div>

        <nav :class="['menu', { open: menuOpen }]">
            <RouterLink to="/" class="menu-link" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/laps" class="menu-link" @click="closeMenu">Laps</RouterLink>
        </nav>
    </header>
</template>



<style scoped>
.nav-bar {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background: #fff;
    justify-items: center;
    gap: 50px;
    border-bottom: 1px solid #ddd;
    max-width: 600px;
    width:100%;
    position: relative; 
}

.logo a {
    text-decoration: none;
    font-weight: bold;
    color: #333;
}

.menu-btn {
    display: none;
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
}

.menu {
    display: flex;
    gap: 15px;
}

.menu-link {
    text-decoration: none;
    color: #333;
    padding: 6px 8px;
    border-radius: 4px;
}

.menu-link.router-link-active {
    background: #eee;
}

/* Mobile */
@media (max-width: 768px) {
    .menu-btn {
        display: block;
    }

    .menu {
        display: none;
        flex-direction: column;
        background: #fff;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        border-top: 1px solid #ddd;
        padding: 10px;
        z-index: 10;
    }

    .menu.open {
        display: flex;
    }
}
</style>
