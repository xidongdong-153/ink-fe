import { onMounted, onUnmounted, watch } from 'vue';

import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '@/constants';
import { store } from '@/store';

/**
 * 变更主题
 * @param {string} theme 主题的标记常量
 */
const changeTheme = (theme) => {
	const html = document.documentElement;
	let prefersDark; // 将 prefersDark 变量声明移到 switch 外部

	switch (theme) {
		case THEME_LIGHT:
			html.classList.replace('dark', 'light');
			break;
		case THEME_DARK:
			html.classList.replace('light', 'dark');
			break;
		case THEME_SYSTEM:
			prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			html.classList[prefersDark ? 'add' : 'remove']('dark');
			break;
		default:
			html.classList.add('light');
	}
};

/**
 * 初始化主题
 */
export const useTheme = () => {
	// 系统主题变更监听
	const systemThemeChange = () => changeTheme(THEME_SYSTEM);

	onMounted(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', systemThemeChange);
	});

	onUnmounted(() => {
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.removeEventListener('change', systemThemeChange);
	});

	watch(() => store.getters.themeType, changeTheme, { immediate: true });
};
