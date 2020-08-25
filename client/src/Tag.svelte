<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = "Title";
	export let active = false;
</script>

<div class="item" class:active on:click={()=>dispatch('click')}>{title}</div>

<style>
	.item {
		display: block;
		padding: 5px 5px 5px 12px;
		margin: 5px;
		background-color: var(--side-background-color);
		border-radius: 12px;
		cursor: pointer;
		color: var(--side-text-color);
		font-size: small;
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item.active {
		color: var(--side-text-color-active);
		background-color: var(--side-active-color);
	}
</style>
