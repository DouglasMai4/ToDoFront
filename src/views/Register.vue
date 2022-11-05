<template>
	<main>
		<form @submit="register" class="container">
			<h1>Registrar</h1>
			
			<hr />
			
			<Input
				label="Usuário"
				type="text"
				placeholder="usuario123"
				:msg="msgUser"
				v-model="user"
			/>

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
				label="Registrar"
				:disabled="loading"
				:sucess="sucess"
			/>

			<p>
				Já tem uma conta?, <RouterLink to="/login">clique aqui</RouterLink> e faça login!
			</p>
		</form>
		<Notification
			v-if="noti"
			:noti="noti"
		/>
	</main>
</template>

<script>
	import { supabase } from '../supabase'

	import Input from '../components/Input.vue'
	import Button from '../components/Button.vue'
	import Notification from '../components/Notification.vue'

	export default {
		name: 'Register',
		components: {
			Input,
			Button,
			Notification
		},
		data() {
			return {
				user: null,
				email: null,
				pass: null,
				msgUser: null,
				msgEmail: null,
				msgPass: null,
				noti: null,
				loading: false,
				sucess: false,
			}
		},
		methods: {
			async getUsername() {
				const { data, error } = await supabase
				  .from('profiles')
				  .select('username')
				  .eq('username', this.user)
				  .single()
				if (data) {
					this.msgUser = 'Usuário já cadastrado'
					return 'Erro'
				}
			},
			async register(e) {
				e.preventDefault()

				if (!this.user) {
					this.msgUser = 'O usuário é obrigatório!'
					this.msgEmail = null
					this.msgPass = null
				} else if (!this.email) {
					this.msgEmail = 'O email é obrigatório!'
					this.msgUser = null
					this.msgPass = null
				} else if (!this.pass) {
					this.msgPass = 'A senha é obrigatória!'
					this.msgUser = null
					this.msgEmail = null
				} else {
					this.msgUser = null
					this.msgEmail = null
					this.msgPass = null

					if (this.pass.length < 6) {
						this.msgPass = 'A senha deve conter pelo menos 6 digitos!'
						return
					}

					const user = this.getUsername()

					if (user) return

					try {
						this.loading = true

						const { data, error } = await supabase.auth.signUp(
							{
								email: this.email,
								password: this.pass,
								options: {
									data: {
										username: this.user
									}
								}
							}
						)
						if (error) throw error
						this.noti = 'Conta criada'
						setTimeout(() => {
							this.noti = null
						}, 4500)
					} finally {
						this.loading = false
						this.sucess = true
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