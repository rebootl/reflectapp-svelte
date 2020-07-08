<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let disabled = false;

	let active = false;

	function keyDown(code) {
		if (code === "Enter" || code === "Space") {
			active = true;
		}
	}
	function keyUp(code) {
		if (code === "Enter" || code === "Space") {
			active = false;
		}
	}
</script>

<button on:click
				on:keydown={e=>keyDown(e.code)}
				on:keyup={e=>keyUp(e.code)}
				class:active {disabled}>
	<strong><slot /></strong>
</button>

<style>
	button {
		background-color: var(--elements-primary-color);
		border: 0;
		border-radius: 8px;
		/*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);*/
		box-shadow: 0 6px 0 -2px rgba(0, 0, 0, 0.3);
		padding: 12px 12px 12px 12px;
		margin-top: 12px;
		margin-bottom: 12px;
		width: 100%;
		font-size: 1rem;
		cursor: pointer;
		outline: none;
		color: var(--elements-on-primary-color);
	}
	button:hover {
		background-color: var(--elements-primary-color-light);
	}
	button:disabled {
		cursor: default;
		background-color: rgb(120, 120, 130);
		color: rgb(180, 180, 190);
	}
	/* remove inner dotted line on firefox
		 use accessibility focus below */
	button::-moz-focus-inner {
		border: 0;
	}
	/* accessibility! */
	button:focus {
		outline-style: dotted;
		outline-color: var(--elements-focus-color);
		outline-offset: 5px;
		outline-width: 1px;
	}
	button:active {
		background-color: var(--elements-focus-color);
	}
	button:disabled:active {
		background-color: rgb(120, 120, 120);
	}
	/* this is needed for "active" to work on keypress */
	button.active {
		background-color: var(--elements-focus-color);
	}
</style>
