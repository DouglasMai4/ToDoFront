<template>
	<button :type="tp" >
		{{ lb }}
		<font-awesome-icon v-show="lb === 'Entrar'" icon="fa-solid fa-arrow-right-to-bracket" />
	</button>
</template>

<script>
	export default {
		name: 'Button',
		props: {
			tp: String,
			lb: String
		}
	}
</script>

<style scoped>
	button {
		padding: 5px;
		font-size: 1.5em;

		border: 1px solid var(--c-primary);
		background-color: transparent;
		color: var(--c-primary-tran);

		border-radius: 10px;

		transition: all .3s;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--c-primary);
		color: var(--c-text-primary);
	}
</style>