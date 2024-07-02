<template>
	<div class="h-screen fixed top-0 left-0 w-screen">
		<RouterView />
	</div>
</template>

<script setup>
import { useTheme } from '@/utils/theme';

useTheme();
</script>

<style scoped></style>
