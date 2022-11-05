<template>
	<main>
		<form @submit="login" class="container">
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

			<hr />

			<Button
				type="submit"
				label="Entrar"
				:disabled="loading"
				:sucess="sucess"
			/>
			<p>
				Precisa de uma conta?, <RouterLink to="/register">clique aqui</RouterLink> e crie uma!
			</p>
		</form>
		<Notification
			v-if="msg"
			:noti="msg"
		/>
	</main>
</template>

<script>
	import { supabase } from '../supabase'

	import Input from '../components/Input.vue'
	import Button from '../components/Button.vue'
	import Notification from '../components/Notification.vue'

	export default {
		name: 'Login',
		data() {
		  return {
		    email: null,
		    pass: null,
		    msgEmail: null,
		    msgPass: null,
		    loading: false,
		    sucess: false,
		    msg: null
		  }
		},
		components: {
		  Input,
		  Button,
		  Notification,
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

		    	try {
		    		this.loading = true
		    		this.sucess = false

		    		const { data, error } = await supabase.auth.signInWithPassword({
		    		  email: this.email,
		    		  password: this.pass,
		    		})

		    		if (!error) {
		    			this.sucess = true
		    			setTimeout(() => {
		    				this.$router.push('/itens')
		    			}, 2000)
		    		} else {
		    			this.sucess = false

		    			this.msg = 'Não foi possível fazer login!'

		    			setTimeout(() => {
		    				this.msg = null
		    			}, 4000)
		    		}
		    	} finally {
		    		this.loading = false
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

	  font-size: 1.2em;

	  min-height: 100vh;
	}

	form {
	  display: flex;
	  flex-direction: column;
	  gap: 15px;

	  text-align: center;
	}

	@media screen and (max-width: 600px) {
		form {
			margin: 10px;
		}
	}
</style>