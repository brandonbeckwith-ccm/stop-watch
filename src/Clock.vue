<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CIcon } from "@ccm-engineering/ui-components";
 
dayjs.extend(utc);
dayjs.extend(timezone);
 
const props = defineProps({
  id: { type: Number, required: true },
  tz: { type: String, required: true },
  label: { type: String, required: true },
});
 
const time = ref("");
 
let interval = 0;
 
const updateTime = () => {
  if (props.tz === "local") {
    time.value = dayjs().format("HH:mm:ss");
  } else {
    time.value = dayjs().tz(props.tz).format("HH:mm:ss");
  }
};
 
onMounted(() => {
  updateTime();
  interval = setInterval(updateTime, 1000);
});
 
onUnmounted(() => {
  clearInterval(interval);
});
const emit = defineEmits<{
  (e: "remove", id: number): void;
}>();
</script>
 
<template>
  <div class="clock">
    <div class="delete-icon">
      <CIcon
        icon="fal fa-close"
        type="border"
        theme="danger"
        @click="emit('remove', id)"
      ></CIcon>
    </div>
    <h4 class="label">{{ label }}</h4>
    <p class="time">{{ time }}</p>
  </div>
</template>
 
<style scoped>
 .clock {
  border: 1px solid #ccc;
  padding: 5px;
  margin: 3px;
  min-width: 120px;
}
</style>