<template>
	<div class="sticky top-0 left-0 z-10 bg-white">
		<ul
			ref="ulRef"
			class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
		>
			<li
				:style="sliderStyle"
				class="absolute h-[24px] shrink-0 z-10 bg-zinc-900 rounded-lg duration-200"
				:class="{
					'px-1.5 py-0.5': categories.length > 0,
				}"
				ref="sliderRef"
			></li>
			<!-- 菜单 -->
			<li
				class="fixed top-0 right-[-1px] h-4 p-1 flex items-center bg-white shadow-l-white z-20"
				@click="isOpenPopup = !isOpenPopup"
			>
				<i-svg-icon name="hamburger" class="w-1.5 h-1.5" />
			</li>

			<li
				v-for="(category, index) of categories"
				:key="category.id"
				class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-3"
				:class="{
					'text-zinc-100': currentCategoryIndex === index,
				}"
				:ref="setItemRef"
				@click="onItemClick(index)"
			>
				{{ category.name }}
			</li>
		</ul>

		<i-popup v-model="isOpenPopup">
			<InkMenu :categories @on-selected="onItemClick" />
		</i-popup>
	</div>
</template>

<script setup>
import { useScroll } from '@vueuse/core';
import { nextTick, onBeforeUpdate, ref, watch } from 'vue';

import InkMenu from '@/views/main/components/menu/InkMenu.vue';

const props = defineProps({
	categories: {
		type: Array,
		required: true,
		default: () => [],
	},
});

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
});

const onItemClick = (index) => {
	currentCategoryIndex.value = index;
	isOpenPopup.value = false;
};

watch(
	() => props.categories,
	() => {
		// 当有itemRefs执行，只需要执行一次
		nextTick(() => {
			if (itemRefs.length > 0) {
				const { width } = itemRefs[0].getBoundingClientRect();
				sliderStyle.value.width = `${width}px`;
			}
		});
	},
);
</script>
