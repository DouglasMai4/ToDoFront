<template>
  <main>
    <h1>Home</h1>
  </main>
</template>

<script>
  export default {
    name: 'Home',
    mounted() {
      this.$router.push('/login')
    }
  }
</script>