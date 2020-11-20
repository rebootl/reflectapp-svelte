<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = "Title";
	export let active = false;
</script>

<button class="item" class:active
		 		on:click={()=>dispatch('click')}>{title}</button>

<style>
	.item {
		display: flex;
		width: 100%;
		height: 48px;

		background-color: rgba(0, 0, 0, 0);
		border: 0;
		cursor: pointer;
		padding: 0;
		padding-left: 20px;

		line-height: 48px;
		font-size: 16px;
		font-family: "Roboto", sans-serif;
		color: var(--side-text-color);
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item:focus {
		outline-style: none;
		/*outline-offset: -1px;
		outline-color: var(--focus-color);
		outline-width: 1px;*/
		background-color: var(--side-active-color);
	}
	.item.active {
		color: var(--side-text-color-active);
		background-color: var(--side-active-color);
	}
</style>
