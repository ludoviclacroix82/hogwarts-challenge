<template>
<div class="flex flex-col h-full w-[60%]">
    <div class="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scroll-smooth">
        <div class="space-y-4">
            <div v-for="message in messages" class="bg-gray-700 p-3 rounded-lg flex justify-between items-center">    
        <div class="text-left">
            <a :href="`../users/${message.author_id}`"><strong>{{message.user_role}} :</strong> {{ message.author }}</a> :
            <p>{{ message.content }}
            </p>
        </div>
        <div class="text-right text-xs">            
            <p v-if="(message.created_at != message.updated_at)">(modified) {{  new Date(message.updated_at).toLocaleString()}}</p>
            <p v-else>{{  new Date(message.created_at).toLocaleString()}}</p>
            <p>
                <a v-if="(userLogin._id === message.author_id)" :href="`../lobby/${message._id}`"> Edit </a> 
                <a v-if="(userLogin.role === 'Professor')" :href="`../lobby/${message._id}`">|  Delete </a> 
            </p>
        </div>
</div>
    </div>
</div>  
    <form @submit.prevent="submitForm">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text" v-model="content" placeholder="Votre message" class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Envoyer</button>
            
        </div>
    </form>
</div>
</template>

<script>
import Message from '@/Models/MessagesModel'
import User from '@/Models/UserModel'

export default {
  data() {
    return {
      messages: '',
      content: '',
      userLogin :''
    }
  },
  async created() {
    const house = this.$route.params.house
    const user = JSON.parse(sessionStorage.getItem('User'))
    const userFind = await new User().getUser(user.value.id)
    this.userLogin = userFind.data
    //const user_data = JSON.parse(userFind)
    
    console.log(userFind.data.house === house)
    
    if(userFind.data.house === house || userFind.data.role === 'Professor'){
        const messages = await new Message().getMessage(house)
        this.messages = messages.data

        for (const message of this.messages) {
                const author = await new User().getUser(message.author_id)            
                message.user_role = author.data.role;
            }
        
    } else{
        this.$router.push(`/lobby/${userFind.data.house}`)
        setInterval(() => {
        location.reload()
      }, 100)
    }    
    
  },
  methods: {
    async submitForm() {
        const house = this.$route.params.house
        const response = await new Message(this.content,'','',house).created()

      location.reload()
    },
    startAutoReload() {
      setInterval(() => {
        location.reload()
      }, 30000)
    }
  },
  mounted() {
    //this.startAutoReload()
  }
}

</script>