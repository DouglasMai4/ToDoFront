<template>
	<div class="input-container">
		<input :type="type" v-model="data">
		<label>{{ label }}</label>
		<span v-show="!action">
			<font-awesome-icon v-show="lb === 'Usuario'" icon="fa-solid fa-user" />
			<font-awesome-icon v-show="lb != 'Usuario'" icon="fa-solid fa-pen" />
		</span>
		<button v-show="action" @click="buttonFunction">
			<span class="password-icons">
				<font-awesome-icon v-show="!showPass" icon="fa-solid fa-eye" />
				<font-awesome-icon v-show="showPass" icon="fa-solid fa-eye-slash" />
			</span>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'Input',
		data() {
			return {
				type: null,
				label: null,
				action: false,
				showPass: false,

				data: null
			}
		},
		props: {
			tp: String,
			lb: String
		},
		methods: {
			async buttonFunction(e) {
				e.preventDefault()

				if (this.showPass === false && this.type === 'password' && this.lb === 'Senha') {
					this.type = 'text'
					this.showPass = true
				} else {
					this.type = 'password'
					this.showPass = false
				}
			}
		},
		mounted() {
			this.type = this.tp
			this.label = this.lb

			if (this.tp === 'password' || this.lb === 'Senha') {
				this.action = true
			}
		},
		updated() {
			this.$emit('data', this.data)
		}
	}
</script>

<style scoped>
	.input-container {
		display: grid;
		grid-template-columns: 0.7fr 2fr 0.5fr;
		grid-template-rows: 1fr;
	}

	input {
		background-color: var(--bg-color-secondary);
		border: 1px solid transparent;
		padding: 5px;
		font-size: 1em;
		color: var(--c-text-primary);

		grid-column: 2;
		grid-row: 1;
	}
	input:focus {
		outline: none;
	}

	label {
		padding: 5px;
		border: 1px solid transparent;

		background-color: var(--c-primary);
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;

		grid-column: 1;
		grid-row: 1;
	}

	span,
	button {
		padding: 5px;
		border: 1px solid transparent;

		background-color: var(--c-primary);
		color: var(--c-text-primary);
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;

		font-size: 1em;

		grid-column: 3;
		grid-row: 1;
	}

	button {
		border-color: var(--c-primary);
		background-color: var(--c-primary-tran);

		transition: all .5s;
	}
	button span {
		background-color: transparent;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--c-primary);
	}
</style>