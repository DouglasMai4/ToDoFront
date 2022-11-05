<template>
	<main>
		<div class="container">
			<h1>Conta</h1>

			<Button
				type="button"
				label="Voltar"
				:disabled="false"
				@click="$router.back()"
			/>

 			<hr />

			<Input
				label="Usuário"
				type="text"
				:placeholder="username"
				:msg="msgUser"
				v-model="user"
			/>

			<Input
				label="Email"
				type="email"
				:placeholder="email"
				msg=""
				v-model="newEmail"
			/>

			<Input
				label="Senha"
				type="password"
				placeholder="********"
				msg=""
				v-model="pass"
			/>

			<hr />

			<div class="button-container">
				<Button
					type="button"
					label="Atualizar"
					:disabled="false"
					@click="updateUser"
				/>

				<Button
					type="button"
					label="Sair"
					:disabled="false"
					@click="logoutUser"
				/>
			</div>
		</div>
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
		name: 'Conta',
		data() {
			return {
				email: null,
				newEmail: null,
				user: null,
				pass: null,
				msgUser: null,
				msg: null,
			}
		},
		components: {
			Input,
			Button,
			Notification
		},
		methods: {
			async getUser() {
				try {
					const { data, error } = await supabase.auth.getSession()
					if (!error) {
						this.email = data.session.user.email
					}
				} catch (error) {
					console.log('Error: ', error)
				}
			},
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
			async updateUser() {
				if (!this.user && !this.newEmail && !this.pass) {
					this.msg = 'Nada para alterar!'

					setTimeout(() => {
						this.msg = null
					}, 4000)
				} else {
					if (!this.user) {
						this.user = this.username
					} else {
						const user = this.getUsername()

						if (user) return
					}

					if (!this.newEmail) {
						this.newEmail = this.email
					}

					if (!this.pass) {
						const { data, error } = await supabase.auth.updateUser({
							email: this.newEmail,
							data: {
								username: this.user
							}
						})
						if (!error) {
							this.msg = 'Dados atualizados!'

							setTimeout(() => {
								this.msg = null
							}, 4000)
						} else {
							this.msg = 'Não foi possível atualizar os dados!'

							setTimeout(() => {
								this.msg = null
							}, 4000)
						}
					} else {
						const { data, error } = await supabase.auth.updateUser({
							email: this.newEmail,
							password: this.pass,
							data: {
								username: this.user
							}
						})
						if (!error) {
							this.msg = 'Dados atualizados!'

							setTimeout(() => {
								this.msg = null
							}, 4000)
						} else {
							this.msg = 'Não foi possível atualizar os dados!'

							setTimeout(() => {
								this.msg = null
							}, 4000)
						}
					}
				}
			},
			async logoutUser() {
				const { error } = await supabase.auth.signOut()
				if (error) {
					this.msg = 'Não foi possível fazer logout!'

					setTimeout(() => {
						this.msg = null
					}, 4000)
					return
				}
				this.$router.push('/login')
			}
		},
		mounted() {
			this.getUser()
		}
	}
</script>

<style scoped>
	h1 {
		text-align: center;
	}

	.button-container {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>