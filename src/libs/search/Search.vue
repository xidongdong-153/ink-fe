<template>
	<div
		ref="searchRef"
		class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
	>
		<!-- 搜索图标 -->
		<i-svg-icon
			class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
			fillClass="fill-zinc-900 dark:fill-zinc-300"
			name="search"
		/>

		<!-- 输入框 -->
		<input
			v-model="inputValue"
			class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
			placeholder="搜索"
			type="text"
			@blur="onBlur"
			@focus="onFocus"
		/>

		<!-- 删除按钮 -->
		<i-svg-icon
			v-show="inputValue"
			class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
			name="input-delete"
			@click="inputValue = ''"
		/>

		<!-- 分割线 -->
		<div
			class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
		></div>

		<i-button
			class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full"
			icon="search"
			iconClass="fill-zinc-100"
			@click="onSearch"
			@keyup.enter="onSearch"
		/>

		<!-- 下拉区 -->
		<transition name="slide">
			<div
				v-if="$slots.dropdown"
				v-show="isFocused"
				class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl"
			>
				<slot name="dropdown"></slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';

import {
	EMIT_BLUR,
	EMIT_CLEAR,
	EMIT_FOCUS,
	EMIT_SEARCH,
} from '@/libs/search/option';

const [inputValue] = defineModel();

const emits = defineEmits([EMIT_SEARCH, EMIT_CLEAR, EMIT_FOCUS, EMIT_BLUR]);

watch(inputValue, () => {
	emits(inputValue.value);
});

const onSearch = () => {
	if (inputValue.value) {
		emits(EMIT_SEARCH, inputValue.value);
	}
};

const isFocused = ref(false);

const onFocus = () => {
	isFocused.value = true;
	emits(EMIT_FOCUS);
};

const onBlur = () => {
	emits(EMIT_BLUR);
};

const searchRef = ref(null);

onClickOutside(searchRef, () => {
	isFocused.value = false;
	return null;
});
</script>

<style lang="scss" scoped>
.slide-enter-active {
	transition: all 0.5s;
}

.slide-leave-active {
	transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateY(40px);
	opacity: 0;
}
</style>
