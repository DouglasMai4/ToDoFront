<template>
  <main>
     <router-view />
  </main>
</template>

<script>
  import { useLoginStore } from './stores/Login'

  export default {
    name: 'App',
    setup() {
      const loginStore = useLoginStore()

      loginStore.getLogin()
    }
  }
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    font-size: 1.2em;

    min-height: 100vh;
  }
</style>