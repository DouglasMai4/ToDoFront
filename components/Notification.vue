<template>
	<div class="notification">
		<p>{{ msg }}</p>
		<span class="progress"></span>
	</div>
</template>

<script lang="ts">
	export default {
		props: {
			msg: String
		}
	}
</script>

<style scoped>
	.notification {
		display: inline-block;

		top: 10px;
		position: fixed;

		max-width: 500px;
		padding: 20px 15px;
		margin-right: 10px;

		font-size: 1.3em;

		border-radius: 4px;

		background-color: var(--bg-color-t);
		backdrop-filter: blur(10px);
		color: var(--text-color);

		opacity: 0;
		visibility: hidden;
		transform: translateY(-30px);

		align-self: flex-end;

		animation: fade 4s linear forwards;

		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);
	}

	.progress {
		left: 5px;
		bottom: 5px;
		position: absolute;

		width: 0;
		height: 3px;

		background-image: var(--gradient);

		border-radius: 4px;

		animation: progress 3s .25s linear forwards;
	}

	@keyframes fade {
		5% {
			opacity: 1;
			visibility: visible;
			transform: translateY(0px);
		}
		90% {
			opacity: 1;
			transform: translateY(0px);
		}
		95% {
			opacity: 0;
		}
		100% {
			opacity: 0;
			transform: translateY(-30px);
		}
	}

	@keyframes progress {
		to {
			width: calc(100% - 10px);
		}
	}

	@media screen and (max-width: 600px) {
		.notification {
			width: 100%;
			max-width: calc(100% - 50px);

			text-align: center;

			font-size: 1.2em;

			transform: translateY(-30px);

			align-self: center;
		}

		@keyframes fade {
			5% {
				opacity: 1;
				visibility: visible;
				transform: translateY(0);
			}
			90% {
				opacity: 1;
				transform: translateY(0px);
			}
			95% {
				opacity: 0;
			}
			100% {
				opacity: 0;
				transform: translateY(-30px);
			}
		}
	}
</style>