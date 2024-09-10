<template>
  {{ messageEdit}}
    <form v-if="(!id)" @submit.prevent="submitForm" class="w-[60%]">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text"  placeholder="Votre message" class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Envoyer</button>            
        </div>
    </form>
    <form v-else="(id)" @submit.prevent="submitFormEdit" class="w-[60%]">
        <div class="flex items-center p-4 border-t border-gray-700 ">
                <input type="text" placeholder="Votre message" class="flex-1 bg-gray-700 text-gray-100 p-2 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Edit</button>            
        </div>
    </form>
</template>

<script>
import { ref, watchEffect } from 'vue'

import Message from '@/Models/MessagesModel'
import User from '@/Models/UserModel'

import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default {
  data() {
    return {
    }
  },
  setup() {
    const route = useRoute()
    const house = ref(route.params.house)
    const id = ref(route.params.id)
    const messageEdit = ref(null)

    // Réagir aux changements de paramètres de la route
    watchEffect(async () => {
      if (id.value) {
        messageEdit.value = await new Message().getMessageId(id.value)
      }
    })

    return { house, id, messageEdit }
  },
  methods: {
    async submitForm() {
        const house = this.$route.params.house
        const response = await new Message(this.content,'','',house).created()

      location.reload()
    },

 }
}

</script>