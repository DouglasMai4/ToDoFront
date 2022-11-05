<template>
	<div class="gooey">
		<span class="dot"></span>
		<div class="dots">
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
</template>

<style scoped>
	.gooey {
		display: flex;
		justify-content: center;
		align-items: center;

		padding: 15px;

		background-color: var(--bg-color-t);

		border-radius: 10px;

		filter: contrast(20);
	}

	.gooey .dot {
		width: 20px;
		height: 20px;

		filter: blur(4px);

		background-color: var(--text-color);

		border-radius: 50%;

		transform: translateX(0);

		animation: dot 2.8s infinite;
	}

	.gooey .dots {
		transform: translateX(0);

		animation: dots 2.8s infinite;
	}

	.gooey .dots span {
		display: block;

		float: left;

		width: 20px;
		height: 20px;

		margin-left: 16px;

		filter: blur(4px);

		background-color: var(--text-color);

		border-radius: 50%;
	}

	@keyframes dot {
		50% {
			transform: translateX(105px);
		}
	}

	@keyframes dots {
		50% {
			transform: translateX(-31px);
		}
	}
</style>