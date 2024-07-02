<template>
	<div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
		<InkNavigation />

		<div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
			<InkList />
		</div>
	</div>
</template>

<script setup>
import InkList from './components/list/InkList.vue';
import InkNavigation from './components/navigation/InkNavigation.vue';
</script>
