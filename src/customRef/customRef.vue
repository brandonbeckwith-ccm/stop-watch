<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebouncedValidatedRef } from './debouncedWithValidationCustomRef'

const bigList = ref(['apple', 'banana', 'grapes', 'orange', 'mango'])

const search = useDebouncedValidatedRef('', 2000, (val) => val.length >= 3)

const filteredList = computed(() =>
  search.value
    ? bigList.value.filter(item =>
        item.toLowerCase().includes(search.value.toLowerCase())
      )
    : bigList.value
)
</script>

<template>
  <div class="p-4">
    <input
      v-model="search"
      placeholder="Type at least 3 characters..."
      class="border rounded p-2 w-64"
    />

    <ul class="mt-4 list-disc list-inside">
      <li v-for="item in filteredList" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>
