<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'

import { checkSession } from './components/utils/utils';

checkSession()

</script>

<template>
  <NavBar/>  
  <main class="h-[85vh] mx-auto">
    <router-view></router-view>
  </main>
  <Footer/>
</template>