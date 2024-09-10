<template>
    <form v-if="(!id)" @submit.prevent="submitForm" class="w-[60%]">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text" v-model="content"  placeholder="Votre message" class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Envoyer</button>            
        </div>
    </form>
    <form v-else="(id)" @submit.prevent="submitFormEdit" class="w-[60%]">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text" placeholder="Votre message" v-model="content"  class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Edit</button>            
        </div>
    </form>
</template>

<script>
import { ref, watchEffect } from 'vue'

import Message from '@/Models/MessagesModel'
import User from '@/Models/UserModel'

import { defineComponent } from 'vue'
import { useRouter, useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute()
    const router = useRouter();
    const house = ref(route.params.house)
    const id = ref(route.params.id)
    const content = ref('')

    watchEffect(async () => {
      if (id.value) {
        const message = await new Message().getMessageId(id.value)
        content.value = message.data.content
      }
    })

    const submitForm = async () => {
      const response = await new Message(content.value, '', '', house.value).created()
      location.reload()
    }

    const submitFormEdit = async (res) => {
      const response = await new Message().update(id.value,content.value)
      console.log(response);
      
      router.push(`/lobby/${house.value}`)
      setInterval(() => {
        location.reload()
      }, 100)
    }

    return { house, id, content, submitForm, submitFormEdit }
  }
}

</script>