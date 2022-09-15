<template>
	<div class="notification">
		<p>{{ msg }}</p>
		<span class="progress"></span>
	</div>
</template>

<script>
	export default {
		name: 'Message',
		props: {
			msg: String
		}
	}
</script>

<style scoped>
	.notification {
		position: fixed;
		display: inline-block;
		max-width: 300px;
		padding: 20px 15px;
		border-radius: 4px;
		background-color: var(--bg-color-tran);
		backdrop-filter: blur(5px);
		color: var(--c-text-primary);
		box-shadow: 0 1px 10px rgba(0, 0, 0, .5);
		transform: translateY(-30px);
		opacity: 0;
		visibility: hidden;
		animation: fade 4s linear forwards;
		align-self: flex-end;
		top: 10px;
		right: 10px;
	}

	.progress {
		position: absolute;
		left: 5px;
		bottom: 5px;
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
</style>