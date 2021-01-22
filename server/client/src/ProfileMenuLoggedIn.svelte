<script>
	import { createEventDispatcher } from 'svelte';
	import Button from '@smui/button';
	import { getUserName, logout } from './resources/auth.js';
	import MenuItem from './Elements/MenuItem.svelte';
	//import Button from './Elements/Button.svelte';

	const dispatch = createEventDispatcher();

	export let active = false;

	function _logout() {
		if (!confirm("Do u really wanna logout!"));
			return;
		logout();
		dispatch('logout');
	}
</script>

<div class="loggedinbox">
	<div class="menuitems">
		<MenuItem href={'/#~' + getUserName()}>My Entries</MenuItem>
	</div>
	<div class="logoutbutton">
		<Button variant="unelevated" on:click={()=>_logout()}>Logout</Button>
	</div>
</div>

<style>
	.loggedinbox {
		display: flex;
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
		width: 100%;
		border-bottom: 1px solid var(--main-lines-color);
	}
	.logoutbutton {
		padding: 20px 30px 20px 30px;
	}
</style>
