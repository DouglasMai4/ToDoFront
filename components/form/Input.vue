<template>
	<div class="input-container">
		<label>{{ lb }}</label>
		<input :type="tp" :value="modelValue" @input="updateValue">
		<button v-if="action" @click="buttonFunction">
			<span v-if="lb === 'Senha'" class="pass-icons">
				<font-awesome-icon icon="fa-solid fa-eye" v-show="!showPass" />
				<font-awesome-icon icon="fa-solid fa-eye-slash" v-show="showPass" />
			</span>
			<font-awesome-icon icon="fa-solid fa-plus" v-show="lb === 'Adicionar'" />
		</button>
		<span v-else>
			<font-awesome-icon icon="fa-solid fa-user" v-show="lb === 'Usuário'" />
		</span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				lb: null,
				tp: null,
				showPass: false,
			}
		},
		props: {
			type: String,
			label: String,
			action: Boolean,
			modelValue: '',
		},
		methods: {
			async buttonFunction(e) {
				e.preventDefault()

				if (this.type === 'password' && this.tp === 'password') {
					this.tp = 'text'
					this.showPass = true
				} else if (this.type === 'password') {
					this.tp = 'password'
					this.showPass = false
				} else if (this.label === 'Adicionar') {
					this.$emit('add')
				}
			},
			updateValue(event) {
				this.$emit('update:modelValue', event.target.value)
			}
		},
		mounted() {
			this.lb = this.label
			this.tp = this.type
		}
	}
</script>

<style scoped>
.input-container {
	display: grid;
	grid-template-columns: 1fr 2fr 0.5fr;
	grid-template-rows: 1fr;

	max-width: 100%;
	width: 100%;
}

label,
input,
button,
span {
	color: var(--text-color);

	padding: 5px;

	font-size: 1em;

	border: 1px solid transparent;
}

label {
	border: 1px solid transparent;
	background-color: var(--c-primary);

	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;

	grid-column: 1;
}

input {
	border: 1px solid transparent;
	background-color: var(--bg-color-s);

	outline: none;

	grid-column: 2;
}

span,
button {
	border: 1px solid transparent;
	background-color: var(--c-primary);
	
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;

	grid-column: 3;
}

button {
	background-color: transparent;
	border-color: var(--c-primary);

	color: var(--c-primary);

	transition: all .3s;
}
button:hover {
	cursor: pointer;

	background-color: var(--c-primary-t);

	color: var(--text-color);
}
button * {
	background-color: transparent;
}

@media screen and (max-width:  600px) {
	.input-container {
		grid-template-columns: 1fr 0.25fr;
		grid-template-rows: 1fr 1fr;
	}

	label {
		border-radius: 0;
		border-top-left-radius: 10px;

		grid-column: 1;
		grid-row: 1;
	}

	button,
	span {
		border-radius: 0;
		border-top-right-radius: 10px;

		grid-column: 2;
		grid-row: 1;
	}

	input {
		text-align: center;

		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;

		grid-column: 1 / 3;
		grid-row: 2;
	}
}
</style>