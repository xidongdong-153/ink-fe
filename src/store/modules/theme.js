import { THEME_SYSTEM } from '@/constants';

export const themeStore = {
	namespaced: true,
	state: () => ({
		// 主题模式
		themeType: THEME_SYSTEM,
	}),
	mutations: {
		/**
		 *  切换主题模式
		 */
		changeThemeType(state, newTheme) {
			// eslint-disable-next-line no-param-reassign
			state.themeType = newTheme;
		},
	},
};
