
<template>
    <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo avec image -->
      <div class="flex items-center">
        <img src="../icons/Hogwarts.png" alt="Logo" class="h-11 w-11 mr-3">
        <span class="text-xl font-bold">Hogwarts</span>
      </div>

      <!-- Menu -->
      <div class="flex space-x-6">
        <RouterLink to="/" class="hover:text-gray-400">Home</RouterLink>
        <RouterLink to="/lobby" class="hover:text-gray-400">Lobby</RouterLink>
        <RouterLink to="/users" class="hover:text-gray-400">Users</RouterLink>
    </div>

      <!-- Login et Register -->
      <div class="flex space-x-4">
        <RouterLink to='/login' class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Login</RouterLink>
        <RouterLink to='/register' class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Registe</RouterLink>
      </div>
    </div>
  </nav>
</template>