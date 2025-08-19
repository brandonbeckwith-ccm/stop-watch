<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
</script>

<template>
  <div class="home-page">
    <div class="content-box">
      <h1 class="title">Go To</h1>
      <div class="button-group">
        <router-link :to="{ name: 'Stopwatch' }">
          <CButton
            label="Stopwatch"
            size="size-48"
            theme="primary"
            type="border"
            icon-class="fas fa-stopwatch"
          />
        </router-link>
        <router-link :to="{ name: 'World Clock' }">
          <CButton
            label="World Clock"
            size="size-48"
            theme="success"
            type="border"
            icon-class="fas fa-globe"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/home.scss";
</style>
