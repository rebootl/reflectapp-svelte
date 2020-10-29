<script>
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { login } from './resources/auth.js';
	import Input from './Elements/Input.svelte';
	import Password from './Elements/Password.svelte';
	import Button from './Elements/Button.svelte';

	const dispatch = createEventDispatcher();

	export let active;

	let username = "";
	let password = "";
	let loginFailed = false;
	let failedMessage = "";

	$: reset(active);

	function reset() {
		username = "";
		password = "";
		loginFailed = false;
		failedMessage = "";
	}

	async function _login() {
		if (username === "" || password === "") {
			failedMessage = "u need username and pw...";
			loginFailed = true;
			return;
		}
		const r = await login(username, password);
		if (r.success) {
			// reset pw immediately
			// -> reset is called when inactive is set, through reactive prop.
			//reset();
			dispatch('login');
		}
		else {
			if (r.error.code === "EFETCH")
				failedMessage = "Error fetching resource, check conn pls...";
			else failedMessage = "Oops, login failed :(...";
			loginFailed = true;
		}
	}
</script>

<div class="loginbox">
	<Input placeholder="Username" loadValue={username}
				 on:input={(e)=>username = e.detail} />
	<Password placeholder="Password" loadValue={password}
						on:input={(e)=>password = e.detail}
						on:enter={()=>_login()} />
	<Button on:click={()=>_login()}>Login</Button>
	{#if loginFailed}<small class="fail">{failedMessage}</small>{/if}
	<small><a href="#signup">Sign up</a></small>
</div>

<style>
	.loginbox {
		padding: 20px 22px 10px 22px;
		padding: 30px 30px 20px 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.fail {
		color: var(--warn-color);
		margin-bottom: 10px;
	}
	small {
		margin-top: 5px;
	}
</style>
