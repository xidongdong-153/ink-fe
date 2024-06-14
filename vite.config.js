import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		createSvgIconsPlugin({
			iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
			symbolId: 'icon-[name]',
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'https://api.imooc-front.lgdsunday.club/',
				changeOrigin: true,
			},
		},
	},
});
