<script setup lang="ts">
	useHead({
		title: 'Itens'
	})

  import { useLoginStore } from '~/stores/LoginStore'

  const loginStore = useLoginStore()
</script>

<template>
	<main>
		<div class="container">
			<h1>Bem Vindo <span class="name">{{ loginStore.usr }}</span></h1>
			<formButton label="Sair" type="button" @click="logout" />
		</div>

		<div class="container">
			<formInput
				label="Adicionar"
				type="text"
				:action="true"
				@data="(e) => this.titulo = e"
				@add="addItem(loginStore.usr_id)"
			/>
			<hr />
			<Item
				v-if="itens"
				v-for="item in itens"
				:titulo="item.title"
				:className="item.status"
				@check="updItem(item.status, item._id)"
				@del="delItem(item._id)"
			/>
			<div v-else class="conatiner">
				<h2>Nenhum item adicionado</h2>
			</div>
		</div>
		<Notification v-if="msg" :msg="msg" />
	</main>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				itens: null,
				titulo: null,
				msg: null
			}
		},
		methods: {
			async getItens() {
				const req = await $fetch(`https://todo-b4ck.herokuapp.com/item/list/${this.loginStore.usr_id}`)

				this.itens = req
			},
			async logout() {
				this.loginStore.logout()

				this.$router.push('/login')
			},
			async addItem(id) {
				if (!this.titulo) {
					this.msg = 'O título não pode ficar vazio'

					setTimeout(() => {this.msg = null}, 3750)
				} else {
					try {
						const req = await $fetch('https://todo-b4ck.herokuapp.com/item/add', {
							method: 'POST',
							body: {
								'title': this.titulo,
								'status': 'Cadastrado',
								'user_id': id
							}
						})

						this.msg = 'Item adicionado'

						setTimeout(() => {this.msg = null}, 3750)

						this.getItens()
					} catch (error) {
						this.msg = 'Não foi possível adicionar o item'

						setTimeout(() => {this.msg = null}, 3750)
					}
				}
			},
			async updItem(status, id) {
				if (status === 'Cadastrado') {
					status = 'Finalizado'
				} else {
					status = 'Cadastrado'
				}

				try {
					const req = await $fetch(`https://todo-b4ck.herokuapp.com/item/update/${id}`, {
						method: 'PATCH',
						body: {'status': status}
					})

					this.msg = 'Item atualizado'

					setTimeout(() => {this.msg = null}, 3750)

					this.getItens()
				} catch (error) {
					this.msg = 'Não foi possível atualizar o item'

					setTimeout(() => {this.msg = null}, 3750)
				}
			},
			async delItem(id) {
				try {
					const req = await $fetch(`https://todo-b4ck.herokuapp.com/item/${id}`, {
						method: 'DELETE'
					})

					this.msg = 'Item removido'

					setTimeout(() => {this.msg = null}, 3750)

					this.getItens()
				} catch (error) {
					this.msg = 'Não foi possível remover o item'

					setTimeout(() => {this.msg = null}, 3750)
				}
			}
		},
		mounted() {
			setTimeout(() => {
				if (!this.loginStore.usr) {
					this.$router.push('/login')
				}
			}, 2500)

			this.getItens()
			setInterval(() => this.getItens(), 1000)
		}
	}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;

		min-height: 100vh;
	}

	.container {
		gap: 15px;
	}

	.name {
		color: var(--c-primary);
	}

	hr {
		width: 100%;
		border-radius: 10px;
		border: none;
		height: 1px;
		background-color: var(--c-primary);
	}
</style>