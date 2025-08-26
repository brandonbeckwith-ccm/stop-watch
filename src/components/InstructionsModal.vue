<script lang="ts" setup>
import { CModal } from "@ccm-engineering/ui-components";
import { ref } from "vue";

const isOpen = ref(true)
</script>

<template>
  <CModal
    closeOnEscape
    :hideHeaderClose="true"
    headerIcon="fa-fire"
    horizontalAlignment="center"
    v-model="isOpen"
    size="small"
    theme="mt-black"
    verticalAlignment="center"
  >
    <template #title>Instructions</template>
    <template #body>
        <span>Prefer keyboard for better user experience</span>
        <p>Press 'Enter' to calculate</p>
        <p class="instruction-li">Press 'ESC' to clear terminal</p>
    </template>
    <template #footer>
        <button class="btn" @click="isOpen = false">Got it</button>
    </template>
  </CModal>
</template>

<style scoped>
.btn {
  align-items: center;
  height: 40px;
  width: 1117px;
  border: 1px solid #dfdfdf;
  border-radius: 11px;
  color: #165c7d;
  background-color: #e8eff2;
  cursor: pointer;
  display: flex;
  right: 0px;
  font-size: 1rem;
  font-weight: 700;
  line-height: 33.4929px;
  justify-content: center;
}
.instruction-li{
    margin-bottom: 0px;
}
</style>
