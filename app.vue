<script setup>
  useHead({
    titleTemplate: (pageName) => {
      return pageName ? `${pageName} - ToDo` : 'ToDo'
    }
  })

  import { useLoginStore } from '~/stores/LoginStore'

  const loginStore = useLoginStore()
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
  export default {
    mounted() {
      loginStore.startLogin()
    }
  }
</script>
