<template>
  <nav class="bg-gray-800 p-4 h-[10vh] mx-auto">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo avec image -->
      <div class="flex items-center">
        <img src="../../../public/assets/images/Hogwarts.png" alt="Logo" class="h-11 w-11 mr-3">
        <span class="text-xl text-harry-25">Hogwarts</span>
        <span class="text-xl text-harry-18" v-if ="(user_role)"> &nbsp; | &nbsp;{{ user_role }} {{ user_name }}</span>
      </div>

      <!-- Menu -->
      <div class="flex space-x-6">
        <RouterLink to="/" class="hover:text-gray-400 text-harry-18">Home</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/lobby" class="hover:text-gray-400 text-harry-18">Lobby</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/users" class="hover:text-gray-400 text-harry-18">Users</RouterLink>
      </div>

      <!-- Login et Register -->
      <div class="flex space-x-4">
        <RouterLink v-if="!isAuthenticated" to="/login" class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-harry-12">Login</RouterLink>
        <RouterLink v-if="isAuthenticated" to="/logout" class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 text-harry-12">Logout</RouterLink>
        <RouterLink v-if="!isAuthenticated" to="/register" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 text-harry-12">Register</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script>
import User from '@/Models/UserModel';


export default {
  data() {
    return {
      isAuthenticated: !!sessionStorage.getItem('User'),
      user_name :'',
      user_role :''
    }
  },
  created() {
    const user = JSON.parse(sessionStorage.getItem('User'))
    if(user){
      this.user_name = user.value.user_name
    this.user_role = user.value.role
    }    
  }, 
}
</script>