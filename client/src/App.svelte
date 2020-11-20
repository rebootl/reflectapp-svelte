<script>
	import Header from './Header.svelte';
	import Nav from './Nav.svelte';
	import Entries from './Entries.svelte';
	import SingleEntry from './SingleEntry.svelte';
	import { myrouter } from './resources/router.js';
	import { loggedIn } from './resources/auth.js';

	// route for template
	let route = '';
	// router
	let routerReady = false;
	let user = '';
	let activeTopics = [];
	let activeTags = [];
	// id for single entry
	let entryId = '';

	// state of the menu
	let shownav = false;

	// disables and hides menu button
	let overview = true;

	async function routerUpdate() {

		route = myrouter.getRouteNamed();
		//console.log("App/route: ", route)

		if (route === 'singleentry') {
			user = myrouter.getUser();
			entryId = myrouter.getEntryId();
			//console.log("App/entryId: ", entryId)
			activeTopics = [];
			activeTags = [];
			overview = false;
		} else if (route === 'user') {
			// get user
			user = myrouter.getUser();
			//console.log('App/user: ', user)
			// get topics/tags
			activeTopics = myrouter.getTopics();
			activeTags = myrouter.getTags();
			overview = false;
			//console.log('App/user, topics, tags: ', user, topics, tags)
		} else {
			// overview
			route = 'overview';
			overview = true;
			user = '';
			activeTopics = [];
			activeTags = [];
			// reset url
			myrouter.setURL('', [], []);
		}
		routerReady = true;
	}

	myrouter.registerSvelte(routerUpdate);
</script>

<div class="wrapper">
	<Header {overview} on:togglenav={ () => shownav = !shownav } />
	<Nav {overview} {shownav} {user}
			 activeTopics={activeTopics} activeTags={activeTags}
			 on:togglenav={ () => shownav = !shownav } />

	<!-- (sidearea stays empty, menu is overlayed above) -->
	<div class="sidearea"></div>
	<!-- (spacer between the two vertical lines) -->
	<div class="spacer"></div>

	<main>
	{#if route === 'singleentry'}
		<SingleEntry {user} entryId={entryId} />
	{:else}
		<Entries {user} {routerReady}
						 activeTopics={activeTopics} activeTags={activeTags} />
	{/if}
	</main>

	<!--<div class="filler"></div>-->
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

		/* base colors */
		--background-color: #17171d;
		--background-color-light: #2b2b31;
		--background-color-lighter: #404046;
		--background-color-dark: #030309;
		--hover-color: #23232c;
		--active-color: #2b2b31;

		/* header */
		--header-background-color: var(--background-color);
		--header-hover-color: var(--hover-color);
		--header-active-color: var(--background-color-light);
		--header-hline-color: #000;
		--header-lines-color: var(--background-color-light);
		--header-text-color: #eee;

		/* side */
		--side-background-color: var(--background-color);
		--side-hover-color: var(--hover-color);
		--side-active-color: var(--background-color-light);
		--side-lines-color: var(--background-color-light);
		--side-scrollbar-color: var(--background-color-dark);
		--side-text-color: var(--main-text-color-low-emph);
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
		--linbox-color: #212131;

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

		/*** sizes ***/
		--header-height: 50px;
		--side-width: 0;
		--side-width-extended: 230px;
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
		grid-template-columns: auto;
		grid-template-rows: var(--header-height) auto;
		grid-template-columns: var(--side-width) 5px minmax(0, 1fr);
		grid-template-areas:
			"header header header"
			"main main main";
		background-color: var(--main-background-color);
	}
	main {
		grid-area: main;
		color: var(--main-text-color);
	}
	.sidearea {
		grid-area: side;
		background-color: var(--side-background-color);
		min-height: calc(100vh - var(--header-height));
		z-index: 10;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
	}
	.spacer {
		grid-area: spacer;
	}
	/*.filler {
		grid-area: filler;
	}*/
	@media all and (min-width: 700px) {
		:global(body) {
			--side-width: var(--side-width-extended);
		}
		.wrapper {
			grid-template-areas:
				"header header header"
				"side spacer main";
		}
		main {
			border-left: 2px solid var(--logo-primary-color);
		}
	}
</style>
