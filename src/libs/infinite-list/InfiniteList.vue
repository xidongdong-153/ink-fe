<template>
	<div>
		<!-- 内容 -->
		<slot></slot>
		<div ref="laodingTarget" class="h-6 py-4">
			<!-- 加载更多 -->
			<i-svg-icon
				v-show="loading"
				class="w-4 h-4 mx-auto animate-spin"
				name="infinite-load"
			/>
			<!-- 没有更多数据了 -->
			<p v-if="isFinished" class="text-center text-base text-zinc-400">
				已经没有更多数据了!
			</p>
		</div>
	</div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core';
import { ref, watch } from 'vue';

const loading = defineModel();

const props = defineProps({
	// 数据是否全部加载完成
	isFinished: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['onLoad']);

// 滚动的元素
const laodingTarget = ref(null);
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false);

/**
 * 触发 load
 */
const emitLoad = () => {
	// 当加载更多的视图可见时，加载更多数据
	if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
		// 修改加载数据标记
		loading.value = true;
		// 触发加载更多行为
		emits('onLoad');
	}
};

useIntersectionObserver(
	laodingTarget,
	([{ isIntersecting }], observerElement) => {
		// 获取当前交叉状态
		targetIsIntersecting.value = isIntersecting;
		// 触发 load
		emitLoad();
	},
);

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, (val) => {
	// 触发 load，延迟处理，等待 渲染和 useIntersectionObserver 的再次触发
	setTimeout(() => {
		emitLoad();
	}, 100);
});
</script>
