<script>
	import { Icon } from '@smui/icon-button';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const s = new Set();

	export let active = false;
</script>

<button class="item" class:active
		 		on:click={()=>dispatch('click')}>
	<span class="icon"><Icon class="material-icons">topic</Icon></span>
	<slot></slot>
</button>

<style>
	.item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		width: 239px;
		height: 40px;
		margin: 8px;
		padding: 0 8px 0 8px;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		cursor: pointer;
		line-height: 22px;
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.1px;
		font-family: "Roboto", sans-serif;
		color: hsla(0,0%,100%,.87);
		border-radius: 4px;
		/*color: var(--side-text-color);*/
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item:focus {
		outline-style: none;
		/*outline-offset: -1px;
		outline-color: var(--focus-color);
		outline-width: 1px;*/
		background-color: var(--side-hover-color);
	}
	.item.active {
		color: var(--side-text-color-active);
		background-color: var(--side-active-color);
	}
	.icon {
		margin-right: 32px;
		display: flex;
		align-items: center;
		color: hsla(0,0%,100%,.6);
	}
	.item.active .icon {
		color: var(--side-text-color-active);
	}
</style>
