<template>
	<main>
		<form @submit="register">
	      <h1>Registrar-se</h1>
	      <Input @data="(e) => this.usuario = e" tp="text" lb="Usuario" />
	      <Input @data="(e) => this.senha = e" tp="password" lb="Senha" />
	      <Button tp="submit" lb="Registrar" />
	      <div class="info-container">
	        <h2>Já tem uma conta ?</h2>
	        <p>Então <RouterLink to="/login">clique aqui</RouterLink> e faça login!</p>
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
		name: 'Register',
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
			async register(e) {
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

					console.log('Req: ', req)

					// if (req.status === 201) {
					// 	this.msg = `${req.data[0].message}`
					// } else {
					// 	this.msg = `${req.response.data.error}`
					// }

					// setTimeout(() => {this.msg = null}, 4500)
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