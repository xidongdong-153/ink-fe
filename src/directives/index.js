/**
 * 全局注册指令
 */
export const useDirectives = {
	install(app) {
		const directives = import.meta.glob('./modules/*.js', { eager: true });
		Object.entries(directives).forEach(([key, value]) => {
			// 拼接组件注册的 name
			const arr = key.split('/');
			const directiveName = arr[arr.length - 1].replace('.js', '');
			// 完成注册
			app.directive(directiveName, value.deriective);
		});
	},
};
