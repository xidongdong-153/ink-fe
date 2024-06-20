<template>
	<button
		:class="[
			typeEnum[type],
			sizeEnum[sizeKey].button,
			{ 'active:scale-105': isActiveAnim },
		]"
		class="text-sm text-center rounded duration-150 flex justify-center items-center"
		@click.stop="onClick"
	>
		<!-- 展示 loading -->
		<i-svg-icon
			v-if="loading"
			class="w-2 h-2 animate-spin mr-1"
			name="loading"
		/>
		<!-- icon 按钮 -->
		<i-svg-icon
			v-if="icon"
			:class="sizeEnum[sizeKey].icon"
			:color="iconColor"
			:fillClass="iconClass"
			:name="icon"
			class="m-auto"
		/>
		<!-- 文字按钮 -->
		<slot v-else></slot>
	</button>
</template>

<script setup>
import { computed } from 'vue';

import { EMIT_CLICK, sizeEnum, typeEnum } from '@/libs/button/option';

const props = defineProps({
	// icon 图标名字
	icon: {
		type: String,
		default: '',
	},
	// icon 图标颜色
	iconColor: {
		type: String,
		default: '',
	},
	// icon 图标类名（匹配 tailwind）
	iconClass: {
		type: String,
		default: '',
	},
	// 按钮风格
	type: {
		type: String,
		default: 'main',
		validator(val) {
			// 获取所有的可选的按钮风格
			// eslint-disable-next-line no-use-before-define
			const keys = Object.keys(typeEnum);
			// 开发者指定风格是否在可选风格中
			const result = keys.includes(val);
			// 如果不在则给开发者提示
			if (!result) {
				throw new Error(`你的 type 必须是 ${keys.join('、')} 中的一个`);
			}
			// 返回校验结果
			return result;
		},
	},
	// 大小风格
	size: {
		type: String,
		default: 'default',
		validator(val) {
			// 获取所有的可选的大小（注意剔除 icon 开头的元素，因为我们期望开发者输入 size="default"，但不期望开发者输入 size="icon-default"）
			// eslint-disable-next-line no-use-before-define
			const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'));
			// 开发者指定大小是否在可选大小中
			const result = keys.includes(val);
			// 如果不在则给开发者提示
			if (!result) {
				throw new Error(`你的 size 必须是 ${keys.join('、')} 中的一个`);
			}
			// 返回校验结果
			return result;
		},
	},
	// 按钮在点击时是否需要动画
	isActiveAnim: {
		type: Boolean,
		default: true,
	},
	// 加载状态
	loading: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits([EMIT_CLICK]);

// 处理大小的 key 值
const sizeKey = computed(() => {
	return props.icon ? `icon-${props.size}` : props.size;
});

const onClick = () => {
	if (props.loading) {
		return;
	}

	emits(EMIT_CLICK);
};
</script>

<style lang="scss" scoped></style>
