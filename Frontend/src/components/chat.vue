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
                        <a  v-if="(userLogin._id === message.author_id)" :href="`../../lobby/${house}/${message._id}`"> Edit </a> 
                        <a @click="deleteMessage(message._id)" v-if="(userLogin.role === 'Professor')" :href="`#`">|  Delete </a> 
                    </p>
                </div>
         </div>
        </div>
    </div>  

</div>
</template>

<script>
import Message from '@/Models/MessagesModel'
import User from '@/Models/UserModel'

import { useRoute } from 'vue-router'

export default {
  data() {
    return {
      messages: '',
      content: '',
      userLogin :''
    }
  },
  setup() {
    const route = useRoute()
    const house = route.params.house   
    
    return { house}
  }, 
  async created() {
    const house = this.$route.params.house
    const user = JSON.parse(sessionStorage.getItem('User'))
    const userFind = await new User().getUser(user.value.id)
    this.userLogin = userFind.data
       
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
    async deleteMessage(id){
        if (confirm("Are you sure?") == true) {
            const response = await new Message().del(id)
            location.reload()
        } 
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