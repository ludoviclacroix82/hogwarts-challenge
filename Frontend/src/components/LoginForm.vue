<template>
    <div  class=" text-white flex flex-col items-center justify-center" >
    <h2 class="text-2xl font-bold mb-6 text-center text-harry-25 mt-16">Login</h2>
        
        <form @submit.prevent="submitForm" class="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <div class="mb-4">{{ message }}</div>
            <div class="mb-4">
                <label for="email" class="block text-white text-harry-12">Email</label>
                <input type="email" v-model="email"  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            </div>
            <div class="mb-6">
                <label for="password" class="block text-white text-harry-12">Mot de passe</label>
                <input type="password" v-model="password"  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-harry-12">login</button>
        </form>
    </div>
</template>

<script>
import User from '../Models/UserModel'

export default {
  data() {
    return {
      user_name: '',
      email: '',
      password:'',
      message:'',
      status:'',
    };
  },
  methods: {
    async submitForm() {
      const user = new User(this.email,this.password)
      const response = await user.loginUser()

      //message
      this.message = response.data.message
      this.status = response.status

      // Réinitialiser les champs du formulaire
      if(this.status === 200){
        this.$router.push('/lobby'); 
        setInterval(() => {
        location.reload()
      }, 50)
      }      
    }
  }
}
</script>