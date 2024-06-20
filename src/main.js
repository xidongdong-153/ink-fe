import { createApp } from 'vue';

import App from '@/App.vue';
import { libsInstall } from '@/libs';
import { router } from '@/router';
import { store } from '@/store';
import { reloadFontSize } from '@/utils/flexible';
import { useTheme } from '@/utils/theme';

import './styles/index.scss';

// eslint-disable-next-line import/no-unresolved,import/order
import 'virtual:svg-icons-register';

function bootstrap() {
	const app = createApp(App);

	reloadFontSize();

	app.use(router);

	app.use(store);

	app.use(libsInstall);
	useTheme();
	app.mount('#app');
}

bootstrap();
