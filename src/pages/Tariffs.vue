<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Tariff } from "../types";

const tariffs = ref<Tariff | null>(null);

onMounted(async () => {
  const res = await fetch("https://pr2dcpsserver-production.up.railway.app/tariff");
  tariffs.value = await res.json();
  console.log(tariffs.value);
  
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Тарифи</h2>
    <template v-if="tariffs">
      <p><strong>День:</strong> {{ tariffs.day_rate }} грн/кВт</p>
      <p><strong>Ніч:</strong> {{ tariffs.night_rate }} грн/кВт</p>
      <p><strong>Штраф (день):</strong> {{ tariffs.day_penalty }} кВт</p>
      <p><strong>Штраф (ніч):</strong> {{ tariffs.night_penalty }} кВт</p>
      <p><strong>Оновлено:</strong> {{ new Date(tariffs.updated_at).toLocaleDateString() }}</p>
    </template>
  </div>
</template>

<style scoped>
p {
  font-size: 18px;
  color: #333;
}

strong {
  color: #007bff;
}
</style>
