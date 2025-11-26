<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
import Button from './Button.vue'

const props = defineProps({
  property: {
    type: Object,
    required: true
  }
})

const store = useStore()
const isFavorite = computed(() => store.favorites.includes(props.property.id))

function toggleFav() {
  store.toggleFavorite(props.property.id)
}
</script>

<template>
  <div class="group relative bg-glass-white backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-neon-blue transition-colors duration-300">
    <!-- Image -->
    <div class="aspect-video overflow-hidden relative">
      <img :src="props.property.image" :alt="props.property.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-60"></div>
      
      <!-- Price Tag -->
      <div class="absolute bottom-4 left-4 bg-dark-bg/80 backdrop-blur px-3 py-1 border border-neon-blue text-neon-blue font-display font-bold">
        ${{ props.property.price.toLocaleString() }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-xl font-display font-bold mb-2 group-hover:text-neon-blue transition-colors">{{ props.property.title }}</h3>
      <p class="text-gray-400 text-sm mb-4 flex items-center">
        <span class="mr-2">📍</span> {{ props.property.location }}
      </p>
      
      <div class="flex justify-between items-center mt-4">
        <router-link :to="'/property/' + props.property.id">
          <Button variant="secondary" class="text-xs px-4 py-1">View Details</Button>
        </router-link>
        
        <button @click="toggleFav" class="text-2xl transition-transform active:scale-90" :class="isFavorite ? 'text-neon-purple' : 'text-gray-600 hover:text-neon-purple'">
          ♥
        </button>
      </div>
    </div>
  </div>
</template>
