<template>
	<div class="input-main">
		<label>{{ label }}</label>
		<div class="input-container">
			<span class="icon">
				<font-awesome-icon v-show="label === 'Email'" icon="fa-solid fa-at" />
				<font-awesome-icon v-show="label === 'Senha'" icon="fa-solid fa-lock" />
				<font-awesome-icon v-show="label === 'Adicionar Item'" icon="fa-solid fa-plus" />
				<font-awesome-icon v-show="label === 'Usuário'" icon="fa-solid fa-user" />
			</span>
			<input
				:type="tp"
				:class="className"
				:placeholder="placeholder"
				:value="modelValue"
				@input="$emit('update:modelValue', $event.target.value)"
			/>
			<button v-if="label === 'Senha'" @click="pass">
				<font-awesome-icon v-show="!showPass" icon="fa-solid fa-eye" />
				<font-awesome-icon v-show="showPass" icon="fa-solid fa-eye-slash" />
			</button>
		</div>
		<span class="msg">
			{{ msg }}
		</span>
	</div>
</template>

<script>
	export default {
		name: 'Input',
		data() {
			return {
				showPass: false,
				tp: this.type,
				className: null,
			}
		},
		props: {
			label: String,
			type: String,
			placeholder: String,
			msg: String,
			modelValue: String
		},
		methods: {
			async pass(e) {
				e.preventDefault()

				if (this.tp === 'password') {
					this.tp = 'text'
					this.showPass = true
				} else {
					this.tp = 'password'
					this.showPass = false
				}
			}
		},
		mounted() {
			if (this.label === 'Adicionar Item') {
				this.className = 'Add'
			}

			if (this.label === 'Email') {
				this.className = 'Email'
			}

			if (this.label === 'Usuário') {
				this.className = 'User'
			}
		},
		emits: ['update:modelValue']
	}
</script>

<style scoped>
	.input-main {
		display: flex;
		flex-direction: column;
	}

	.input-container {
		display: flex;
		flex-direction: row;

		padding: 1px;
		border-radius: 10px;

		background-image: linear-gradient(to right, var(--c-p), var(--c-s));
	}

	span,
	label,
	input,
	button {
		padding: 5px;
		font-size: 1em;
		border: none;
	}

	label {
		text-align: left;
	}

	input,
	.icon,
	button {
		background-color: #202020;
	}

	.icon {
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;

		aspect-ratio: 1 / 1;

		text-align: center;
	}

	input {
		outline: none;

		max-width: 100%;
		width: 100%;
	}
	.Email,
	.Add,
	.User {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;

		max-width: 100%;
		width: 100%;
	}

	button {
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;

		aspect-ratio: 1 / 1;

		transition: all .3s;
	}
	button:hover {
		cursor: pointer;
		color: var(--c-s);
	}

	.msg {
		font-size: 0.7em;

		text-align: center;

		color: var(--c-error);
	}
</style>