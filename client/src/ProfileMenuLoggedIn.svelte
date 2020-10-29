<script>
	import { createEventDispatcher } from 'svelte';
	import { logout } from './resources/auth.js';
	import MenuItem from './Elements/MenuItem.svelte';
	import Button from './Elements/Button.svelte';

	const dispatch = createEventDispatcher();

	export let active = false;

	// only for menuitems
	let dark = true;

	function _logout() {
		if (!confirm("Do u really wanna logout!"));
			return;
		logout();
		dispatch('logout');
	}
</script>

<div class="loggedinbox">
	<div class="menuitems">
		<MenuItem title="Overview" href="#" {dark} />
		<MenuItem title="My Entries" href="#editor" {dark} />
	</div>
	<div class="logoutbutton">
		<Button on:click={()=>_logout()}>Logout</Button>
	</div>
</div>

<style>
	.loggedinbox {
		box-sizing: border-box;
		min-width: 180px;
		flex-direction: column;
		align-items: center;
	}
	/*.overlay {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.093);
		border: 1px solid rgba(0, 0, 0, 0.5);
	}*/
	.menuitems {
		border-bottom: 1px solid var(--main-lines-color);
	}
	.logoutbutton {
		padding: 10px 30px 10px 30px;
	}
</style>
