<script>
	import { createEventDispatcher } from 'svelte';
	import { loggedIn, getUserName } from './resources/auth.js';
	import UserLogo from './UserLogo.svelte';

	const dispatch = createEventDispatcher();

	export let active = false
	export let updateButton = false;
	$: update(active);
	$: update(updateButton);

	let _loggedIn = loggedIn();
	let username = getUserName();
	//let username = "bop";

	function update() {
		_loggedIn = loggedIn();
		username = getUserName();
	}
</script>

<button class="button" class:active
		 on:click={()=>dispatch('clicked')}>
	<div class="logobox"><UserLogo /></div>
	<span class="username">{username}</span>
	<div class="arrowdown" class:close={active}>
		<svg class="arrowdownsvg" viewbox="0 0 100 100">
			<polyline points="31,12 69,50 31,88" fill="none" stroke="currentColor" stroke-width="12px" />
		</svg>
	</div>
  <svg class="closesvg" class:close={!active} viewbox="0 0 100 100">
	 	<line x1="12"  y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="12px" />
	  <line x1="88"  y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="12px" />
	</svg>
</button>

<style>
	button {
		padding: 0;
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		height: 100%;
		font-size: 16px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		color: var(--header-text-color);
	}
	button:focus {
		outline-style: dotted;
		outline-offset: -1px;
		outline-color: var(--elements-focus-color);
		outline-width: 1px;
	}
	button::-moz-focus-inner {
		/* -> needed for username text? */
		border: 0;
	}
	button:hover {
		background-color: var(--header-hover-color);
	}
	button.active {
		background-color: var(--header-active-color);
	}
	button img {
		height: 20px;
		opacity: 0.4;
		padding-left: 10px;
	}
	button .username {
		padding-left: 5px;
	}
	.logobox {
		height: 20px;
		padding-left: 10px;
	}
	.arrowdown {
		padding-top: 6px;
		padding-left: 5px;
		padding-right: 10px;
		/*transition: opacity 0.5s;*/
	}
	.arrowdown.close {
		opacity: 0;
	}
	.arrowdownsvg {
		height: 20px;
		transform: rotate(90deg);
	}
	.closesvg {
		height: 20px;
		position: absolute;
		right: 10px;
		top: 15px;
		/*transition: opacity 0.5s;*/
	}
	.closesvg.close {
		opacity: 0;
	}
</style>
