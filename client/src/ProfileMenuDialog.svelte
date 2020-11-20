<script>
	import { createEventDispatcher } from 'svelte';
	import { loggedIn } from './resources/auth.js';
	import ProfileMenuLoggedIn from './ProfileMenuLoggedIn.svelte';
	import ProfileMenuLogin from './ProfileMenuLogin.svelte';

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
		<ProfileMenuLoggedIn on:logout={()=>logoutEvent()}/>
	{:else}
		<ProfileMenuLogin {active} on:login={()=>loginEvent()}/>
	{/if}
</div>

<style>
	.dialog {
		margin-top: 8px;
		margin-right: 8px;
		border: 1px solid var(--main-lines-color);
		border-radius: 8px;
	}
</style>
