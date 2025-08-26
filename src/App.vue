<script setup lang="ts">
import { CButton } from "@ccm-engineering/ui-components";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();

const goTo = (path: string) => {
  router.push(path);
};

const route = useRoute()
const isClockPage = computed(() => route.path.includes("clock"))
const isCustomRefPage = computed(() => route.path.includes("custom-ref"))
const isCalcPage = computed(() => route.path.includes("calculator"))
</script>

<template>
  <div class="nav-wrapper">
    <CButton
      label="Clock"
      :type="isClockPage?'fill':'border'"
      radius="xxs"
      @click="goTo('/clock')"
    />

    <CButton
      class="test"
      label="Custom Ref"
      :type="isCustomRefPage?'fill':'border'"
      radius="xxs"
      @click="goTo('/custom-ref')"
    />
    
    <CButton
      label="Calculator"
      :type="isCalcPage?'fill':'border'"
      radius="xxs"
      @click="goTo('/calculator')"
    />


    <div>
      <router-view />
    </div>
  </div>
</template>
<style lang="scss">
.test{
  margin: 3px;
}
</style>