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
    // Browser local time
    time.value = dayjs().format("HH:mm:ss");
  } else {
    // Specific timezone
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
.time
{
    padding: 0;
    margin: 0;
}
.label
{
    padding: 2px;
    margin-top: 20px;
    max-width: 100px;
}
.clock {
  border: 2px solid #ccc;
  padding: 10px;
  margin: 5px;
  border-radius: 200px;
  text-align: center;
  min-width: 120px;
  height: 120px;
  width: fit-content;
  max-width: 150px;
position: relative; 
}
.delete-icon:hover {
  cursor: pointer;
}
.delete-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
}

</style>
