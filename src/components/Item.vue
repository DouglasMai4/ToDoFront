<template>
	<div class="item-container">
		<span class="title" :class="finish">
			{{ title }}
		</span>
		<button class="check" @click="update">
			<font-awesome-icon icon="fa-solid fa-check" />
		</button>
		<button class="trash" @click="del">
			<font-awesome-icon icon="fa-solid fa-trash" />
		</button>
	</div>
</template>

<script>
	import { supabase } from '../supabase'

	export default {
		name: 'Item',
		data() {
			return {
				finish: null
			}
		},
		props: {
			title: String,
			finished: Boolean,
			id: Number
		},
		methods: {
			async update() {
				if (this.finished) {
					const { error } = await supabase
					  .from('itens')
					  .update({ finished: false })
					  .eq('id', this.id)
					this.finish = null
				} else {
					const { error } = await supabase
					  .from('itens')
					  .update({ finished: true })
					  .eq('id', this.id)
					this.finish = 'finish'
				}

				this.$emit('getUpdate')
			},
			async del() {
				const { error } = await supabase
				  .from('itens')
				  .delete()
				  .eq('id', this.id)

				this.$emit('getUpdate')
			}
		},
		mounted() {
			if (this.finished === true) {
				this.finish = 'finish'
			}
		}
	}
</script>

<style scoped>
	.item-container {
		display: flex;

		background-image: linear-gradient(to right, var(--c-p), var(--c-s));

		max-width: 100%;
		width: 100%;

		border-radius: 10px;

		padding: 1px;
	}

	.title {
		background-color: var(--bg-color-s);

		color: var(--text-color);

		padding: 5px;

		max-width: 100%;
		width: 100%;

		overflow-x: auto;

		text-align: center;

		border: 1px solid transparent;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
	}

	button {
		border: 1px solid transparent;
		border-radius: 0;
		
		font-size: 1em;

		aspect-ratio: 1 / 1;
		
		padding: 5px;

		transition: all .3s;
	}

	.check {
		background-color: var(--c-sucess);
		color: var(--text-color);
	}
	.check:hover {
		cursor: pointer;
		
		background-color: var(--bg-color-s);

		border-color: var(--c-sucess);
	}

	.trash {
		background-color: var(--c-error);
		color: var(--text-color);

		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.trash:hover {
		cursor: pointer;

		background-color: var(--bg-color-s);

		border-color: var(--c-error);
	}

	.finish {
		text-decoration: line-through;
		text-decoration-color: var(--c-p);
		text-decoration-thickness: 3px;
	}
	@media screen and (max-width: 600px) {
		.title {
			max-width: 250px;
		}
	}
</style>