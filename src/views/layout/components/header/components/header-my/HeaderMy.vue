<template>
	<i-popover class="flex items-center" placement="bottom-left">
		<template #reference>
			<div
				class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
			>
				<!-- 头像 -->
				<img
					class="w-3 h-3 rounded-sm"
					src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b"
				/>
				<!-- 下箭头 -->
				<i-svg-icon
					class="h-1.5 w-1.5 ml-0.5"
					fillClass="fill-zinc-900 dark:fill-zinc-300"
					name="down-arrow"
				/>
				<!-- vip 标记 -->
				<i-svg-icon
					class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
					name="vip"
				/>
			</div>
		</template>

		<div class="w-[140px] overflow-hidden">
			<div
				v-for="item in menuArr"
				:key="item.id"
				class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
			>
				<i-svg-icon
					:name="item.icon"
					class="w-1.5 h-1.5 mr-1"
					fillClass="fill-zinc-900 dark:fill-zinc-300"
				/>
				<span class="text-zinc-800 text-sm dark:text-zinc-300">{{
					item.title
				}}</span>
			</div>
		</div>
	</i-popover>
</template>

<script setup>
// 构建 menu 数据源
const menuArr = [
	{
		id: 0,
		title: '个人资料',
		icon: 'profile',
		path: '/profile',
	},
	{
		id: 1,
		title: '升级 VIP',
		icon: 'vip-profile',
		path: '/member',
	},
	{
		id: 2,
		title: '退出登录',
		icon: 'logout',
		path: '',
	},
];
</script>

<style lang="scss" scoped></style>
