<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
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