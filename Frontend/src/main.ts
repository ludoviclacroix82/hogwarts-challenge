// Main.ts

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router' 
import { routes } from './routes/routes'


const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Ajoutez les guards de navigation
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!sessionStorage.getItem('User'); // Remplacez par votre logique d'authentification

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/login' })
    } else {
        next()
    }
});


app.use(router)
app.mount('#app')

