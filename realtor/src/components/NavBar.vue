<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import Button from './Button.vue'

const store = useStore()
const isOpen = ref(false)
</script>

<template>
  <nav class="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple z-50 relative">
        FutureEstate
      </router-link>
      
      <!-- Mobile Menu Button -->
      <button @click="isOpen = !isOpen" class="md:hidden z-50 relative text-white focus:outline-none">
        <span class="block w-6 h-0.5 bg-white mb-1.5 transition-transform duration-300" :class="{'rotate-45 translate-y-2': isOpen}"></span>
        <span class="block w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-300" :class="{'opacity-0': isOpen}"></span>
        <span class="block w-6 h-0.5 bg-white transition-transform duration-300" :class="{'-rotate-45 -translate-y-2': isOpen}"></span>
      </button>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="text-sm hover:text-neon-blue transition-colors">Home</router-link>
        
        <div class="flex items-center space-x-4 border-l border-white/10 pl-6">
          <span class="text-xs text-gray-500 uppercase tracking-widest">Role:</span>
          <button 
            @click="store.toggleRole"
            class="text-sm font-bold transition-colors"
            :class="store.isPublisher ? 'text-neon-purple' : 'text-neon-blue'"
          >
            {{ store.userRole.toUpperCase() }}
          </button>
        </div>

        <router-link v-if="store.isPublisher" to="/dashboard/publisher">
          <Button variant="primary" class="text-xs">Dashboard</Button>
        </router-link>
        
        <router-link v-if="store.isBuyer" to="/dashboard/buyer">
          <Button variant="secondary" class="text-xs">My Favorites</Button>
        </router-link>
      </div>

      <!-- Mobile Menu Overlay -->
      <!-- Mobile Menu Overlay -->
      <Teleport to="body">
        <div 
          class="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col justify-center items-center space-y-8 transition-all duration-300 md:hidden"
          :class="isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
        >
          <button @click="isOpen = false" class="absolute top-6 right-6 text-white focus:outline-none">
            <span class="block text-4xl">&times;</span>
          </button>

          <router-link @click="isOpen = false" to="/" class="text-xl font-display hover:text-neon-blue transition-colors">Home</router-link>
          
          <div class="flex flex-col items-center space-y-4">
            <span class="text-xs text-gray-500 uppercase tracking-widest">Current Role</span>
            <button 
              @click="store.toggleRole"
              class="text-xl font-bold transition-colors"
              :class="store.isPublisher ? 'text-neon-purple' : 'text-neon-blue'"
            >
              {{ store.userRole.toUpperCase() }}
            </button>
            <span class="text-xs text-gray-600">(Tap to switch)</span>
          </div>

          <router-link @click="isOpen = false" v-if="store.isPublisher" to="/dashboard/publisher">
            <Button variant="primary" class="text-lg px-8 py-3">Dashboard</Button>
          </router-link>
          
          <router-link @click="isOpen = false" v-if="store.isBuyer" to="/dashboard/buyer">
            <Button variant="secondary" class="text-lg px-8 py-3">My Favorites</Button>
          </router-link>
        </div>
      </Teleport>
    </div>
  </nav>
</template>
