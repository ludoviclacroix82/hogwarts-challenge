<template>
  <div>
    <div class="bg-gray-900 text-gray-100 rounded-lg mt-10 h-[80dvh] max-h-screen flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-harry-25">{{ house }}</h2>
      <Chat/>
      <EditChatForm />
    </div>
  </div>
</template>

<script>
import Chat from '@/components/chat.vue'
import EditChatForm from '@/components/EditChatForm.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'chat',
  components: {
    Chat,
    EditChatForm
  }
})
</script>
