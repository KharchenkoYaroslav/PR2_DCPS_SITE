<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Reading } from "../types";

const route = useRoute();
const meterId = route.params.meterId as string;
const meterNumber = ref(route.params.meterNumber as string);
const readings = ref<Reading[]>([]);
const newDayReading = ref(0);
const newNightReading = ref(0);
const errorMessage = ref("");

onMounted(async () => {
  await fetchReadings();
});

// Отримання історії показників
async function fetchReadings() {
  try {
    const res = await fetch(`https://pr2dcpsserver-production.up.railway.app/readings/${meterId}`);
    if (!res.ok) {
      throw new Error("Не вдалося отримати історію показників");
    }
    const data = await res.json();
    readings.value = data.readings;
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Сталася невідома помилка";
  }
}

async function addReading() {
  errorMessage.value = "";

  if (!newDayReading.value || !newNightReading.value) {
    errorMessage.value = "Будь ласка, введіть денні та нічні показники";
    return;
  }

  try {
    const response = await fetch("https://pr2dcpsserver-production.up.railway.app/readings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meterId: parseInt(meterId),
        day_reading: newDayReading.value,
        night_reading: newNightReading.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Не вдалося додати показники");
    }

    const data = await response.json();
    console.log("Показники додані:", data.reading);
    console.log("Новий рахунок:", data.bill);

    newDayReading.value = 0;
    newNightReading.value = 0;

    await fetchReadings();
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Сталася невідома помилка";
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2>Показники для лічильника {{ meterNumber }}</h2>

    <div class="d-flex align-items-center gap-3 mb-2">
      <div class="d-flex align-items-center gap-2">
        <label class="form-label m-0">День:</label>
        <input v-model.number="newDayReading" class="form-control" placeholder="День" type="number" />
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="form-label m-0">Ніч:</label>
        <input v-model.number="newNightReading" class="form-control" placeholder="Ніч" type="number" />
      </div>
    </div>

    <button @click="addReading" class="btn btn-success">Додати</button>

    <div v-if="errorMessage" class="alert alert-danger mt-2">
      {{ errorMessage }}
    </div>

    <div class="readings-list-container">
      <ul class="list-group mt-2">
        <li v-for="reading in readings" :key="reading.id"
          class="list-group-item d-flex justify-content-between align-items-center bg-light border rounded mb-2 shadow-sm">
          <span class="fw-bold">{{ new Date(reading.reading_date).toLocaleDateString() }}</span>
          <span>День: <strong>{{ reading.day_reading }}</strong> кВт</span>
          <span>Ніч: <strong>{{ reading.night_reading }}</strong> кВт</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.readings-list-container {
  max-height: 330px; 
  overflow-y: auto; 
  margin-top: 10px;
}

.list-group-item {
  background-color: #f9f9f9;
  border: none;
  padding: 12px 20px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.list-group-item:hover {
  background-color: #e7f3f9;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.2);
}

span {
  font-size: 0.9rem;
}

.fw-bold {
  font-weight: bold;
}

.btn {
  transition: transform 0.2s ease ;
}

.btn:active {
  transform: scale(0.9); 
}
</style>
