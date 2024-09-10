// /routes/routes.ts
import Home from '@/views/Home.vue'
import Lobby from '@/views/lobby.vue'
import Message from '@/views/Messages.vue'
import Users from '@/views/users.vue'
import Login from '@/views/login.vue'
import Logout from '@/views/Logout.vue'
import Register from '@/views/register.vue'




export const routes: { path: string; component: any; meta?: any }[] = [
    { path: '/', component: Home },
    { path: '/lobby', component: Lobby, meta: { requiresAuth: true } },
    { path: '/lobby/:house', component: Message, meta: { requiresAuth: true } },
    { path: '/lobby/:house/:id', component: Message, meta: { requiresAuth: true } },
    { path: '/users', component: Users, meta: { requiresAuth: true } },
    { path: '/login', component: Login, meta: { requiresAuth: false } },
    { path: '/logout', component: Logout, meta: { requiresAuth: true } },
    { path: '/register', component: Register }
]
