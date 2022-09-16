<template>
	<div class="item-container">
		<span :class="classSpan">{{ title }}</span>
		<div class="options">
			<Button tp="button" lb="finish" @click="button('finish')" />
			<Button tp="button" lb="del" @click="button('delete')" />
		</div>
	</div>
</template>

<script>
	import Button from '../components/form/Button.vue'

	export default {
		name: 'Item',
		components: {
			Button
		},
		data() {
			return {
				classSpan: null
			}
		},
		props: {
			title: String,
			status: String
		},
		methods: {
			async button(type) {
				if (type === 'finish') {
					this.$emit('btn', 'finish')
				} else {
					this.$emit('btn', 'delete')
				}
			}
		},
		mounted() {
			if (this.status === 'Cadastrado') {
				this.classSpan = 'start'
			} else {
				this.classSpan = 'finish'
			}
		}
	}
</script>

<style scoped>
	.item-container {
		display: flex;
		justify-content: space-between;
		align-items: center;

		padding: 5px;
		border-radius: 10px;

		background-color: var(--bg-color-secondary);
	}

	span {
		font-size: 1.5em;
	}

	.options {
		display: flex;
		gap: 10px;
	}

	.start {
		text-decoration: none;
	}
	.finish {
		text-decoration: line-through;
	}
</style>