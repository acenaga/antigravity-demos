import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertyDetailView from '../views/PropertyDetailView.vue'
import PublisherDashboard from '../views/PublisherDashboard.vue'
import BuyerDashboard from '../views/BuyerDashboard.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/property/:id',
            name: 'property-detail',
            component: PropertyDetailView
        },
        {
            path: '/dashboard/publisher',
            name: 'publisher-dashboard',
            component: PublisherDashboard
        },
        {
            path: '/dashboard/buyer',
            name: 'buyer-dashboard',
            component: BuyerDashboard
        }
    ]
})

export default router
