import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStore = defineStore('main', () => {
    // User State
    const userRole = ref('buyer') // 'publisher' or 'buyer'
    const userName = ref('Alex Cyber')

    // Dummy Data
    const properties = ref([
        {
            id: 1,
            title: 'Neon Penthouse',
            price: 1500000,
            location: 'Sector 7, Upper City',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
            description: 'Luxurious penthouse with panoramic views of the neon skyline.',
            features: ['Holographic Concierge', 'Anti-Gravity Bed', 'Smart Glass Windows'],
            publisherId: 1
        },
        {
            id: 2,
            title: 'Cyber Loft',
            price: 850000,
            location: 'District 9, Industrial Zone',
            image: 'https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?auto=format&fit=crop&w=800&q=80',
            description: 'Modern loft converted from an old factory. High ceilings and exposed pipes.',
            features: ['Soundproof Walls', 'Fiber Optic Lighting', 'Drone Landing Pad'],
            publisherId: 2
        },
        {
            id: 3,
            title: 'Pod Unit 404',
            price: 250000,
            location: 'Sector 3, Lower Levels',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            description: 'Compact living space for the efficient citizen.',
            features: ['Foldable Furniture', 'Integrated AI Assistant', 'Air Filtration System'],
            publisherId: 1
        }
    ])

    const favorites = ref([])

    // Getters
    const isPublisher = computed(() => userRole.value === 'publisher')
    const isBuyer = computed(() => userRole.value === 'buyer')

    // Actions
    function toggleRole() {
        userRole.value = userRole.value === 'publisher' ? 'buyer' : 'publisher'
    }

    function addProperty(property) {
        properties.value.push({
            id: Date.now(),
            ...property,
            publisherId: 1 // Assuming current user is ID 1
        })
    }

    function toggleFavorite(propertyId) {
        const index = favorites.value.indexOf(propertyId)
        if (index === -1) {
            favorites.value.push(propertyId)
        } else {
            favorites.value.splice(index, 1)
        }
    }

    return {
        userRole,
        userName,
        properties,
        favorites,
        isPublisher,
        isBuyer,
        toggleRole,
        addProperty,
        toggleFavorite
    }
})
