<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = "Title";
	export let active = false;
</script>

<div class="item" class:active on:click={()=>dispatch('click')}>{title}</div>

<style>
	.item {
		width: 100%;
		height: 48px;
		line-height: 48px;
		padding-left: 20px;
		cursor: pointer;
		color: var(--side-text-color);
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item.active {
		color: var(--side-text-color-active);
		background-color: var(--side-active-color);
	}
</style>
