<script>
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';
	import UserList from './UserList.svelte';
	import UserMenu from './UserMenu.svelte';

	const dispatch = createEventDispatcher();

	export let overview = true;
	export let shownav;

	export let user = '';
	export let activeTopics = [];
	export let activeTags = [];

	let singleSelect = true;
	let topics = [];

	function tagclicked() {
		//console.log(shownav)
		if (shownav) dispatch('togglenav');
	}
</script>

<nav class:shownav>
	<div class="marginbox"></div>
	<div class="scrollbox">
	<div class="spacer"></div>
	{#if overview}
		<UserList />
	{:else}
		<UserMenu {user} activeTopics={activeTopics} activeTags={activeTags}
		 					on:tagclick={() => tagclicked()}/>
	{/if}
	</div>
</nav>
<div class="overlay" class:shownav on:click={() => dispatch('togglenav')}></div>

<style>
	nav {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: var(--side-width-extended);
		position: fixed;
		left: calc(-1 * var(--side-width-extended));
		transition: left 0.2s;
		top: 0;
		bottom: 0;
		background-color: var(--side-background-color);
		z-index: 25;
		border-right: 2px solid var(--logo-secondary-color);
	}
	nav.shownav {
		left: 0;
		transition: left 0.2s;
	}
	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		/*opacity: 1;*/
		z-index: 15;
		display: none;
	}
	.overlay.shownav {
		display: flex;
		opacity: 0.5;
		/* transition opacity somehow doesn't work */
		/*transition: opacity 0.2s;*/
	}
	.spacer {
		height: 20px;
	}
	@media all and (min-width: 700px) {
		nav {
			left: 0;
		}
	}
	.marginbox {
		min-height: calc(var(--header-height) - 1px);
		border-bottom: 1px solid var(--side-lines-color);
	}
	.scrollbox {
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color:
			var(--side-scrollbar-color)
			var(--side-background-color);
		scrollbar-width: thin;
	}
</style>
