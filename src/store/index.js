import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { getters } from '@/store/getters';
import { categoryStore } from '@/store/modules/category';

export const store = createStore({
	getters,
	modules: {
		category: categoryStore,
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
