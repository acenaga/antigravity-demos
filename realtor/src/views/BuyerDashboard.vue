<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
import PropertyCard from '../components/PropertyCard.vue'

const store = useStore()

const favoriteProperties = computed(() => {
  return store.properties.filter(p => store.favorites.includes(p.id))
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-display font-bold mb-8 text-neon-blue">My Favorites</h1>
    
    <div v-if="favoriteProperties.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PropertyCard 
        v-for="property in favoriteProperties" 
        :key="property.id" 
        :property="property" 
      />
    </div>
    <div v-else class="text-center py-20 bg-glass-white rounded-xl border border-white/10">
      <p class="text-gray-400 text-lg">No favorites yet. Start exploring!</p>
    </div>
  </div>
</template>
