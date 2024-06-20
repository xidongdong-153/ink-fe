<template>
	<div class="flex-1">
		<i-search v-model="inputValue" @search="onSearch">
			<template #dropdown>
				<div>123</div>
			</template>
		</i-search>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const inputValue = ref('');

const onSearch = (value) => {
	console.log('搜索', value);
};
</script>

<style lang="scss" scoped></style>
