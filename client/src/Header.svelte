<script>
	import { createEventDispatcher } from 'svelte';
	import NavButton from './NavButton.svelte';
	import Logo from './Logo.svelte';
	import UserMenu from './UserMenu.svelte';
	import OverviewButton from './OverviewButton.svelte';
	import { loggedIn } from './resources/auth.js';

	const dispatch = createEventDispatcher();

	// state of the menu
	export let shownav = false;
	// disables and hides menu and menu button
	export let overview = true;

</script>

<header class:overview>
	<div class="header-left" class:overview>
		<div class="header-button-left-box" class:overview>
			<NavButton active={shownav} nomenu={overview}
							   on:menuclicked={ () => dispatch('togglenav') } />
		</div>
		<div class="header-spacer-left-box"></div>
		<img class="header-r-left" class:overview src="/icons/R-left.svg" />
	</div>
	<div class="header-spacer"></div>
	<div class="header-right">
		<img class="header-r-right" src="/icons/R-right.svg" />
		<div class="header-spacer-right-box"></div>
		<div class="header-button-right-box">
			<OverviewButton off={overview} />
			<UserMenu />
		</div>
	</div>
</header>

<style>
	header {
		position: relative;
		display: grid;
		grid-area: header;
		background-color: var(--header-background-color);
		border-bottom: 1px solid var(--header-line-color);
		z-index: 100;
		box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.25);
		grid-template-columns: 50px 0px minmax(0, 1fr);
		grid-template-rows: var(--header-height);
		grid-template-areas: "header-left header-spacer header-right";
	}
	header.overview {
		grid-template-columns: 28px 0px minmax(0, 1fr);
	}
	.header-left {
		grid-area: header-left;
		/*margin-left: 50px;*/
		/*border-right: 2px solid var(--logo-secondary-color);*/
		display: flex;
	}
	.header-left.overview {
		margin-left: 0;
	}
	.header-button-left-box {
		display: flex;
		border-right: 2px solid var(--logo-secondary-color);
	}
	.header-button-left-box.overview {
		border-right: 0;
	}
	.header-spacer-left-box {
		width: 100%;
		border-bottom: 2px solid var(--logo-secondary-color);
	}
	.header-r-left {
		height: 100%;
		display: none;
	}
	.header-r-left.overview {
		display: block;
	}
	.header-spacer {
		grid-area: header-spacer;
	}
	.header-right {
		/*border-left: 2px solid var(--logo-primary-color);*/
		grid-area: header-right;
		display: flex;
	}
	.header-r-right {
		height: 100%;
	}
	.header-spacer-right-box {
		width: 100%;
		border-bottom: 2px solid var(--logo-primary-color);
	}
	.header-button-right-box {
		display: flex;
		/*border-bottom: 2px solid var(--logo-primary-color);
		padding-top: 2px;*/
	}
	@media all and (min-width: 700px) {
		header {
			grid-template-columns: var(--side-width) 5px minmax(0, 1fr);
		}
		header.overview {
			grid-template-columns: 28px 0px minmax(0, 1fr);
		}
		.header-button-left-box {
			border-right: 0;
		}
		.header-r-left {
			height: 100%;
			display: inherit;
		}
	}
</style>
