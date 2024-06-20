<template>
	<div class="bg-white sticky top-0 left-0 w-full z-10">
		<ul
			:class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
			class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
		>
			<!-- lg 下展开箭头 -->
			<li
				class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
				@click="triggerState"
			>
				<i-svg-icon
					:name="isOpenCategory ? 'fold' : 'unfold'"
					class="w-1 h-1"
					fillClass="fill-zinc-900"
				></i-svg-icon>
			</li>
			<!-- category item -->
			<li
				v-for="(item, index) in store.getters.categories"
				:key="item.id"
				:class="{
					'text-zinc-900 bg-zinc-200 ': currentCategoryIndex === index,
				}"
				class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1"
				@click="onItemClick(index)"
			>
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

/**
 * 状态切换处理
 */
const isOpenCategory = ref(false);
const triggerState = () => {
	isOpenCategory.value = !isOpenCategory.value;
};

/**
 * 选中状态处理
 */
const currentCategoryIndex = ref(0);
const onItemClick = (index) => {
	currentCategoryIndex.value = index;
};
</script>
