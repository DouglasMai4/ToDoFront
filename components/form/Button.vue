<template>
	<button :class="className" :type="type">
		{{ lb }}
		<font-awesome-icon v-show="label === 'Entrar'" icon="fa-solid fa-arrow-right-to-bracket" />
		<font-awesome-icon v-show="label === 'Sair'" icon="fa-solid fa-arrow-right-from-bracket" />
		<font-awesome-icon v-show="label === 'del'" icon="fa-solid fa-trash" />
		<font-awesome-icon v-show="label === 'check'" icon="fa-solid fa-check" />
	</button>
</template>

<script>
	export default {
		data() {
			return {
				lb: null,
				className: null
			}
		},
		props: {
			label: String,
			type: String
		},
		mounted() {
			if (this.label === 'check') {
				this.lb = null
				this.className = 'square'
			} else if (this.label === 'del') {
				this.lb = null
				this.className = 'square red'
			} else {
				this.lb = this.label
			}
		}
	}
</script>

<style scoped>
button {
	background-color: transparent;

	font-size: 1.5em;
	padding: 5px;

	border-radius: 10px;
	color: var(--c-primary);
	border: 1px solid var(--c-primary);

	max-width: 100%;
	width: 100%;

	transition: all .3s;
}
button:hover {
	cursor: pointer;
	background-color: var(--c-primary-t);
	color: var(--text-color);
}

.square {
	width: 45px;
	height: 45px;
}

.red {
	border-color: var(--c-error);
	color: var(--c-error);
}
.red:hover {
	background-color: var(--c-error-t);
}
</style>