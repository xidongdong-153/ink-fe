<template>
	<div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
		<div ref="referenceRef">
			<!-- 具名插槽 -->
			<slot name="reference"></slot>
		</div>
		<!-- 气泡展示动画 -->
		<transition name="slide">
			<div
				v-if="isVisible"
				ref="popoverRef"
				:style="contentStyle"
				class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
			>
				<!-- 匿名插槽 -->
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script setup>
/* eslint-disable no-use-before-define */
import { useElementSize } from '@vueuse/core';
import { nextTick, ref, watch } from 'vue';

import {
	PROP_BOTTOM_LEFT,
	PROP_BOTTOM_RIGHT,
	PROP_TOP_LEFT,
	PROP_TOP_RIGHT,
	placementEnum,
} from '@/libs/popover/option';

const props = defineProps({
	// 控制气泡弹出位置，并给出开发者错误的提示
	placement: {
		type: String,
		default: 'bottom-left',
		validator(val) {
			const result = placementEnum.includes(val);
			if (!result) {
				throw new Error(
					`你的 placement 必须是 ${placementEnum.join('、')} 中的一个`,
				);
			}
			return result;
		},
	},
});

// 控制 menu 展示
const isVisible = ref(false);

const popoverRef = ref(null);
const referenceRef = ref(null);

/**
 * 计算弹层位置
 */
const contentStyle = ref({
	top: 0,
	left: 0,
});

/**
 * 监听展示的变化，在展示时计算气泡位置
 */
watch(isVisible, (val) => {
	if (!val) {
		return;
	}
	// 等待渲染成功之后
	nextTick(() => {
		switch (props.placement) {
			// 左上
			case PROP_TOP_LEFT:
				contentStyle.value.top = 0;
				contentStyle.value.left = `${-useElementSize(popoverRef.value).width.value}px`;
				break;
			// 右上
			case PROP_TOP_RIGHT:
				contentStyle.value.top = 0;

				contentStyle.value.left = `${useElementSize(referenceRef.value).width.value}px`;
				break;
			// 左下
			case PROP_BOTTOM_LEFT:
				contentStyle.value.top = `${useElementSize(referenceRef.value).height.value}px`;
				contentStyle.value.left = `${-useElementSize(popoverRef.value).width.value}px`;
				break;
			// 右下
			case PROP_BOTTOM_RIGHT:
				contentStyle.value.top = `${useElementSize(referenceRef.value).height.value}px`;
				contentStyle.value.left = `${useElementSize(referenceRef.value).width.value}px`;
				break;
			default:
				break;
		}
	});
});

// 控制延迟关闭
let timeout = null;
/**
 * 鼠标移入的触发行为
 */
const onMouseenter = () => {
	isVisible.value = true;
	// 再次触发时，清理延时装置
	if (timeout) {
		clearTimeout(timeout);
	}
};
/**
 * 鼠标移出的触发行为
 */
const onMouseleave = () => {
	// 延时装置
	timeout = setTimeout(() => {
		isVisible.value = false;
		timeout = null;
	}, 300);
};
</script>

<style lang="scss" scoped>
// slide 展示动画
.slide-enter-active {
	transition:
		opacity 0.3s,
		transform 0.3s;
}

.slide-leave-active {
	transition:
		opacity 0.3s,
		transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
	transform: translateY(20px);
	opacity: 0;
}
</style>
