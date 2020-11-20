<script>
	import { createEventDispatcher } from 'svelte';
	import IconButton from '@smui/icon-button';
	import MenuSurface from '@smui/menu-surface';
	// own components
	import ProfileMenuDialog from './ProfileMenuDialog.svelte';

	const dispatch = createEventDispatcher();

	// state of the menu
	export let shownav = false;
	// show/hide overview button
	// (inactive for now, always show)
	//export let overview = true;

	// control for ProfileMenu MenuSurface
	let formSurface;

	// login (empty for now)
	function loginEvent() {}
</script>

<header>
	<div class="header-left">
		<div class="header-button-left-box">
			<IconButton class="material-icons"
									title="Show Menu"
									on:click={() => dispatch('togglenav')}>menu</IconButton>
		</div>
		<div class="header-spacer-left-box"></div>
		<img class="header-r-left" src="/icons/R-left.svg" />
	</div>
	<div class="header-spacer"></div>
	<div class="header-right">
		<img class="header-r-right" src="/icons/R-right.svg" />
		<div class="header-spacer-right-box"></div>
		<div class="header-button-right-box">
			<IconButton class="material-icons" href="/#"
								 	title="Overview">people</IconButton>
			<IconButton class="material-icons" on:click={() => formSurface.setOpen(true)}
									title="Profile">face</IconButton>
			<MenuSurface bind:this={formSurface} anchorCorner="BOTTOM_LEFT">
				<ProfileMenuDialog on:login={() => loginEvent()} />
			</MenuSurface>
		</div>
	</div>
</header>

<style>
	header {
		position: relative;
		display: grid;
		grid-area: header;
		background-color: var(--header-background-color);
		border-bottom: 1px solid var(--header-hline-color);
		z-index: 100;
		box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.25);
		grid-template-columns: 50px 0px minmax(0, 1fr);
		grid-template-rows: var(--header-height);
		grid-template-areas: "header-left header-spacer header-right";
		color: var(--header-text-color);
	}
	.header-left {
		grid-area: header-left;
		display: flex;
		position: fixed;
		height: var(--header-height);
		width: var(--side-width);
	}
	.header-button-left-box {
		display: flex;
		border-right: 2px solid var(--logo-secondary-color);
		border-bottom: 2px solid var(--logo-secondary-color);
		background-color: var(--header-background-color);
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
		border-bottom: 2px solid var(--logo-primary-color);
		padding-right: 5px;
	}
	@media all and (min-width: 700px) {
		header {
			grid-template-columns: var(--side-width) 5px minmax(0, 1fr);
		}
		.header-button-left-box {
			display: none;
		}
		.header-r-left {
			height: 100%;
			display: inherit;
		}
	}
</style>
