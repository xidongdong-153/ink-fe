<template>
	<div class="py-2 h-full flex flex-col">
		<h2 class="text-xl text-zinc-900 font-bold mb-2 px-1 dark:text-zinc-200">
			所有分类
		</h2>
		<ul class="flex flex-col overflow-y-scroll">
			<li
				v-for="(item, index) in store.getters.categories"
				:key="item.id"
				class="text-lg text-zinc-900 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:text-zinc-300 active:dark:bg-zinc-900"
				@click="$emit('on-selected', index)"
			>
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
</script>

<style lang="scss" scoped></style>
