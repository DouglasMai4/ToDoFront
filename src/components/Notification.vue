<template>
	<div class="notification">
		<p>
			{{ noti }}
		</p>
		<span class="progress"></span>
	</div>
</template>

<script>
	export default {
		name: 'Notification',
		props: {
			noti: String
		}
	}
</script>

<style scoped>
	.notification {
		position: fixed;

		bottom: 10px;
		right: 10px;

		display: inline-block;

		max-width: 500px;

		padding: 20px 15px;

		border-radius: 10px;

		background-color: var(--bg-color-t);
		backdrop-filter: blur(10px);

		color: var(--text-color);

		transform: translateY(30px);

		opacity: 0;
		visibility: hidden;

		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

		animation: fade 4s linear forwards;
	}

	.progress {
		position: absolute;

		left: 5px;
		bottom: 5px;
		
		width: 0;
		height: 3px;

		background-image: linear-gradient(to right, var(--c-p), var(--c-s));

		border-radius: 10px;

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
			transform: translateY(30px);
		}
	}

	@keyframes progress {
		to {
			width: calc(100% - 10px);
		}
	}

	@media screen and (max-width: 600px) {
		.notification {
			max-width: calc(100% - 20px);
			width: 100%;

			text-align: center;
		}
	}
</style>