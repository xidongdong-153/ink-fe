<template>
	<div class="sticky top-0 left-0 z-10 bg-white dark:bg-zinc-900">
		<ul
			ref="ulRef"
			class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
		>
			<li
				ref="sliderRef"
				:class="{
					'px-1.5 py-0.5': store.getters.categories.length > 0,
				}"
				:style="sliderStyle"
				class="absolute h-[24px] shrink-0 z-10 bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
			></li>
			<!-- 菜单 -->
			<li
				class="fixed top-0 right-[-1px] h-4 p-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc z-20"
				@click="isOpenPopup = !isOpenPopup"
			>
				<i-svg-icon class="w-1.5 h-1.5" name="hamburger" />
			</li>

			<li
				v-for="(category, index) of store.getters.categories"
				:key="category.id"
				:ref="setItemRef"
				:class="{
					'text-zinc-100': currentCategoryIndex === index,
				}"
				class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
				@click="onItemClick(index)"
			>
				{{ category.name }}
			</li>
		</ul>

		<i-popup v-model="isOpenPopup">
			<InkMenu
				:categories="store.getters.categories"
				@on-selected="onItemClick"
			/>
		</i-popup>
	</div>
</template>

<script setup>
import { useScroll } from '@vueuse/core';
import { nextTick, onBeforeUpdate, ref, watch } from 'vue';

import { useStore } from 'vuex';

import InkMenu from '@/views/main/components/menu/InkMenu.vue';

const store = useStore();

const isOpenPopup = ref(false);

const sliderRef = ref(null);

const sliderStyle = ref({
	transform: 'translateX(0px)',
	width: '0',
});

const currentCategoryIndex = ref(0);

let itemRefs = [];
const setItemRef = (el) => {
	if (el) {
		itemRefs.push(el);
	}
};

onBeforeUpdate(() => {
	itemRefs = [];
});

// 获取 ul 元素，以计算偏移位置
const ulRef = ref(null);
const { x: ulScrollLeft } = useScroll(ulRef);

watch(currentCategoryIndex, (val) => {
	// 获取选中元素的 left、width
	const { left, width } = itemRefs[val].getBoundingClientRect();

	const computedStyle = window.getComputedStyle(ulRef.value);
	const paddingLeft = parseFloat(
		computedStyle.getPropertyValue('padding-left'),
	);

	// 为 sliderStyle 设置属性
	sliderStyle.value = {
		// ul 横向滚动位置 + 当前元素的 left 偏移量 - ul的padding值
		transform: `translateX(${ulScrollLeft.value + left - paddingLeft}px)`,
		width: `${width}px`,
	};

	if (isOpenPopup.value) {
		isOpenPopup.value = false;
		ulRef.value.scrollLeft = left + ulRef.value.scrollLeft - paddingLeft;
	}
});

const onItemClick = (index) => {
	currentCategoryIndex.value = index;
};

watch(
	() => store.getters.categories,
	() => {
		// 当有itemRefs执行，只需要执行一次
		nextTick(() => {
			if (itemRefs.length > 0) {
				const { width } = itemRefs[0].getBoundingClientRect();
				sliderStyle.value.width = `${width}px`;
			}
		});
	},
	{
		immediate: true,
	},
);
</script>
