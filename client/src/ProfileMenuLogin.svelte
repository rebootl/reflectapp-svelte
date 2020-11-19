<script>
	import { createEventDispatcher } from 'svelte';
	import { myrouter } from './resources/router.js';
	import { login } from './resources/auth.js';
	//import Input from './Elements/Input.svelte';
	import Textfield from '@smui/textfield';
	import Password from './Elements/Password.svelte';
	//import Button from './Elements/Button.svelte';
	import Button from '@smui/button';

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
	<div class="inputelement">
		<Textfield variant="outlined" bind:value={username} label="Username"
						 	 input$size="10" />
	</div>
	<div class="inputelement">
		<Textfield variant="outlined" class="shaped" bind:value={password} label="Password"
		  				 input$size="10" input$type="password"
			  			 on:enter={()=>_login()} />
	</div>
	<div class="buttonelement">
		<Button on:click={()=>_login()} variant="unelevated">Login</Button>
	</div>
	{#if loginFailed}<small class="fail">{failedMessage}</small>{/if}
</div>

<style>
	.loginbox {
		padding: 30px 30px 20px 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.inputelement {
		margin-bottom: 15px;
	}
	.buttonelement {
		margin-top: 5px;
		margin-bottom: 5px
	}
	.fail {
		color: var(--error-color);
		margin-bottom: 10px;
	}
	small {
		margin-top: 5px;
	}
</style>
