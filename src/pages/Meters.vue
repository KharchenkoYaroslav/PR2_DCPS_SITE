<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Meter } from "../types";

const meters = ref<Meter[]>([]);
const newMeterNumber = ref("");

onMounted(async () => {
  await fetchMeters();
});

async function fetchMeters() {
  const res = await fetch("https://pr2dcpsserver-production.up.railway.app/meters");
  meters.value = await res.json();
}

async function addMeter() {
  if (!newMeterNumber.value) return;

  const response = await fetch("https://pr2dcpsserver-production.up.railway.app/meters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number: newMeterNumber.value }),
  });

  if (response.ok) {
    newMeterNumber.value = "";
    await fetchMeters();
    console.log("Лічильник додано");
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2>Лічильники</h2>
    <div class="mb-3">
      <input v-model="newMeterNumber" class="form-control" placeholder="Номер лічильника" />
      <button @click="addMeter" class="btn btn-primary mt-3">Додати лічильник</button>
    </div>
    
    <!-- Обмежений прокручуваний блок для лічильників -->
    <div class="meters-list-container">
      <ul class="list-group">
        <li v-for="meter in meters" :key="meter.id" class="list-group-item d-flex justify-content-between align-items-center">
          Лічильник {{ meter.number }}
          <div class="d-flex gap-2">
            <router-link class="btn btn-outline-primary btn-sm text-decoration-none"
              :to="{ name: 'readings', params: { meterId: meter.id, meterNumber: meter.number } }">
              Показники
            </router-link>
            <router-link class="btn btn-outline-primary btn-sm text-decoration-none"
              :to="{ name: 'bills', params: { meterId: meter.id, meterNumber: meter.number } }">
              Рахунки
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.meters-list-container {
  max-height: 331px;  
  overflow-y: auto;   
  margin-top: 10px;
}

.btn {
  transition: transform 0.2s ease, background-color 0.3s ease, color 0.3s ease;
}

.btn:active {
  transform: scale(0.9); /* Ефект при натисканні */
}
</style>


