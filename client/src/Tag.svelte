<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = "Title";
	export let active = false;
</script>

<div class="item" class:active on:click={()=>dispatch('click')}>{title}</div>

<style>
	.item {
		/*box-sizing: border-box;*/
		display: block;
		padding: 5px 5px 5px 12px;
		margin: 5px;
		border: 1px solid var(--side-background-color-lighter);
		background-color: var(--side-background-color);
		border-radius: 12px;
		cursor: pointer;
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item:active {
		background-color: var(--focus-color);
	}
	.item.active {
		background-color: var(--side-active-color);
	}
	/*a {
		box-sizing: border-box;
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--side-text-color);
	}
	a:focus {
		outline-style: dotted;
		outline-offset: -1px;
		outline-color: var(--focus-color);
	}*/
</style>
