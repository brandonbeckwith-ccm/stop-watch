<script lang="ts" setup>
import { CIcon } from "@ccm-engineering/ui-components";
import { useNavBar } from "../composables/navBar";

const { title, icon, status } = useNavBar();
</script>
<template>
  <div class="nav-bar">
    <div class="nav-body">
      <CIcon
        :icon="icon"
        color="primary"
        fill
        :hover="false"
        :noSpacing="false"
        size="medium-36"
      ></CIcon>
      <div class="title">{{ title }}</div>
      <div class="status">{{ status }}</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.nav-bar {
  text-align: center;
  border: 2px solid black;
  width: 500px;
  margin: 40px auto;
  border-radius: 10px;
  padding: 15px;
  background: #f5f5f5;
  align-items: center;
  padding: 15px;
}
.nav-body {
  display: flex;
}
.title ,.status
{
    margin-left: 10px;
    margin-top: 5px;
    font-size: 24px;
}
.status{
    color: #919090;
}
</style>
