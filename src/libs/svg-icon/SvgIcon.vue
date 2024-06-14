<template>
	<svg aria-hidden="true">
		<use :xlink:href="symbolId" :class="fillClass" :fill />
	</svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	fill: {
		type: String,
		default: '',
	},
	fillClass: {
		type: String,
		default: '',
	},
});

const symbolId = computed(() => `#icon-${props.name}`);
</script>
