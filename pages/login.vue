<script setup lang="ts">
	definePageMeta({
		middleware: ['auth']
	})

	const email = ref('')
	const password = ref('')
	const isSignUp = ref(false)
	const client = useSupabaseClient()

	const signUp = async () => {
		const { user, error } = await client.auth.signUp({
			email: email.value,
			password: password.value,
		})
	}

	const login = async () => {
		const { user, error } = await client.auth.signIn({
			email: email.value,
			password: password.value,
		})
	}

	const user = useSupabaseUser()
	onMounted(() => {
		watchEffect(() => {
			if (user.value) {
				navigateTo('/itens')
			}
		})
	})
</script>

<template>
	<main>
		<div class="container">
			<form @submit.prevent="() => (isSignUp ? signUp() : login())">
				<h1>Login</h1>
				<hr />
				
				<formInput
					type="text"
					label="Email"
					:action="false"
					v-model="email"
				/>

				<formInput
					type="password"
					label="Senha"
					:action="true"
					v-model="password"
				/>

				<formButton label="Entrar" type="submit" :disabled="btnDisabled" btnStyle="text" />
			</form>
		</div>
		<Notification v-if="msg" :msg="msg" />
	</main>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				msg: null,
				btnDisabled: true
			}
		},
		updated() {
			if (this.email && this.password) {
				this.btnDisabled = false
			} else {
				this.btnDisabled = true
			}
		}
	}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		min-height: 100vh;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	@media screen and (max-width: 600px) {
		form {
			width: 300px;
		}
	}
</style>