<script setup lang="ts">
import {
  CButton,
  CIcon,
  CInput,
  CSearchInput,
} from "@ccm-engineering/ui-components";
import { useWorldClock } from "../composables/useWorldClock";
import { onMounted } from "vue";
import { useNavigation } from "../composables/useNavigation";

const {
  filteredTimezones,
  searchQuery,
  newTimezone,
  errorMessage,
  getTime,
  getCityName,
  isRemovable,
  addTimezone,
  removeTimezone,
} = useWorldClock();

const { setTitle } = useNavigation();

onMounted(() => {
  setTitle("World Clock");
});
</script>

<template>
  <div class="world-clocks">
    <h2>World Clocks</h2>

    <div class="search-bar">
      <CSearchInput
        v-model="searchQuery"
        placeholder="Search timezone..."
        theme="mt-black"
      />
    </div>

    <table class="clocks-table">
      <thead>
        <tr>
          <th>City / Timezone</th>
          <th>Current Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tz, index) in filteredTimezones" :key="tz">
          <td>{{ getCityName(tz) }}</td>
          <td>{{ getTime(tz) }}</td>
          <td>
            <CIcon
              v-if="isRemovable(tz)"
              icon="fal fa-trash"
              @click="removeTimezone(index)"
              hover
              size="medium-32"
              color="error"
              border
              radius="xxs"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div class="add-clock">
      <CInput
        v-model="newTimezone"
        placeholder="Enter IANA timezone (e.g., Asia/Tokyo)"
        input-theme="mt-black"
        radius="xxs"
      />
      <CButton
        label="Add Clock"
        @click="addTimezone"
        theme="black"
        radius="xxs"
      />
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped lang="scss">
@use "../styles/worldclock.scss";
</style>
