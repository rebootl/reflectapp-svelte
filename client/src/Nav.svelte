<script>
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import Topic from './Topic.svelte';
	import Tag from './Tag.svelte';
	import UserList from './UserList.svelte';
	import UserMenu from './UserMenu.svelte';

	export let overview = true;
	export let shownav;

	export let user = '';
	export let activeTopics = [];
	export let activeTags = [];

	let singleSelect = true;
	let topics = [];

</script>

<nav class:shownav>
	<div class="marginbox"></div>
	<div class="scrollbox">
	{#if overview}
		<UserList />
	{:else}
		<UserMenu {user} activeTopics={activeTopics} activeTags={activeTags} />
	{/if}
	</div>
</nav>

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
		z-index: 15;
		border-right: 2px solid var(--logo-secondary-color);
	}
	nav.shownav {
		left: 0;
		transition: left 0.2s;
	}
	/*nav.nomenu {
		display: none;
	}*/
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
