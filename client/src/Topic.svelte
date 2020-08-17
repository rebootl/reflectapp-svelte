<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title = "Title";
	export let active = false;
</script>

<div class="item" class:active on:click={()=>dispatch('click')}>{title}</div>

<style>
	.item {
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		line-height: 48px;
		padding-left: 20px;
		cursor: pointer;
		/*color: var(--side-text-color);*/
		color: var(--main-text-color-low-emph);
	}
	.item:hover {
		/*color: var(--main-text-color);*/
		background-color: var(--side-hover-color);
	}
	.item:active {
		/*background-color: var(--focus-color);*/
	}
	.item.active {
		color: var(--main-text-color);
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
