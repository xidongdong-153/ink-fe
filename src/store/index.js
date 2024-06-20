import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { getters } from '@/store/getters';
import { categoryStore } from '@/store/modules/category';
import { themeStore } from '@/store/modules/theme';

export const store = createStore({
	getters,
	modules: {
		category: categoryStore,
		theme: themeStore,
	},
	plugins: [
		createPersistedState({
			// 保存到 localStorage 中的 key
			key: 'ink-fe',
			// 需要保存的模块
			paths: ['category'],
		}),
	],
});
