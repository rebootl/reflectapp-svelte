<script>
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';
	import UserList from './UserList.svelte';
	import UserMenu from './UserMenu.svelte';

	const dispatch = createEventDispatcher();

	export let showmenu;

	export let user = '';
	export let activeTopics = [];
	export let activeTags = [];

	let singleSelect = true;
	let topics = [];

	function tagclicked() {
		if (showmenu) dispatch('togglemenu');
	}
	/*{#if overview}
			<UserList />
		{:else}-->
		{/if}
	*/
</script>

<nav class:showmenu>
	<div class="marginbox"></div>
	<div class="scrollbox">
	<div class="spacer"></div>
		<UserMenu {user} activeTopics={activeTopics} activeTags={activeTags}
		 					on:tagclick={() => tagclicked()}/>
	</div>
</nav>
<div class="overlay" class:showmenu on:click={() => dispatch('togglemenu')}></div>

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
	nav.showmenu {
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
	.overlay.showmenu {
		display: flex;
		opacity: 0.5;
		/* transition opacity somehow doesn't work */
		/*transition: opacity 0.2s;*/
	}
	.spacer {
		height: 20px;
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
	@media all and (min-width: 700px) {
		nav {
			left: 0;
		}
		nav.showmenu {
			left: calc(-1 * var(--side-width-extended));
			transition: left 0.2s;
		}
		.overlay.showmenu {
			display: none;
		}
	}
</style>
