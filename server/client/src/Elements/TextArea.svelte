<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let placeholder = '';
	export let cols = 20;
	export let rows = 5;
	export let disabled = false;

	function inputChange(v) {
		dispatch('input', v);
	}
</script>

<textarea type="text" {rows} {cols} {placeholder}
			 on:input={ e => inputChange(e.target.value) }
			 value={value} {disabled}></textarea>

<style>
	textarea {
		background-color: var(--main-background-color);
		border: 1px solid var(--elements-form-line-color);
		border-radius: 4px;
		padding: 20px;
		color: var(--main-text-color);
		font-family: Roboto, sans-serif;
	}
	textarea:focus {
		outline: 2px solid var(--elements-primary-color);
		outline-offset: -1px;
		-moz-outline-radius: 4px;
	}
</style>
