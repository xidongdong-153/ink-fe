import { defineAsyncComponent } from 'vue';

export const libsInstall = {
	install(app) {
		// 获取当前路径任意文件夹下的所有 .vue 文件
		const components = import.meta.glob('./*/*.vue');
		// 遍历获取到的组件模块

		Object.entries(components).forEach(([key, value]) => {
			// 提取文件名作为组件名
			const componentName = `i-${key
				.replace('./', '')
				.replace(/\/[A-Za-z0-9_-]+\.vue$/, '')
				.replace(/\//g, '-')}`;

			// 通过 defineAsyncComponent 异步导入指定路径下的组件
			app.component(componentName, defineAsyncComponent(value));
		});
	},
};
