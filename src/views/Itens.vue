<template>
	<main>
		<div class="container">
			<h1>
				Bem-Vindo
				<span
					class="user"
					@click="logout"
				>
					{{ username }}
				</span>
			</h1>

			<div class="add-container">
				<Input
					label="Adicionar Item"
					type="text"
					placeholder="Terminar Tarefa"
					:msg="msg"
					v-model="title"
				/>

				<Button
					type="button"
				  	label="Adicionar"
				  	:disabled="false"
				  	@click="addItens"
				/>
			</div>
			
			<hr />

			<div class="itens-container">
				<Item
					v-if="itens"
					v-for="item in itens"
					:key="item.id"
					:id="item.id"
					:title="item.title"
					:finished="item.finished"
					@getUpdate="getItens"
				/>

				<div v-else class="null">
					<h2>Nenhum item cadastrado</h2>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
	import { useLoginStore } from '../stores/Login'
	import { supabase } from '../supabase'

	import Item from '../components/Item.vue'
	import Input from '../components/Input.vue'
	import Button from '../components/Button.vue'

	export default {
		name: 'Itens',
		data() {
			return {
				username: null,
				itens: null,
				title: null,
				msg: null
			}
		},
		components: {
			Item,
			Input,
			Button
		},
		setup() {
			const loginStore = useLoginStore()

			return { loginStore }
		},
		methods: {
			async getItens() {
				const { data, error } = await supabase
				  .from('itens')
				  .select()
				  .eq('user', this.loginStore.id)

				const json = JSON.stringify(data)

				this.itens = JSON.parse(json)
			},
			async addItens() {
				if (!this.title) {
					this.msg = 'O título é obrigatório!'
					return
				}

				try {
					const { error } = await supabase
					  .from('itens')
					  .insert({
					  	user: this.loginStore.id,
					  	title: this.title,
					  	finished: false
					  })

					this.getItens()
					this.msg = null
				} catch (error) {
					this.msg = error
				}
			},
			async logout() {
				await this.loginStore.logout()
				this.$router.push('/login')
			}
		},
		mounted() {
			if (!this.loginStore.user) {
				this.$router.push('/login')
			}

			this.username = this.loginStore.user
			this.getItens()
		}
	}
</script>

<style scoped>
	.container {
		text-align: center;

		padding: 25px;

		border-radius: 10px;

		background-color: var(--bg-color-t);
		backdrop-filter: blur(10px);

		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	}

	.user {
		display: inline-block;

		position: relative;

		color: var(--c-p);
	}
	.user:hover {
		cursor: pointer;
	}

	.user::after {
		content: '';

		left: 0;
		bottom: 13px;
		position: absolute;

		width: 100%;
		height: 3px;

		border-radius: 10px;
		
		background-image: linear-gradient(to right, var(--c-p), var(--c-s));

		transform: scaleX(0);
		transform-origin: right;

		transition: transform .5s;
	}
	.user:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.itens-container {
		display: flex;
		flex-direction: column;
		gap: 15px;

		max-width: 100%;
		width: 100%;
	}

	@media screen and (max-width: 600px) {
		.container {
			margin: 10px;
		}
	}
</style>