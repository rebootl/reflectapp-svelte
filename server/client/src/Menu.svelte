<script>
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { getUserMenu } from './resources/getData.js';
	import MenuItem from './Elements/MenuItem.svelte';
	import UserList from './UserList.svelte';
	import TopicsTags from './TopicsTags.svelte';

	const dispatch = createEventDispatcher();

	export let showmenu;

	export let overview = true;
	export let user = '';

	let activeTopics = [];
	let activeTags = [];

	let foo = false;

	function tagclicked() {
		if (showmenu) dispatch('togglemenu');
	}
</script>

<nav class:showmenu>
	<div class="marginbox"></div>
	<div class="scrollbox">
		<UserList {user} />
		{#if !overview}
			<TopicsTags {user} on:load={(e) => {}}
									on:change={(e) => {}} />
		{/if}
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
		z-index: 25;
		color: var(--side-text-color);
		background-color: var(--side-background-color);
		border-right: 2px solid var(--logo-secondary-color);
	}
	.subtitle {
		text-align: center;
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
