<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import Button from '../components/Button.vue'

const store = useStore()

const newProperty = ref({
  title: '',
  price: 0,
  location: '',
  description: '',
  image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80',
  features: ''
})

function submitProperty() {
  const featuresArray = newProperty.value.features.split(',').map(f => f.trim()).filter(f => f)
  store.addProperty({
    ...newProperty.value,
    features: featuresArray
  })
  // Reset form
  newProperty.value = {
    title: '',
    price: 0,
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&w=800&q=80',
    features: ''
  }
  alert('Property Published!')
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-display font-bold mb-8 text-neon-purple">Publisher Dashboard</h1>
    
    <div class="bg-glass-white backdrop-blur-sm p-8 rounded-xl border border-white/10">
      <h2 class="text-xl font-bold mb-6">Add New Property</h2>
      
      <form @submit.prevent="submitProperty" class="space-y-6">
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-400">Property Title</label>
          <input v-model="newProperty.title" type="text" required class="w-full bg-dark-bg border border-white/20 rounded p-3 focus:border-neon-blue focus:outline-none transition-colors text-white">
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-400">Price ($)</label>
            <input v-model="newProperty.price" type="number" required class="w-full bg-dark-bg border border-white/20 rounded p-3 focus:border-neon-blue focus:outline-none transition-colors text-white">
          </div>
          <div>
            <label class="block text-sm font-bold mb-2 text-gray-400">Location</label>
            <input v-model="newProperty.location" type="text" required class="w-full bg-dark-bg border border-white/20 rounded p-3 focus:border-neon-blue focus:outline-none transition-colors text-white">
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2 text-gray-400">Description</label>
          <textarea v-model="newProperty.description" rows="4" required class="w-full bg-dark-bg border border-white/20 rounded p-3 focus:border-neon-blue focus:outline-none transition-colors text-white"></textarea>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2 text-gray-400">Features (comma separated)</label>
          <input v-model="newProperty.features" type="text" placeholder="e.g. Pool, Gym, AI Security" class="w-full bg-dark-bg border border-white/20 rounded p-3 focus:border-neon-blue focus:outline-none transition-colors text-white">
        </div>

        <Button variant="primary" class="w-full py-3">Publish Property</Button>
      </form>
    </div>
  </div>
</template>
