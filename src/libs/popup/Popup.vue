<template>
	<teleport to="body">
		<!-- 蒙版 -->
		<transition name="fade">
			<div
				v-if="model"
				class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
				@click="model = false"
			></div>
		</transition>
		<!-- 内容 -->
		<transition name="popup-down-up">
			<div
				v-if="model"
				v-bind="$attrs"
				class="w-2/3 h-full bg-white z-50 fixed top-0 left-0 overflow-hidden"
			>
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>

<script setup>
import { useScrollLock } from '@vueuse/core';
import { watch } from 'vue';

const model = defineModel();

// ------ 滚动锁定 ------
const isLocked = useScrollLock(document.body);
watch(
	() => model,
	(val) => {
		isLocked.value = val;
	},
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active,
.fade-leave-active,
.popup-down-up-enter-active,
.popup-down-up-leave-active {
	@apply duration-200;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
	transform: translateX(-100%);
}
</style>
