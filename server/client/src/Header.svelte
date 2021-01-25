<script>
	import { createEventDispatcher } from 'svelte';
	import IconButton from '@smui/icon-button';
	import MenuSurface from '@smui/menu-surface';
	import ProfileMenuDialog from './ProfileMenuDialog.svelte';

	const dispatch = createEventDispatcher();

	// control for ProfileMenu MenuSurface
	let formSurface;

	// login (empty for now)
	function loginEvent() {}
</script>

<header>
	<div class="left-box">
		<div class="menubutton">
			<IconButton class="material-icons"
									title="Show Menu"
									on:click={() => dispatch('togglemenu')}>menu</IconButton>
		</div>
	</div>
	<div class="center-box">
		<div class="logo-box">
			<img class="logo-r-left" src="/icons/R-left.svg" />
			<img class="logo-r-right" src="/icons/R-right.svg" />
		</div>
	</div>
	<div class="right-box">
		<!--<IconButton class="material-icons" href="/#"
								 		title="Overview">people</IconButton>-->
		<IconButton class="material-icons" on:click={() => formSurface.setOpen(true)}
								title="Profile">account_circle</IconButton>
		<MenuSurface bind:this={formSurface} anchorCorner="BOTTOM_LEFT">
			<ProfileMenuDialog on:login={() => loginEvent()} />
		</MenuSurface>
	</div>
</header>

<style>
	header {
		position: relative;
		grid-area: header;
		background-color: var(--header-background-color);
		border-bottom: 1px solid var(--header-hline-color);
		z-index: 100;
		box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.25);
		color: var(--header-text-color);
		display: flex;
		justify-content: space-between;
	}
	.center-box {
		display: flex;
		align-items: center;
	}
	.logo-box {
		box-sizing: initial;
		height: calc(var(--header-height) - 15px);
		border: 1px solid var(--header-lines-color);
		padding: 3px;
	}
	.logo-r-left {
		height: calc(var(--header-height) - 15px);
	}
	.logo-r-right {
		height: calc(var(--header-height) - 15px);
	}
	:global(.mdc-menu-surface--open) {
		border-radius: 8px;
		margin-top: 1px;
	}
</style>
