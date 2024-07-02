import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

import { PC_DEVICE_WIDTH } from '@/constants';

const { width } = useWindowSize();

/**
 * 判断当前设备是否为移动端设备
 * 基于屏幕宽度、用户代理和其他特性进行综合判断
 */

export const isMobileTerminal = computed(() => {
	return width.value < PC_DEVICE_WIDTH;
});

/**
 * 重载应用根节点字体大小
 */
export const reloadFontSize = () => {
	const MAX_FONT_SIZE = 40;

	const setFontSize = () => {
		const html = document.documentElement;
		const fontSize = Math.min(width.value / 10, MAX_FONT_SIZE);
		html.style.fontSize = `${fontSize}px`;
	};

	document.addEventListener('DOMContentLoaded', setFontSize);
	window.addEventListener('resize', setFontSize);
};
