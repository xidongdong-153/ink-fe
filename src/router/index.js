import { createRouter, createWebHistory } from 'vue-router';

import { mobileRoutes } from '@/router/modules/mobile-routes';
import { pcRoutes } from '@/router/modules/pc-routes';
import { isMobileTerminal } from '@/utils/flexible';

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: isMobileTerminal.value ? mobileRoutes : pcRoutes,
});
