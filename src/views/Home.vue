<template>
	<main>
		<div class="container">
			<h1>Home</h1>
			<button @click="$router.push('/login')">
				Login
			</button>
		</div>
	</main>
</template>

<script>
	export default {
		name: 'Home',
	}
</script>

<style scoped>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: var(--bg-color-t);
		backdrop-filter: blur(10px);
		border-radius: 10px;
	}
</style>