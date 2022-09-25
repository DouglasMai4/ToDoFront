<script setup lang="ts">
	useHead({
		title: 'Home'
	})
</script>

<template>
	<main>
		<div class="container">
			<h1>Home</h1>
			<p>Para fazer login <NuxtLink to="/login">clique aqui</NuxtLink> !</p>
		</div>
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	min-height: 100vh;
}
</style>