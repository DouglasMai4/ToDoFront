<template>
	<div class="button-container">
		<button
			:type="type"
			:class="className"
			:disabled="disabled"
		>
			<span v-if="!disabled && !sucess">
				{{ lb }}
			</span>

			<font-awesome-icon
				v-if="label === 'Entrar' && !disabled && !sucess"
				icon="fa-solid fa-arrow-right-to-bracket"
			/>
			<font-awesome-icon
				v-if="label === 'Adicionar' && !disabled && !sucess"
				icon="fa-solid fa-plus"
			/>
			<font-awesome-icon
				v-if="label === 'Registrar' && !disabled && !sucess"
				icon="fa-solid fa-user-plus"
			/>
			<font-awesome-icon
				v-if="label === 'Atualizar' && !disabled && !sucess"
				icon="fa-solid fa-repeat"
			/>
			<font-awesome-icon
				v-if="label === 'Sair' && !disabled && !sucess"
				icon="fa-solid fa-arrow-right-from-bracket"
			/>
			<font-awesome-icon
				v-if="label === 'Voltar' && !disabled && !sucess"
				icon="fa-solid fa-arrow-left"
			/>
			<font-awesome-icon
				v-if="disabled"
				icon="fa-solid fa-circle-notch"
				class="loading"
			/>
			<font-awesome-icon
				v-if="sucess"
				icon="fa-solid fa-check"
			/>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'Button',
		data() {
			return {
				lb: this.label,
				className: this.label
			}
		},
		props: {
			type: String,
			label: String,
			disabled: Boolean,
			sucess: Boolean
		},
		mounted() {
			if (this.sucess === true) {
				this.className = 'sucess'
			}
		}
	}
</script>

<style scoped>
	button {
	  font-size: 1.5em;

	  background-color: transparent;
	  background-image: linear-gradient(to right, var(--c-p), var(--c-s));

	  color: var(--text-color);

	  border-radius: 10px;
	  border: 1px solid transparent;

	  width: 100%;

	  transition: all .3s;
	}
	button:hover {
	  cursor: pointer;

	  border-color: var(--c-p);
	  color: var(--c-p);

	  background: none;
	}

	button span {
		margin-inline: 10px;
	}

	.Sair {
		background-image: linear-gradient(to right, #E32C58, #FFB199);
	}
	.Sair:hover {
		border-color: #E32C58;
		color: #E32C58;
	}

	.Atualizar {
		background-image: linear-gradient(to right, #4B6CB7, #182848);
	}
	.Atualizar:hover {
		border-color: #4B6CB7;
		color: #4B6CB7;
	}

	.loading {
		animation: spin 2s infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	button:disabled,
	.sucess {
		background-image: linear-gradient(to right, #E32C58, #FFB199);

		border-radius: 50%;

		font-size: 1.2em;

		width: 45px;
		height: 45px;
	}
	button:disabled:hover {
		cursor: auto;
		background-image: none;

		color: #E32C58;
		border-color: #E32C58;
	}

	.sucess {
		background-image: linear-gradient(to right, #06BEB6, #48B1BF);
	}
	.sucess:hover {
		background-image: none;

		color: #06BEB6;
		border-color: #06BEB6;
	}
</style>