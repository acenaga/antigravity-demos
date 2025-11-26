<script setup>
import { useStore } from '../store'
import PropertyCard from '../components/PropertyCard.vue'

const store = useStore()
</script>

<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-4">
        Future Estate
      </h1>
      <p class="text-gray-400 text-lg">Find your sanctuary in the digital age.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PropertyCard 
        v-for="property in store.properties" 
        :key="property.id" 
        :property="property" 
      />
    </div>
  </div>
</template>
