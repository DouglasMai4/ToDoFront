<template>
  <main>
    <form @submit="login">
      <h1>Entrar</h1>
      <Input @data="(e) => this.usuario = e" tp="text" lb="Usuario" />
      <Input @data="(e) => this.senha = e" tp="password" lb="Senha" />
      <Button tp="submit" lb="Entrar" />
      <div class="info-container">
        <h2>Não tem uma conta ?</h2>
        <p>Não tem problema, <RouterLink to="/register">clique aqui</RouterLink> e crie uma!</p>
      </div>
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
        msg: null,
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
          const req = await axios.post('https://todo-b4ck.herokuapp.com/login/register', {
            'username': `${this.usuario}`,
            'password': `${this.senha}`
          })

          if (req.status === 201) {
            console.log('User: ', req)

            this.msg = 'Login realizado com sucesso!'

            setTimeout(() => {this.msg = null}, 4500)
          } else if (req.status === 200) {
            this.msg = 'Usuário não encontrado!'
            
            setTimeout(() => {this.msg = null}, 4500)
          }
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

  a {
    text-decoration: none;
    color: var(--c-primary);
  }
  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>