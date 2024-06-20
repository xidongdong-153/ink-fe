<template>
	<InkMobile v-if="isMobileTerminal" />
	<InkPC v-else />
</template>

<script setup>
import { useStore } from 'vuex';

import { isMobileTerminal } from '@/utils/flexible';

import InkMobile from '@/views/main/components/navigation/mobile/InkMobile.vue';
import InkPC from '@/views/main/components/navigation/pc/InkPC.vue';

const store = useStore();

store.dispatch('category/fetchCategories');
</script>
