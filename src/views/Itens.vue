<template>
	<main>
		<Loading v-if="loading" />

		<div v-else class="container">
			<h1>
				Bem-Vindo
				<RouterLink class="user" to="/conta">
					{{ username }}
				</RouterLink>
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
		<!-- <Notification
			noti="Você pode clicar no username para ver opções sobre a conta"
		/> -->
	</main>
</template>

<script>
	import { supabase } from '../supabase'

	import Item from '../components/Item.vue'
	import Input from '../components/Input.vue'
	import Button from '../components/Button.vue'
	import Loading from '../components/Loading.vue'
	import Notification from '../components/Notification.vue'

	export default {
		name: 'Itens',
		data() {
			return {
				itens: null,
				title: null,
				loading: true,
				msg: null
			}
		},
		components: {
			Item,
			Input,
			Button,
			Notification,
			Loading
		},
		methods: {
			async getItens() {
				try {
					this.loading = true

					const { data, error } = await supabase
					  .from('itens')
					  .select()
					  .eq('user', this.userId)
					if (!error) {
						this.itens = data
						if (this.itens.length < 1) {
							this.itens = null
						}
					}
				} finally {
					this.loading = false
				}
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
					  	user: this.userId,
					  	title: this.title,
					  	finished: false
					  })

					this.getItens()
					this.msg = null
				} catch (error) {
					this.msg = error
				}
			}
		},
		mounted() {
			this.getItens()
		}
	}
</script>

<style scoped>
	.container {
		text-align: center;
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
		bottom: 10px;
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