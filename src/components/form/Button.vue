<template>
	<button :type="tp" :class="className" >
		{{ label }}
		<font-awesome-icon v-show="lb === 'Entrar'" icon="fa-solid fa-arrow-right-to-bracket" />
		<font-awesome-icon v-show="lb === 'Sair'" icon="fa-solid fa-arrow-right-from-bracket" />
		<font-awesome-icon v-show="lb === 'Registrar'" icon="fa-solid fa-user-plus" />
		<font-awesome-icon v-show="lb === 'finish'" icon="fa-solid fa-check" />
		<font-awesome-icon v-show="lb === 'del'" icon="fa-solid fa-trash" />
	</button>
</template>

<script>
	export default {
		name: 'Button',
		data() {
			return {
				label: null,
				className: null
			}
		},
		props: {
			tp: String,
			lb: String
		},
		mounted() {
			if (this.lb === 'finish' || this.lb === 'del') {
				this.label = null

				this.className = 'btn-square'

				if (this.lb === 'del') {
					this.className = 'btn-square btn-red'
				}
			} else {
				this.label = this.lb
			}
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

	.btn-square {
		width: 35px;
		height: 35px;

		font-size: 0.9em;
	}

	.btn-red {
		border-color: var(--c-error);
		background-color: var(--c-error-tran);
		color: var(--c-text-primary);
	}
	.btn-red:hover {
		background-color: var(--c-error);
	}
</style>