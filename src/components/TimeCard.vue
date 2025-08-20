<template>
  <div class="time-card">
    <div class="card-content">
      <div class="city-name">{{ name }}</div>
      <div class="city-time">{{ time }}</div>
      <div class="city-day">{{ day }}</div>
      <div class="city-zone">{{ zone }}</div>
      <button v-if="showRemove" class="remove-btn" @click="$emit('remove')">
        Remove
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>


defineProps({
  name: String,
  time: String,
  day: String,
  zone: String,
  showRemove: Boolean,
});

defineEmits(["remove"]);
</script>

<style scoped>
.time-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.1);
  padding: 1.5em 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 120px;
  position: relative;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.city-name {
  font-size: 1.2em;
  font-weight: 600;
  color: #2b5876;
  margin-bottom: 0.5em;
}
.city-time {
  font-size: 2em;
  font-weight: 700;
  color: #4e4376;
  margin-bottom: 0.3em;
}

.city-day {
  font-size: 1.1em;
  font-weight: 600;
  color: #5a4e7a;
  margin-bottom: 0.4em;
  letter-spacing: 0.05em;
  text-transform: capitalize;
}

.city-zone {
  font-size: 0.95em;
  color: #888;
  margin-bottom: 0.7em;
}
.remove-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.4em 1.2em;
  font-size: 0.95em;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.remove-btn:hover {
  background: #c0392b;
}
</style>
