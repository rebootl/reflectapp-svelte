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
		padding: 0;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		height: 100%;
		width: 192px;
		font-family: "Roboto", sans-serif;
		text-align: start;

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
  .item:focus {
		outline-style: none;
		/*outline-offset: -1px;
		outline-width: 1px;
		outline-color: var(--elements-focus-color);*/
		background-color: var(--elements-hover-color);
	}
	.item.active {
		color: var(--side-text-color-active);
		background-color: var(--side-active-color);
	}
</style>
