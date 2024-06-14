import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

import { PC_DEVICE_WIDTH } from '@/constants';

const { width } = useWindowSize();

/**
 * 判断当前设备是否为移动端设备
 * 基于屏幕宽度、用户代理和其他特性进行综合判断
 */
export const isMobileTerminal = computed(() => {
	// 基于屏幕宽度的判断
	const isMobileWidth = width.value < PC_DEVICE_WIDTH;

	// 基于用户代理的判断
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	const isMobileUserAgent =
		/android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			userAgent,
		);

	// 基于触摸事件支持的判断
	const isTouchDevice =
		'ontouchstart' in window || navigator.maxTouchPoints > 0;

	return isMobileWidth || isMobileUserAgent || isTouchDevice;
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
