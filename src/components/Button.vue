<template>
	<div class="button-container">
		<button
			:type="type"
			:disabled="disabled"
		>
			{{ lb }}
			<font-awesome-icon v-if="label === 'Entrar'" icon="fa-solid fa-arrow-right-to-bracket" />
			<font-awesome-icon v-if="label === 'Registrar'" icon="fa-solid fa-user-plus" />
			<font-awesome-icon v-if="disabled" icon="fa-solid fa-clock" />
		</button>
	</div>
</template>

<script>
	export default {
		name: 'Button',
		data() {
			return {
				lb: this.label
			}
		},
		props: {
			type: String,
			label: String,
			disabled: String
		}
	}
</script>

<style scoped>
	button {
	  font-size: 1.5em;

	  background-image: linear-gradient(to right, var(--c-p), var(--c-s));

	  border-radius: 10px;
	  border: 1px solid transparent;

	  width: 100%;

	  transition: all .3s;
	}
	button:hover {
	  cursor: pointer;

	  border-color: var(--c-p);

	  background: none;
	}
</style>