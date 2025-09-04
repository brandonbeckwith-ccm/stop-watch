<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDebouncedValidatedRef } from './debouncedWithValidationCustomRef'
import { useNavigation } from "../composables/useNavigation";

const bigList = ref(['apple', 'banana', 'grapes', 'orange', 'mango'])

const search = useDebouncedValidatedRef('', 2000, (val) => val.length >= 3)

const filteredList = computed(() =>
  search.value
    ? bigList.value.filter(item =>
        item.toLowerCase().includes(search.value.toLowerCase())
      )
    : bigList.value
)

const { title, icon, status } = useNavigation();

onMounted(() => {
  title.value = "Custom Ref";
  icon.value = "📐";
  status.value = '';
});
</script>

<template>
  <div class="main-container">
    <div class="card">
      <h2 class="mb-4 text-xl font-semibold">Custom Ref Search</h2>

      <input
        v-model="search"
        placeholder="Type at least 3 characters..."
        class="search-input"
      />

        <div v-for="item in filteredList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: white;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 18px;
  padding: 36px 32px 32px 32px;
  min-width: 320px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.search-input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  width: 100%;
  max-width: 280px;
}

</style>
