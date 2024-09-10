<template>
    <form  @submit.prevent="submitForm" class="w-[60%]">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text" v-model="content" placeholder="Votre message" class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Edit</button>            
        </div>
    </form>
</template>

<script>
import Message from '@/Models/MessagesModel'
import User from '@/Models/UserModel'

export default {
  data() {
    return {
    }
  },
  setup() {
    const route = useRoute()
    const house = route.params.house
    return { house}
  }, 
  methods: {
    async submitForm() {

        const house = this.$route.params.house
        const response = await new Message(this.content,'','',house).created()

      location.reload()
    }
 }
}

</script>