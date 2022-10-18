<template>
	<div class="item-container">
		<span :class="class">
			{{ name }}
		</span>
		<div class="options">
			<button class="check" @click="upItem(finished, id)">
				<font-awesome-icon icon="fa-check" />
			</button>
			<button class="delete" @click="delItem(id)">
				<font-awesome-icon icon="fa-trash" />
			</button>
		</div>
	</div>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				class: null
			}
		},
		props: {
			name: String,
			finished: Boolean,
			id: Number
		},
		methods: {
			async upItem(finish, id) {
				if (!finish) {
					const req = await $fetch('/api/update', {
						method: 'post',
						body: {
							finished: true,
							id: id
						}
					})
				} else {
					const req = await $fetch('/api/update', {
						method: 'post',
						body: {
							finished: false,
							id: id
						}
					})
				}

				this.$emit('update')
			},
			async delItem(id) {
				const req = await $fetch('/api/delete', {
					method: 'post',
					body: {
						id: id
					}
				})

				this.$emit('update')
			}
		},
		mounted() {
			if (this.finished === true) {
				this.class = 'finished'
			} else {
				this.class = 'started'
			}
		}
	}
</script>

<style scoped>
	.item-container {
		display: grid;
		grid-template-columns: 1fr 100px;
		grid-template-rows: 1fr;
		gap: 0;
	}

	span {
		padding: 5px;
		margin-block: auto;
		
		font-size: 1.2em;

		grid-column: 1;

		border: 1px solid transparent;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;

		text-align: left;

		overflow-x: auto;

		background-color: var(--bg-color-s);
	}

	.options {
		grid-column: 2;
		grid-row: 1;
	}

	button {
		width: 50%;

		padding: 5px;

		border: none;

		background-color: transparent;

		color: var(--text-color);

		font-size: 1.2em;

		transition: all .3s;
	}
	button:hover {
		cursor: pointer;
	}

	.check {
		border: 1px solid var(--c-secondary);
	}
	.check:hover {
		background-color: var(--c-secondary-t);
		color: var(--bg-color);
	}

	.delete {
		border: 1px solid red;

		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.delete:hover {
		background-color: red;
	}

	.finished {
		text-decoration: line-through;
		text-decoration-color: var(--c-primary);
	}

	.started {
		text-decoration: none;
	}
</style>