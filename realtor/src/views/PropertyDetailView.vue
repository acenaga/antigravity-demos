<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '../store'
import Button from '../components/Button.vue'

const route = useRoute()
const store = useStore()

const property = computed(() => {
  return store.properties.find(p => p.id === Number(route.params.id))
})

const isFavorite = computed(() => property.value && store.favorites.includes(property.value.id))

function toggleFav() {
  if (property.value) {
    store.toggleFavorite(property.value.id)
  }
}
</script>

<template>
  <div v-if="property" class="max-w-4xl mx-auto">
    <div class="relative aspect-video rounded-xl overflow-hidden mb-8 border border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
      <img :src="property.image" :alt="property.title" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
      <div class="absolute bottom-0 left-0 p-8">
        <h1 class="text-4xl md:text-5xl font-display font-bold mb-2">{{ property.title }}</h1>
        <p class="text-xl text-neon-blue">{{ property.location }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2 space-y-8">
        <section class="bg-glass-white backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <h2 class="text-2xl font-display font-bold mb-4 text-neon-purple">Description</h2>
          <p class="text-gray-300 leading-relaxed">{{ property.description }}</p>
        </section>

        <section class="bg-glass-white backdrop-blur-sm p-6 rounded-lg border border-white/10">
          <h2 class="text-2xl font-display font-bold mb-4 text-neon-purple">Features</h2>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li v-for="feature in property.features" :key="feature" class="flex items-center text-gray-300">
              <span class="text-neon-blue mr-2">⚡</span> {{ feature }}
            </li>
          </ul>
        </section>
      </div>

      <div class="space-y-6">
        <div class="bg-glass-white backdrop-blur-sm p-6 rounded-lg border border-white/10 sticky top-24">
          <div class="text-3xl font-display font-bold text-neon-blue mb-6">${{ property.price.toLocaleString() }}</div>
          
          <Button variant="primary" class="w-full mb-4">Contact Agent</Button>
          <Button @click="toggleFav" :variant="isFavorite ? 'secondary' : 'secondary'" class="w-full">
            {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-20">
    <h2 class="text-2xl text-gray-500">Property not found</h2>
  </div>
</template>
