<script setup>
	useHead({
		title: 'Login'
	})

  import { useLoginStore } from '~/stores/LoginStore'

  const loginStore = useLoginStore()
</script>

<template>
	<main>
		<form @submit="login" class="container">
			<h1>Login</h1>

			<formInput
				type="text"
				label="Usuário"
				:action="false"
				v-model="usr"
			/>
			<formInput
				type="password"
				label="Senha"
				:action="true"
				v-model="pass"
			/>

			<formButton label="Entrar" type="submit" />
		</form>
		<Notification v-if="msg" :msg="msg" />
	</main>
</template>

<script>
	export default {
		data() {
			return {
				usr: null,
				pass: null,
				msg: null
			}
		},
		methods: {
			async login(e) {
				e.preventDefault()

				if (!this.usr) {
					this.msg = 'O usuário não pode ficar vazio'

					setTimeout(() => {this.msg = null}, 3750)
				} else if (!this.pass) {
					this.msg = 'A senha não pode ficar vazia'

					setTimeout(() => {this.msg = null}, 3750)
				} else {
					const req = await $fetch('https://todo-b4ck.herokuapp.com/login', {
						method: 'POST',
						body: {
							'username': this.usr,
							'password': this.pass
						}
					})

					if (!req.username) {
						this.msg = 'Usuário ou senha incorreto'

						setTimeout(() => {this.msg = null}, 3750)
					} else {
						this.loginStore.login(req.username, req.id)

						this.$router.push('/itens')
					}
				}
			}
		},
	}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		min-height: 100vh;
	}

	.container {
		gap: 15px;
	}
</style>