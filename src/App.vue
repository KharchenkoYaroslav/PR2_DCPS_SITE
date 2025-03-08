<script setup lang="ts"></script>

<template>
  <div class="container mt-5">
    <nav class="navbar navbar-expand-lg navbar-light bg-primary mb-4 rounded">
      <div class="container d-flex justify-content-start">
        <router-link class="nav-link mx-3" to="/">Лічильники</router-link>
        <router-link class="nav-link mx-3" to="/tariffs">Тарифи</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
}

.nav-link {
  padding: 2px 4px;
  border-radius: 10px;
  transition: all 0.3s ease;
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  background-color: white; 
  color: #2d67c4; 
}


.nav-link:active {
  transform: scale(0.9); 
  color: #2d67c4; 
  background-color: white; 
}


.nav-link:focus:not(.nav-link:hover)  {
  color: white;
}
</style>

