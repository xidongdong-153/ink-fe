<template>
	<div
		ref="searchRef"
		class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
	>
		<!-- 搜索图标 -->
		<i-svg-icon
			class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
			color="#707070"
			name="search"
		/>

		<!-- 输入框 -->
		<input
			v-model="inputValue"
			class="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 duration-500 group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300"
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
		></i-svg-icon>

		<!-- 分割线 -->
		<div
			class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
		></div>

		<i-button
			class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full"
			icon="search"
			iconColor="#ffffff"
			@click="onSearch"
			@keyup.enter="onSearch"
		>
		</i-button>

		<!-- 下拉区 -->
		<transition name="slide">
			<div
				v-if="$slots.dropdown"
				v-show="isFocused"
				class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-3xl"
			>
				<slot name="dropdown"></slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
/* eslint-disable no-use-before-define */
import { onClickOutside } from '@vueuse/core';
import { ref, watch } from 'vue';

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

<script>
// 触发搜索（点击或回车）事件
const EMIT_SEARCH = 'search';
// 删除所有文本事件
const EMIT_CLEAR = 'clear';
// 获取焦点事件
const EMIT_FOCUS = 'focus';
// 失去焦点事件
const EMIT_BLUR = 'blur';
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
