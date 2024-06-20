import { getCategory } from '@/api/category';
import { ALL_CATEGORY_ITEM, CATEGORY_NORMAL_DATA } from '@/constants/index';

export const categoryStore = {
	namespace: true,
	state: () => {
		return {
			categories: [ALL_CATEGORY_ITEM, ...CATEGORY_NORMAL_DATA],
		};
	},
	mutations: {
		setCategories(state, categories) {
			// eslint-disable-next-line no-param-reassign
			state.categories = [ALL_CATEGORY_ITEM, ...categories]; // 最后再赋值给 state
		},
	},
	actions: {
		async fetchCategories({ commit }) {
			const { categorys } = await getCategory();
			commit('setCategories', categorys);
		},
	},
};
