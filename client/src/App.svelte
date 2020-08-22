<script>
	import { afterUpdate } from 'svelte';
	import NavButton from './NavButton.svelte';
	import Logo from './Logo.svelte';
	import UserMenu from './UserMenu.svelte';
	import Nav from './Nav.svelte';
	import Exampletext from './Exampletext.svelte';
	import Overview from './Overview.svelte';
	import OverviewButton from './OverviewButton.svelte';
	import Entries from './Entries.svelte';
	import SingleEntry from './SingleEntry.svelte';
	import { setColorVariants } from './resources/colors.js';
	import { myrouter } from './resources/router.js';
	import { loggedIn } from './resources/auth.js';

	//let route = myrouter.getRoute();
	// route for template
	let route = '';
	// user for user entries
	let user = '';
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
			if (_p0[0]) {
				if (_p0[0].startsWith('~')) {
					// single entry
					route = 'singleentry';
					entryId = _p0[0].slice(1);
				} else route = 'user';
			} else {
				route = 'user';
			}
			overview = false;
			user = _route.slice(1);
		} else if (_route === 'editor' || _route === 'me' || _route === 'my-entries'
				|| _route === 'myentries') {
				if (loggedIn()) overview = false;
				else overview = true;
				route = 'me';
		} else if (_route === 'signup') {
			overview = true;
			route = 'signup';
		} else {
			myrouter.setURL('', [], []);
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
		<div class="header-left">
			<div class="header-button-left-box">
				<NavButton active={shownav} nomenu={overview}
									 on:menuclicked={()=>shownav = !shownav} />
				<OverviewButton off={overview} />
				<Logo off={!overview} />
			</div>
			<div class="header-spacer-left-box"></div>
			<img class="header-r-right" src="/icons/R-left.svg" />
		</div>
		<div class="header-spacer"></div>
		<div class="header-right">
			<img class="header-r-right" src="/icons/R-right.svg" />
			<div class="header-spacer-right-box"></div>
			<div class="header-button-right-box">
				<UserMenu />
			</div>
		</div>
	</header>
	{#if !overview}
		<Nav {shownav} nomenu={overview} />
	{/if}
	<!-- (sidearea stays empty, menu is overlayed above) -->
	<div class="sidearea"></div>
	<div class="spacer"></div>
	<main>
	{#if route === 'user'}
		<Entries />
		<!--<Exampletext n={5} />-->
	{:else if route === 'singleentry'}
		<SingleEntry {user} entryId={entryId} />
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
	:global(*) {
		box-sizing: border-box;
	}
	:global(body) {
		--logo-primary-color: #3dbbbb;
		--logo-secondary-color: #8a8af8;

		/*** colors ***/
		/* links */
		--primary-color: #9cdede;
		/* input elements */
		--primary-variant-color: #287b7b;
		--on-primary-variant-color: #eee;

		/* header */
		/*--header-background-color: #20203a;*/
		--header-background-color: #17171d;
		--header-line-color: #000;
		--header-hover-color: var(--header-background-color-light);
		--header-active-color: var(--header-background-color-light);
		--header-text-color: #eee;

		/* side */
		--side-background-color: #17171d;
		--side-hover-color: var(--side-background-color-light);
		--side-active-color: var(--side-background-color-lighter);
		--side-text-color: #ddd;

		/* main */
		--main-background-color: #17171d;
		--main-content-background-color: #26262f;
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
		--sidebar-width: 15px;
		--side-width-extended: 230px;
		--main-width: 650px;
		--side-width: var(--sidebar-width);

		margin: 0;
		background-color: var(--main-background-color);
		font-family: sans-serif;
		/* avoid layout shift when scrollbar appears... */
		overflow-y: scroll;
	}
	:global(a) {
		color: var(--primary-color);
	}
	.wrapper {
		display: grid;
		grid-template-columns: auto;
		/*transition: grid-template-columns 0.5s;*/
		grid-template-rows: var(--header-height) auto;
		grid-template-columns: var(--side-width) 5px minmax(0, 1fr);
		grid-template-areas:
			"header header header"
			"side spacer main";
		background-color: var(--main-background-color);
		/*min-height: 100vh;*/
	}
	header {
		display: grid;
		grid-area: header;
		background-color: var(--header-background-color);
		border-bottom: 1px solid var(--header-line-color);
		z-index: 100;
		box-shadow: 4px 0 8px 0 rgba(0, 0, 0, 0.25);
		grid-template-columns: var(--side-width) 5px minmax(0, 1fr);
		grid-template-rows: var(--header-height);
		grid-template-areas: "header-left header-spacer header-right";
	}
	.header-left {
		grid-area: header-left;
		/*border-right: 2px solid var(--logo-secondary-color);*/
		display: flex;
	}
	.header-button-left-box {
		border-bottom: 2px solid var(--logo-secondary-color);
	}
	.header-spacer-left-box {
		width: 100%;
		border-bottom: 2px solid var(--logo-secondary-color);
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
		/*border-bottom: 2px solid var(--logo-primary-color);
		padding-top: 2px;*/
	}
	main {
		/*padding-left: 20px;*/
		grid-area: main;
		color: var(--main-text-color);
		border-left: solid 2px var(--logo-primary-color);
		/*display: flex;*/
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
	@media all and (min-width: 700px) {
		:global(body) {
			--side-width: var(--side-width-extended);
		}
		.wrapper {
			/*grid-template-columns: var(--side-width) calc(100% - var(--side-width));*/
			/*grid-template-columns: var(--side-width) minmax(0, 1fr);*/
			/*grid-template-areas:
				"header header"
				"side main";*/
		}
		.wrapper.nomenu {
			--side-width: var(--sidebar-width);
		}
	}
	/* side-width + main-width-max + side-width
		 230px + 650px + 230px */
	@media all and (min-width: 1110px) {
	 .wrapper {
		 	/*grid-template-columns: var(--side-width) calc(100% - 2 * var(--side-width)) var(--side-width);*/
			grid-template-columns: var(--side-width) minmax(0, 1fr) var(--side-width);
			grid-template-areas:
				"header header header"
				"side main filler";
		}
		main {
			justify-content: center;
		}
	}
</style>
