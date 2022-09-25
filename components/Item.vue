<template>
	<div class="item-container">
		<span :class="className">{{ titulo }}</span>
		<div class="item-buttons">
			<formButton
				label="check"
				type="button"
				@click="() => this.$emit('check')"
			/>
			<formButton
				label="del"
				type="button"
				@click="() => this.$emit('del')"
			/>
		</div>
	</div>
</template>

<script lang="ts">
	export default {
		props: {
			titulo: String,
			className: String
		}
	}
</script>

<style scoped>
	.item-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;

		background-color: var(--bg-color-s);
		padding: 15px;
		border-radius: 10px;

		max-width: 100%;
		width: 100%;
	}

	span {
		max-width: 200px;
		overflow-x: scroll;
		font-size: 1.2em;
	}

	.Cadastrado {
		text-decoration: none;
	}

	.Finalizado {
		text-decoration: line-through;
		text-decoration-color: var(--c-primary);
		text-decoration-thickness: 3px;
	}

	.item-buttons {
		display: flex;
		gap: 15px;
	}
</style>