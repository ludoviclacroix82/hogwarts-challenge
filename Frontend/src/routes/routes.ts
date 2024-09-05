// /routes/routes.ts
import Home from '@/views/Home.vue'
import Lobby from '@/views/lobby.vue'
import Users from '@/views/users.vue'
import Login from '@/views/login.vue'
import Register from '@/views/register.vue'

export const routes : {path : string ; component : any }[] = [
    { path: '/', component: Home },
    { path: '/lobby', component: Lobby },
    { path: '/users', component: Users },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
]
