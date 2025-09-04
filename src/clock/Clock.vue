<script setup lang="ts">
import { CButton } from '@ccm-engineering/ui-components';
import router from '../router';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNavigation } from '../composables/useNavigation';
const { title, icon, status } = useNavigation();

const goTo = (path: string) => {
  router.push(path);
};
const route = useRoute()
const isStopWatch= computed(() => route.path.includes("stopwatch"))
const isWorldClock = computed(() => route.path.includes("world"))
onMounted(() => {
  title.value = "Stopwatch";
  icon.value = "⏱️";
  status.value = "";
});

</script>

<template>
  <div class="clock-layout">
    <div class="sub-btn">
     <CButton
      label="Stopwatch"
      :type="isStopWatch?'fill':'border'"
      radius="xxs"
      @click="goTo('/clock/stopwatch')"
    />
    <CButton
      label="World Clock"
      :type="isWorldClock?'fill':'border'"
      radius="xxs"
      @click="goTo('/clock/world')"
    />
    </div>
    <router-view />
  </div>
</template>

<style>
.clock-layout{
  margin-top: 30px;
}
.sub-btn{
  width: 100%;
  text-align: left;
  padding: 0 20px;
  display: flex;
  gap:10px;
}
</style>