<script lang="ts" setup>
import { CModal, CIcon } from "@ccm-engineering/ui-components";
import CityList from "./CityList.vue";
import { ref } from "vue";

const isOpen = ref(false)
</script>

<template>
  <button class="btn-6" @click="isOpen = !isOpen">Add New Cities</button>
  <CModal
    closeOnEscape
    :hideHeaderClose="false"
    headerIcon="fa-fire"
    horizontalAlignment="center"
    v-model="isOpen"
    size="full-screen"
    theme="mt-black"
    verticalAlignment="center"
  >
    <template #title>Cities around the world</template>
    <template #body>
      <CityList />
    </template>
    <template #close>
      <CIcon
        :border="false"
        icon="fa-regular fa-square-xmark"
        :noSpacing="false"
        hover
        size="large-64"
        color="ocean-blue"
        @click="isOpen = !isOpen"
      />
    </template>
  </CModal>
</template>

<style scoped>
.btn-6 {
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
</style>
