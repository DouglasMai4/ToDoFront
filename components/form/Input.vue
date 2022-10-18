<template>
	<div class="input-container">
		<input
			:type="tp"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
		<label>{{ lb }}</label>
		<button v-if="action" @click="btn">
			<span v-show="lb === 'Senha'" class="pass-icons">
				<font-awesome-icon v-show="!showPass" icon="fa-eye" />
				<font-awesome-icon v-show="showPass" icon="fa-eye-slash" />
			</span>
			<span v-show="lb === 'Adicionar'">
				<font-awesome-icon icon="fa-plus" />
			</span>
		</button>
		<span v-else>
			<font-awesome-icon v-show="lb === 'Usuário'" icon="fa-user" />
		</span>
	</div>
</template>

<script lang="ts">
	export default {
		data() {
			return {
				tp: null,
				lb: null,
				showPass: false,
				data: null
			}
		},
		props: {
			type: String,
			label: String,
			action: Boolean,
			modelValue: String
		},
		methods: {
			async btn(e) {
				e.preventDefault()

				if (this.label === 'Senha') {
					if (this.tp === 'password') {
						this.tp = 'text'
						this.showPass = true
					} else {
						this.tp = 'password'
						this.showPass = false
					}
				}

				if (this.label === 'Adicionar') {
					this.$emit('addBtn')
				}
			}
		},
		mounted() {
			this.tp = this.type
			this.lb = this.label
		},
		emits: ['update:modelValue']
	}
</script>

<style scoped>
	.input-container {
		display: grid;
		grid-template-columns: 1fr 2fr 45px;
		grid-template-rows: 1fr;
	}

	label {
		padding: 5px;
		font-size: 1em;
		text-align: center;

		background-color: var(--c-primary);

		border-top-left-radius: 10px;
		border: 1px solid transparent;
		border-bottom-left-radius: 10px;

		grid-column: 1;
		grid-row: 1;
	}

	input {
		padding: 5px;
		font-size: 1em;

		border: 1px solid transparent;

		background-color: var(--bg-color-s);
		color: var(--text-color);

		outline: none;

		grid-column: 2;
		grid-row: 1;

	}

	span,
	button {
		padding: 5px;
		font-size: 1em;
		text-align: center;

		border: 1px solid transparent;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;

		background-color: var(--c-primary);
		color: var(--text-color);
	}

	button {
		border-color: var(--c-primary);
		background-color: transparent;

		transition: all .3s;
	}
	button:hover {
		cursor: pointer;
		background-color: var(--c-primary-t);
	}
	button * {
		background-color: transparent;
	}

	@media screen and (max-width: 600px) {
		.input-container {
			grid-template-columns: 1fr 45px;
			grid-template-rows: 1fr 1fr;

			column-gap: 1px;
		}

		label {
			border-radius: 0;
			border-top-left-radius: 10px;

			grid-column: 1;
			grid-row: 1;
		}

		span,
		button {
			border-radius: 0;
			border-top-right-radius: 10px;

			grid-column: 2;
			grid-row: 1;
		}

		input {
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;

			text-align: center;

			grid-column: 1 / end;
			grid-row: 2;
		}
	}
</style>