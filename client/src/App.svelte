<script>
	import { afterUpdate } from 'svelte';
	import MenuButton from './MenuButton.svelte';
	import Logo from './Logo.svelte';
	import UserMenu from './UserMenu.svelte';
	import Nav from './Nav.svelte';
	import Exampletext from './Exampletext.svelte';
	import Overview from './Overview.svelte';
	import OverviewButton from './OverviewButton.svelte';
	import Entries from './Entries.svelte';
	import { setColorVariants } from './resources/colors.js';
	import { myrouter } from './resources/router.js';
	import { loggedIn } from './resources/auth.js';

	//let route = myrouter.getRoute();
	// route for template
	let route = '';
	// user for user entries
	let viewUser = '';
	// id for single entry
	let entryId = '';

	// state of the menu
	let shownav = false;
	// disables and hides menu and menu button
	let overview = true;

	function routerUpdate() {
		const _route = myrouter.getRoute();
		const _p0 = myrouter.getParts(0);
		if (_route.startsWith('~')) {
			// user entries/entry
			console.log(_p0)
			if (_p0[0]) {
				if (_p0[0].startsWith('~')) {
				// single entry
				route = 'singleentry';
				entryId = _p0.slice(1);
			}} else {
				route = 'user';
			}
			overview = false;
			viewUser = _route.slice(1);
		} else if (_route === 'editor' || _route === 'me' || _route === 'my-entries'
				|| _route === 'myentries') {
				if (loggedIn()) overview = false;
				else overview = true;
				route = 'me';
		} else if (_route === 'signup') {
			overview = true;
			route = 'signup';
		} else {
			myrouter.setUrl('', [], []);
			overview = true;
			route = 'overview';
		}
	}

	myrouter.registerSvelte(routerUpdate);

	const colorVariantProps = [
		'--header-background-color',
		'--main-background-color',
		'--side-background-color',
		'--primary-variant-color',
	];

	const body = document.querySelector('body');
	for (const p of colorVariantProps) {
		setColorVariants(body, p);
	}

	// compile to webcomponent
	//<svelte:options tag="my-app" />
	//<svelte:component ref={comp} />
</script>


<div class="wrapper" class:nomenu={overview}>
	<header>
		<MenuButton active={shownav} nomenu={overview}
								on:menuclicked={()=>shownav = !shownav} />
		<OverviewButton off={overview} />
		<Logo off={!overview} />
		<UserMenu />
	</header>
	<Nav {shownav} nomenu={overview} />
	<!-- (sidearea stays empty, menu is overlayed above) -->
	<div class="sidearea"></div>

	<main>
	{#if route === 'user'}
		<Entries user={viewUser} />
		<!--<Exampletext n={5} />-->
	{:else if route === 'me'}
		{#if loggedIn()}
			[ SHOW MY ENTRIES ]
		{:else}
			[ LOGIN OR SIGNUP ]
		{/if}
	{:else if route === 'signup'}
		[ SHOW SIGNUP PAGE ]
	{:else}
		<Overview />
	{/if}
	</main>

	<div class="filler"></div>
</div>

<style>
	:global(body) {
		/*** colors ***/
		/* links */
		--primary-color: #9cdede;
		/* input elements */
		--primary-variant-color: #287b7b;
		--on-primary-variant-color: #eee;

		/* header */
		--header-background-color: #000;
		--header-line-color: #000;
		--header-hover-color: var(--header-background-color-light);
		--header-active-color: var(--header-background-color-light);
		--header-text-color: #eee;

		/* side */
		--side-background-color: #bb0055;
		--side-hover-color: var(--side-background-color-light);
		--side-active-color: var(--side-background-color-lighter);
		--side-text-color: #000;

		/* main */
		--main-background-color: #34344e;
		--main-text-color: #eee;
		--main-text-color-low-emph: #aaa;
		/* light */
		/*--main-background-color: #eef;
		--main-text-color: #555;
		--main-text-color-low-emph: #655;*/

		/* specials */
		--focus-color: hsl(220, 100%, 70%);
		--warn-color: #ff1;
		--error-color: #f12;
		--on-error-color: #fff;

		/* elements (input, buttons etc.) */
		--elements-primary-color: var(--primary-variant-color);
		/* -> test --primary-variant-color-light; */
		--elements-primary-color-light: var(--primary-variant-color-light);
		--elements-on-primary-color: var(--on-primary-variant-color);
		--elements-text-color: var(--main-text-color);
		--elements-focus-color: var(--focus-color);

		/*** sizes ***/
		--header-height: 50px;
		--side-width: 230px;
		--sidebar-width: 15px;
		--main-width: 650px;

		margin: 0;
		background-color: var(--main-background-color-dark);
		font-family: sans-serif;
	}
	:global(a) {
		color: var(--primary-color);
	}
	.wrapper {
		display: grid;
		grid-template-columns: auto;
		/*transition: grid-template-columns 0.5s;*/
		grid-template-rows: var(--header-height) auto;
		grid-template-columns: var(--sidebar-width) calc(100% - var(--sidebar-width));
		grid-template-areas:
			"header header"
			"side main";
		background-color: var(--main-background-color-dark);
		min-height: 100vh;
	}
	header {
		display: flex;
		grid-area: header;
		background-color: var(--header-background-color);
		border-bottom: 1px solid var(--header-line-color);
		z-index: 100;
		box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.25);
	}
	main {
		/*padding-left: 20px;*/
		grid-area: main;
		color: var(--main-text-color);
		/*display: flex;*/
	}
	.sidearea {
		grid-area: side;
		background-color: var(--side-background-color);
		min-height: calc(100vh - var(--header-height));
		z-index: 10;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
	}
	.filler {
		grid-area: filler;
	}
	/* don't show sidebar for very small width */
	/*@media all and (min-width: 360px) {
		.wrapper {
			grid-template-columns: auto;
			grid-template-areas:
				"header"
				"main";
		}
	}*/
	@media all and (min-width: 650px) {
		:global(body) {
			--side-width: 230px;
		}
		.wrapper {
			grid-template-columns: var(--side-width) 1fr;
			grid-template-areas:
				"header header"
				"side main";
		}
		.wrapper.nomenu {
			--side-width: var(--sidebar-width);
		}
	}
	/* side-width + main-width-max + side-width
		 230px + 650px + 230px */
	@media all and (min-width: 1110px) {
	 .wrapper {
			grid-template-columns: var(--side-width) auto var(--side-width);
			grid-template-areas:
				"header header header"
				"side main filler";
		}
		main {
			justify-content: center;
		}
	}
</style>
