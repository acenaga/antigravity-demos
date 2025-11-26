<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-dark-bg text-white font-sans">
    <NavBar />
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
