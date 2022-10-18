<script setup lang="ts">
	definePageMeta({
		middleware: ['auth']
	})
	const client = useSupabaseClient()

	const signOut = async () => {
		const { error } = await client.auth.signOut()
		navigateTo('/login')
	}

	const user = useSupabaseUser()
	onMounted(() => {
		watchEffect(() => {
			if (!user.value) {
				navigateTo('/login')
			}
		})
	})
</script>

<template>
	<main>
		<formButton
			label="Sair"
			type="button"
			btnStyle="outline"
			@click="signOut"
		/>
		<div class="container">
			<h1>Itens</h1>

			<formInput
				type="text"
				label="Adicionar"
				:action="true"
				@addBtn="addItem"
				v-model="title"
			/>

			<hr />

			<div v-for="item in itens" :key="item.id">
				<Item
					:id="item.id"
					:name="item.title"
					:finished="item.finished"
					@update="getItens"
				/>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				itens: null,
				title: null
			}
		},
		methods: {
			async getItens() {
				const req = await $fetch('/api/itens')

				this.itens = req.data
			},
			async addItem() {
				if (this.title) {
					const req = await $fetch('/api/add', {
						method: 'post',
						body: {
							title: this.title
						}
					})

					this.getItens()
				}
			}
		},
		mounted() {
			this.getItens()
		}
	}
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 15px;

		min-height: 100vh;
	}
</style>