export const pcRoutes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/layout/InkLayout.vue'),
		children: [
			{
				path: '',
				name: 'home',
				component: () => import('@/views/main/InkMain.vue'),
			},
		],
	},
];
