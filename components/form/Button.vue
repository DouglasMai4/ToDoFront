<template>
	<button :type="type" :class="btnStyle">
		{{ lb }}
	</button>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				lb: this.label
			}
		},
		props: {
			label: String,
			btnStyle: String,
			type: String
		}
	}
</script>

<style scoped>
	button {
		padding: 5px;
		font-size: 1.5em;

		text-align: center;

		border: 1px solid transparent;

		border-radius: 10px;

		transition: .5s all;
	}
	button:hover {
		cursor: pointer;
	}

	.fill {
		background-color: var(--c-primary);
		color: var(--text-color);
	}
	.fill:hover {
		border-color: var(--c-primary);
		background-color: var(--c-primary-t);
	}

	.outline {
		background-color: transparent;
		color: var(--c-primary);
		border-color: var(--c-primary);
	}
	.outline:hover {
		background-color: var(--c-primary);
		color: var(--c-text-color);
	}

	.text {
		background-color: transparent;
		color: var(--c-primary);
	}
	.text:hover {
		background-color: var(--c-primary-t);
		color: var(--text-color);
	}

	.square {
		width: 45px;
		height: 45px;
	}

	button:disabled {
		cursor: auto;
		color: var(--text-color);
		background-color: var(--bg-color-s);
	}
	button:disabled:hover {
		background-color: var(--bg-color-t);
	}
</style>