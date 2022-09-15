<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.commit('initialiseStore')
    }
  }
</script>

<style scoped>

</style>