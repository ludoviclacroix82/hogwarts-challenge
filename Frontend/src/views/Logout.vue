<template>
    <h2>Logout</h2>
</template>

<script>
import User from '@/Models/UserModel'

export default {
  mounted() {
    new User().logout()
    
    this.$router.push('/login'); 
    location.reload()
  }
}
</script>