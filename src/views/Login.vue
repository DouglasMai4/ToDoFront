<template>
	<main>
		<form @submit="login">
			<h1>Login</h1>

			<hr />

			<Input
				label="Email"
				type="email"
				placeholder="exemplo@email.com"
				:msg="msgEmail"
				v-model="email"
			/>

			<Input
				label="Senha"
				type="password"
				placeholder="********"
				:msg="msgPass"
				v-model="pass"
			/>

			<Button
				type="submit"
				label="Entrar"
				:disabled="loading"
			/>
			<p>
				Precisa de uma conta?, <RouterLink to="/register">clique aqui</RouterLink> e crie uma!
			</p>
		</form>
	</main>
</template>

<script>
	import { useLoginStore } from '../stores/Login'

	import Input from '../components/Input.vue'
	import Button from '../components/Button.vue'

	export default {
		name: 'Login',
		setup() {
		  const loginStore = useLoginStore()

		  return { loginStore }
		},
		data() {
		  return {
		    email: null,
		    pass: null,
		    msgEmail: null,
		    msgPass: null,
		    loading: false
		  }
		},
		components: {
		  Input,
		  Button
		},
		methods: {
		  async login(e) {
		    e.preventDefault()

		    if (!this.email) {
		    	this.msgEmail = 'O email é obrigatório!'
		    	this.msgPass = null
		    } else if (!this.pass) {
		    	this.msgPass = 'A senha é obrigatória!'
		    	this.msgEmail = null
		    } else {
		    	this.msgEmail = null
		    	this.msgPass = null

		    	this.loginStore.login(this.email, this.pass)

		    	if (this.loginStore.user) {
		    		this.$router.push('/itens')
		    	}
		    }
		  }
		},
		mounted() {
			if (this.loginStore.user) {
				this.$router.push('/itens')
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

	  font-size: 1.2em;

	  min-height: 100vh;
	}

	form {
	  display: flex;
	  flex-direction: column;
	  gap: 15px;

	  text-align: center;

	  padding: 25px;

	  border-radius: 10px;

	  background-color: var(--bg-color-t);
	  backdrop-filter: blur(10px);

	  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}

	@media screen and (max-width: 600px) {
		form {
			margin: 10px;
		}
	}
</style>