<template>
  <main>
    <form @submit="login">
      <h1>Login</h1>
      <Input @data="(e) => this.usuario = e" tp="text" lb="Usuario" />
      <Input @data="(e) => this.senha = e" tp="password" lb="Senha" />
      <Button tp="submit" lb="Entrar" />
    </form>
  </main>
  <Message v-if="msg" :msg="msg" />
</template>

<script>
  import Input from '../components/form/Input.vue'
  import Button from '../components/form/Button.vue'
  import Message from '../components/Message.vue'

  import axios from 'axios'

  export default {
    name: 'Login',
    components: {
      Input,
      Button,
      Message
    },
    data() {
      return {
        usuario: null,
        senha: null,
        msg: null
      }
    },
    methods: {
      async login(e) {
        e.preventDefault()

        if (this.usuario === null || this.usuario === '') {
          this.msg = 'O usuário não deve ficar vazio'

          setTimeout(() => {this.msg = null}, 4500)
        } else if (this.senha === null || this.senha === '') {
          this.msg = 'A senha não deve ficar vazia'

          setTimeout(() => {this.msg = null}, 4500)
        } else {
          const req = await axios.get('https://todo-b4ck.herokuapp.com/login/list')

          const data = users.data

          const users = data

          console.log('User 1: ', users[0].username)
        }
      }
    }
  }
</script>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-height: 90vh;
    color: var(--c-text-primary);
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    background-color: var(--bg-color-tran);

    padding: 25px;
    border-radius: 10px;
    text-align: center;

    backdrop-filter: blur(5px);
  }
</style>