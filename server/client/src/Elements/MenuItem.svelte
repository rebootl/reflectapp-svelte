<script>
	import { createEventDispatcher } from 'svelte';
	import {Icon} from '@smui/icon-button';

	const dispatch = createEventDispatcher();

	export let href = null;
	export let active = false;
	export let icon = null;
</script>

{#if href}
	<a class="item" class:active class:icon={icon} href={href}>
		{#if icon}
			<div class="icon-box">
				<Icon class="material-icons">{icon}</Icon>
			</div>
		{/if}
		<slot></slot>
	</a>
{:else}
	<button class="item" class:active class:icon={icon}
			 on:click={ ()=>dispatch('click') }>
		{#if icon}
			<div class="icon-box">
				<Icon class="material-icons">{icon}</Icon>
			</div>
		{/if}
		<slot></slot>
	</button>
{/if}

<style>
	.item {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
	.item:hover {
		background-color: var(--elements-hover-color);
	}
	button {
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		cursor: pointer;
	}
	a {
		box-sizing: border-box;
		padding-left: 20px;
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--elements-text-color);
	}
	a:focus {
		outline-style: none;
		background-color: var(--elements-active-color);
	}
	a:active {
		background-color: var(--elements-active-color);
	}
	.active {
		background-color: var(--elements-active-color);
	}
	.icon-box {
		padding-left: 6px;
		padding-right: 6px;
		display: flex;
		align-items: center;
	}
	.icon {
		padding-left: 0;
	}
</style>
