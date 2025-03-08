<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { Bill } from "../types";

const route = useRoute();
const meterId = route.params.meterId as string;
const meterNumber = ref(route.params.meterNumber as string);
const bills = ref<Bill[]>([]);
const errorMessage = ref("");

onMounted(async () => {
  await fetchBills();
});

async function fetchBills() {
  try {
    const res = await fetch(`https://pr2dcpsserver-production.up.railway.app/bills/${meterId}`);
    if (!res.ok) {
      throw new Error("Не вдалося отримати рахунки");
    }
    const data = await res.json();
    bills.value = data.bills; 
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : "Сталася невідома помилка";
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4 text-dark">Рахунки для лічильника {{ meterNumber }}</h2>

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div class="bills-list-container">
      <ul class="list-group">
        <li v-for="bill in bills" :key="bill.id" class="list-group-item d-flex justify-content-between align-items-center custom-list-item">
          <span class="bill-date">{{ new Date(bill.generated_at).toLocaleDateString() }}</span>
          <span class="bill-amount">{{ bill.amount }} грн</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.bills-list-container {
  max-height: 420px; 
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

.custom-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.bill-date {
  font-size: 0.95rem;
  color: #555;
}

.bill-amount {
  font-size: 1.1rem;
  font-weight: bold;
  color: #007bff;
}
</style>



