<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { useRouter } from "vue-router";
import { useNavigation } from "../composables/useNavigation";

const router = useRouter();
const { setTitle } = useNavigation();

const go = (name: string) => {
  setTitle(name);
  router.push({ name });
};
</script>

<template>
  <div class="home-page">
    <div class="content-box">
      <h1 class="title">Go To</h1>
      <p class="subtitle">Quick actions — jump to a tool</p>
      <div class="button-group">
        <CButton
          label="Stopwatch"
          size="size-48"
          theme="primary"
          type="border"
          icon-class="fas fa-stopwatch"
          @clicked="go('Stopwatch')"
        />
        <CButton
          label="World Clock"
          size="size-48"
          theme="success"
          type="border"
          icon-class="fas fa-globe"
          @clicked="go('World Clock')"
        />
        <CButton
          label="Calculator"
          size="size-48"
          theme="black"
          type="border"
          icon-class="fas fa-calculator"
          @clicked="go('Calculator')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/home.scss";
</style>
