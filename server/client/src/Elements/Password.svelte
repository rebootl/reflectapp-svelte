<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let placeholder = "";
	export let loadValue = "";
	export let size = 10;
	export let disabled = false;

	function inputChange(v) {
		dispatch('input', v);
	}

	function keyPress(code) {
		if (code === "Enter") {
			dispatch('enter');
		}
	}
</script>

<input type="password" size={size} placeholder={placeholder}
			 on:input={e=>inputChange(e.target.value)}
			 on:keypress={(e)=>keyPress(e.code)}
			 value={loadValue} {disabled}>

<style>
	input {
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		border-bottom: 1px solid var(--elements-primary-color-light);
		padding: 5px;
		margin-bottom: 10px;
		line-height: 1.6em;
		font-size: 16px;
		color: var(--elements-text-color);
	}
	input:disabled {
		color: rgb(120, 120, 130);
		border-bottom: 1px solid rgb(120, 120, 120);
	}
	/* accessibility! */
	input:focus {
		outline-style: dotted;
		outline-color: var(--elements-focus-color);
		outline-offset: 5px;
		outline-width: 1px;
	}
</style>
