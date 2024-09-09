<template>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div 
            v-for="(house, index) in houses" 
            :key="index" 
            class="box bg-gray-800 p-4 text-white text-center h-[80dvh]"
            :style="{ backgroundColor: house.color }" 
        >
        <img 
            :src="house.image" 
            :alt="`Image de ${house.name}`" 
            class="w-full h-[60dvh] object-cover mb-4"
        >
        <a
            :href="`lobby/${house.name}`" 
            v-if="house_user === house.name"
            class="text-white px-4 py-2 rounded hover:opacity-90 text-harry-25"
            >
            {{ house.name }}
        </a>
        </div>
      </div>
    </div>
  </template>

<script>
import imgGryffondor from '../../public/assets/images/Gryffindor.png'
import imgHufflepuff from '../../public/assets/images/Hufflepuff.png'
import imgRavenclaw from '../../public/assets/images/Ravenclaw.png'
import imgSlytherin from '../../public/assets/images/Slytherin.png'

export default {
  data() {
    return {
      houses: [
        {
          name: 'Gryffondor',
          image: imgGryffondor,
          color: '#c9144b',
        },
        {
          name: 'Hufflepuff',
          image: imgHufflepuff,
          color: '#dd7126',
        },
        {
          name: 'Ravenclaw',
          image: imgRavenclaw,
          color: '#113b8f',
        },
        {
          name: 'Slytherin',
          image: imgSlytherin,
          color: '#18744e',
        },
      ],
      house_user: '', 
    };
  },
  async created() {
   
    const user = JSON.parse(sessionStorage.getItem("User"))
    if (user) {
      this.house_user = user.value.house
    }
  },
};


</script>
  