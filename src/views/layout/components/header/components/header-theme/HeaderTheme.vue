<template>
	<i-popover>
		<template #reference>
			<i-svg-icon
				class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
				fillClass="fill-zinc-900"
				name="theme-light"
			></i-svg-icon>
		</template>

		<div class="w-[140px] overflow-hidden">
			<div
				v-for="item in themeArr"
				:key="item.id"
				class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
			>
				<i-svg-icon
					:name="item.icon"
					class="w-1.5 h-1.5 mr-1"
					fillClass="fill-zinc-900"
				></i-svg-icon>
				<span class="text-zinc-800 text-sm">{{ item.name }}</span>
			</div>
		</div>
	</i-popover>
</template>

<script setup>
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants';

// 构建渲染数据源
const themeArr = [
	{
		id: '0',
		type: THEME_LIGHT,
		icon: 'theme-light',
		name: '极简白',
	},
	{
		id: '1',
		type: THEME_DARK,
		icon: 'theme-dark',
		name: '极夜黑',
	},
	{
		id: '2',
		type: THEME_SYSTEM,
		icon: 'theme-system',
		name: '跟随系统',
	},
];
</script>

<style lang="scss" scoped></style>
