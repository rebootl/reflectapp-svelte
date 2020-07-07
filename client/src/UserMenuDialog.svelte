<script>
	import { createEventDispatcher } from 'svelte';
	import { loggedIn } from './resources/auth.js';
	import UserMenuLoggedIn from './UserMenuLoggedIn.svelte';
	import UserMenuLogin from './UserMenuLogin.svelte';

	const dispatch = createEventDispatcher();

	export let active = false;

	let _loggedIn = loggedIn();

	function loginEvent() {
		_loggedIn = loggedIn();
		dispatch('login');
		//active = false;
	}
	function logoutEvent() {
		_loggedIn = loggedIn();
		active = false;
	}
</script>

<div class="dialog" class:active>
	{#if _loggedIn}
		<UserMenuLoggedIn on:logout={()=>logoutEvent()}/>
	{:else}
		<UserMenuLogin {active} on:login={()=>loginEvent()}/>
	{/if}
</div>
<!--<div class="overlay">
</div>-->

<style>
	.dialog {
		box-sizing: border-box;
		min-width: 10rem;
		flex-direction: column;
		align-items: center;
		position: absolute;
		right: 0.5rem;
		top: calc(var(--header-height) + 0.5rem);
		background-color: var(--main-background-color-light);
		/*border: 1px solid rgba(0, 0, 0, 0.5);*/
		box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.5);
		border-radius: 0.3rem;
		display: none;
	}
	.dialog.active {
		display: flex;
	}
	/* use overlay to make lighter */
	/*.overlay {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.093);
	}*/
</style>
