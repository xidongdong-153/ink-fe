<template>
	<InkMobile v-if="isMobileTerminal" :categories />
	<InkPC v-else />
</template>

<script setup>
import { onMounted, ref } from 'vue';

import { getCategory } from '@/api/category';
import { ALL_CATEGORY_ITEM } from '@/constants';
import { isMobileTerminal } from '@/utils/flexible';

import InkMobile from './mobile/InkMobile.vue';
import InkPC from './pc/InkPC.vue';

const categories = ref([]);

const getCategoryData = async () => {
	const { categorys } = await getCategory();
	categories.value = categories.value.concat(...[ALL_CATEGORY_ITEM], categorys);
};

onMounted(() => {
	getCategoryData();
});
</script>
