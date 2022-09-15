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
				senha: null
			}
		},
		methods: {
			async register(e) {
				e.preventDefault()

				console.log('Register')
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