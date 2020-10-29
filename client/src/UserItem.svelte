<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let username = "Username";
</script>

<button class="item"
		 		on:click={()=>dispatch('click')}>{ username }</button>

<style>
	.item {
		padding: 0;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		height: 100%;
		font-size: 16px;
		font-family: sans-serif;
		display: flex;

		width: 100%;
		height: 48px;
		line-height: 48px;
		padding-left: 20px;
		cursor: pointer;
		color: var(--main-text-color);
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item:focus {
		outline-style: solid;
		outline-offset: -1px;
		outline-color: var(--focus-color);
		outline-width: 1px;
		background-color: var(--side-hover-color);
	}
</style>
