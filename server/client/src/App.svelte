<script>
	import Header from './Header.svelte';
	import Menu from './Menu.svelte';
	import Entries from './Entries.svelte';
	import { myrouter } from './resources/router.js';
	import { loggedIn } from './resources/auth.js';
	import { singleEntry } from './resources/store.js';

	// route for template
	let route = '';
	// router
	let routerReady = false;
	let user = '';

	let overview = true;
	let single = false;

	// state of the menu
	let showmenu = false;

	function routerUpdate() {

		route = myrouter.namedRoute;

		if (route === 'singleentry') {
			user = myrouter.user;
		} else if (route === 'user') {
			// get user
			user = myrouter.user;
		} else {
			// overview
			route = 'overview';
			user = '';
			// reset url
			//myrouter.setURL('');
		}
		overview = route === 'overview' ? true : false;
		single = route === 'singleentry' ? true : false;
		route === 'singleentry' ? singleEntry.set(true)
														: singleEntry.set(false);
		routerReady = true;
	}

	myrouter.registerCallback(routerUpdate);
</script>

<div class="wrapper" class:showmenu>
	<Header on:togglemenu={ () => showmenu = !showmenu } />
	<Menu {showmenu} {user} {overview}
			 on:togglemenu={ () => showmenu = !showmenu } />

	<!-- (sidearea stays empty, menu is overlayed above) -->
	<div class="sidearea"></div>

	<main>
	{#if route === 'overview'}
		<h1>Welcome!</h1>
		landing page, blabla
	{:else}
		<Entries {user} {routerReady} />
	{/if}
	</main>

</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		/*** colors ***/

		/* logo lines */
		--logo-primary-color: #3dbbbb;
		--logo-secondary-color: #8a8af8;

		/* links */
		--primary-color: #9cdede;

		/* input elements */
		--primary-variant-color: #287b7b;
		--on-primary-variant-color: #eee;

		--form-line-color: #6f6f73; /* from material-ui */

		--tasks-color: #f2f259;
		--links-color: #06e8ff;
		--notes-color: #e8e8e8;
		--images-color: #82ff70;

		/* base colors */
		--background-color: #17171d;
		--background-color-light: #2b2b31;
		--background-color-lighter: #404046;
		--background-color-dark: #030309;
		/*--hover-color: #23232c;*/
		--hover-color: #29292f; /* (from material elements) */
		/*--active-color: #2b2b31;*/
		--active-color: #382751;

		/* header */
		--header-background-color: var(--background-color);
		--header-hover-color: var(--hover-color);
		--header-active-color: var(--background-color-light);
		--header-hline-color: var(--background-color-lighter);
		--header-lines-color: var(--background-color-lighter);
		--header-text-color: #eee;

		/* side */
		--side-background-color: var(--background-color);
		--side-hover-color: var(--hover-color);
		--side-active-color: var(--background-color-lighter);
		--side-lines-color: var(--background-color-light);
		--side-scrollbar-color: var(--background-color-dark);
		--side-text-color: var(--main-text-color);
		--side-text-color-active: var(--main-text-color);

		/* main */
		--main-background-color: var(--background-color);
		--main-background-color-light: var(--background-color-light);
		--main-background-color-lighter: var(--background-color-lighter);
		--main-content-background-color: var(--background-color);
		--main-hover-color: var(--hover-color);
		--main-lines-color: var(--background-color-lighter);
		--main-text-color: #eee;
		--main-text-color-low-emph: #aaa;
		--linkbox-color: #212131;

		/* specials */
		--focus-color: hsl(220, 100%, 70%);
		--warn-color: #ff1;
		--error-color: #f12;
		--on-error-color: #fff;

		/* elements (input, buttons etc.) */
		--elements-primary-color: var(--primary-variant-color);
		--elements-primary-color-light: var(--primary-variant-color-light);
		--elements-on-primary-color: var(--on-primary-variant-color);
		--elements-text-color: var(--main-text-color);
		--elements-hover-color: var(--hover-color);
		--elements-active-color: var(--active-color);
		--elements-focus-color: var(--focus-color);
		--elements-form-line-color: var(--form-line-color);

		/*** sizes ***/
		--header-height: 50px;
		--side-width: 0;
		--side-width-extended: 255px;
		--main-width: 650px;

		margin: 0;
		background-color: var(--main-background-color);
		font-family: Roboto, sans-serif;
		/* avoid layout shift when scrollbar appears... */
		overflow-y: scroll;
	}
	:global(a) {
		color: var(--primary-color);
	}
	.wrapper {
		display: grid;
		grid-template-rows: var(--header-height) auto;
		grid-template-columns: var(--side-width) minmax(0, 1fr);
		grid-template-areas:
			"header header"
			"main main";
		background-color: var(--main-background-color);
	}
	main {
		grid-area: main;
		color: var(--main-text-color);
		padding-left: 20px;
		padding-right: 20px;
	}
	.sidearea {
		grid-area: side;
		background-color: var(--side-background-color);
		min-height: calc(100vh - var(--header-height));
		z-index: 10;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
	}
	@media all and (min-width: 700px) {
		:global(body) {
			--side-width: var(--side-width-extended);
		}
		.wrapper {
			grid-template-areas:
				"header header"
				"side main";
		}
		.wrapper.showmenu {
			grid-template-areas:
				"header header"
				"main main";
		}
	}
</style>
