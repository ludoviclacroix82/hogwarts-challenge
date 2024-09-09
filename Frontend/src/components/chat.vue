<template>
<div class="flex flex-col h-full w-[60%]">
    <div class="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100 scroll-smooth">
        {{ noHouse }}
        <div class="space-y-4">
            <div v-for="message in messages" class="bg-gray-700 p-3 rounded-lg flex justify-between items-center">
        <div class="text-left">
            <a :href="`../users/${message.author_id}`">{{ message.author }}</a> :
            <p>{{ message.content }}
            </p>
        </div>
        <div class="text-right text-xs">            
            <p>{{  new Date(message.created_at).toLocaleString()}}</p>
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

export default {
  data() {
    return {
      messages: '',
      content: '',
      noHouse:''
    }
  },
  async created() {
    const house = this.$route.params.house;

    const messageInstance = new Message()
    const messages = await messageInstance.getMessage(house)
    if(messages)
        this.messages = messages.data
    else
        this.$router.push('/lobby'); 
  },
  methods: {
    async submitForm() {
      const message = new Message(this.content)
      const response = await message.created()

      location.reload()
    },
    startAutoReload() {
      setInterval(() => {
        location.reload()
      }, 30000)
    }
  },
  mounted() {
    this.startAutoReload()
  }
}

</script>