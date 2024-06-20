<template>
	<div class="w-full h-header bg-white border-b border-b-zinc-200 px-2 py-1">
		<div class="flex items-center space-x-1">
			<img
				alt="首页图标"
				class="h-4 cursor-pointer mr-2"
				src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
				@click="onToHome"
			/>
			<header-search />
			<header-theme />
			<header-my />
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import HeaderMy from '@/views/layout/components/header/components/header-my/HeaderMy.vue';
import HeaderSearch from '@/views/layout/components/header/components/header-search/HeaderSearch.vue';
import HeaderTheme from '@/views/layout/components/header/components/header-theme/HeaderTheme.vue';

const router = useRouter();
const onToHome = () => {
	router.push('/');
};
</script>

<style lang="scss" scoped></style>
