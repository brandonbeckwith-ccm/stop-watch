<script setup lang="ts">
import { CCMDataTable } from "@ccm-engineering/ccm-data-table";
import { useWorldClock } from "../composables/useWorldclock";
import Column from "primevue/column";
import {
  CButton,
  CInput,
  CModal,
  CMultipleSelect,
} from "@ccm-engineering/ui-components";
import { ref } from "vue";

const { clocks, addClock, removeClock, times } = useWorldClock();
const isModalOpen = ref(false);
const formInputTimeZone = ref("");
const formInputlabel = ref("");

const handleAddClock = (selectedLabel: string, customLabel: string) => {
  if (!selectedLabel) return;

  const timezone = timezoneMap[selectedLabel];
  if (!timezone) return;

  addClock(timezone, customLabel || selectedLabel);
  formInputTimeZone.value = "";
  formInputlabel.value = "";
  isModalOpen.value = false;
};

const timezoneMap: Record<string, string> = {
  "Local Time": Intl.DateTimeFormat().resolvedOptions().timeZone,
  "New York (EST)": "America/New_York",
  "Chicago (CST)": "America/Chicago",
  "Los Angeles (PST)": "America/Los_Angeles",
  "São Paulo (BRT)": "America/Sao_Paulo",
  London: "Europe/London",
  Paris: "Europe/Paris",
  Berlin: "Europe/Berlin",
  "Kolkata (IST)": "Asia/Kolkata",
  Tokyo: "Asia/Tokyo",
  Dubai: "Asia/Dubai",
  Shanghai: "Asia/Shanghai",
  Singapore: "Asia/Singapore",
  Sydney: "Australia/Sydney",
  Auckland: "Pacific/Auckland",
  Johannesburg: "Africa/Johannesburg",
  Nairobi: "Africa/Nairobi",
};

const timezoneOptions = Object.keys(timezoneMap);
</script>
<template>
  <div class="page-header">
    <h1>World Clock</h1>
    <div class="btn">
      <CButton label="Add Clock" @clicked="isModalOpen = true" size="size-32" />
    </div>
  </div>
  <div class="page-body">
    <CCMDataTable :value="clocks">
      <Column field="label" header="TimeZone" />
      <Column header="Current Time">
        <template #body="{ data }">
          {{ times[data.id] }}
        </template>
      </Column>
      <Column header="Action">
        <template #body="{ data }">
          <CButton label="Remove Clock" @clicked="removeClock(data.id)" />
        </template>
      </Column>
    </CCMDataTable>
  </div>

  <CModal
    closeOnEscape
    :hideHeaderClose="false"
    horizontalAlignment="center"
    v-model="isModalOpen"
    size="large"
    verticalAlignment="center"
    header-icon=""
  >
    <template #body>
      <label>TimeZone</label>

      <CMultipleSelect
        v-model="formInputTimeZone"
        icon="fal fa-search"
        :isLoading="false"
        label="name"
        mode="single"
        :options="timezoneOptions"
        size="size-40"
      />
      <label>Label</label>
      {{ console.log(clocks) }}
      <CInput
        radius="xs"
        required
        size="size-40"
        placeholder=""
        v-model="formInputlabel"
      />
      <CButton
        label="Add Clock"
        @clicked="handleAddClock(formInputTimeZone, formInputlabel)"
        :disable="!formInputTimeZone && !formInputlabel"
      />
    </template>
  </CModal>
</template>
<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
}
</style>
