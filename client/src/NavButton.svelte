<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// this switches between 'menu' and 'close' graphic
	export let active;
	// this hides the button
	export let nomenu;

</script>

<button class:nomenu class:active on:click={()=>dispatch('menuclicked')}>
	<svg class="menubutton" class:active width="1em" height="1em" viewbox="0 0 100 100">
		<line x1="10"  y1="20" x2="90" y2="20" stroke="currentColor" stroke-width="12px" />
		<line x1="10"  y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="12px" />
		<line x1="10"  y1="80" x2="90" y2="80" stroke="currentColor" stroke-width="12px" />
	</svg>
	<svg class="closebutton" class:active width="1em" height="1em" viewbox="0 0 100 100">
		<line x1="12"  y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="12px" />
		<line x1="88"  y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="12px" />
	</svg>
</button>

<style>
	button {
		padding: 0;
		background-color: var(--header-background-color);
		border: 0;
		height: 50px;
		width: 50px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		border-right: 2px solid var(--logo-secondary-color);
		border-bottom: 2px solid var(--logo-secondary-color);
	}
	button.nomenu {
		display: none;
	}
	button:hover {
		background-color: var(--header-background-color-light);
	}
	button.active {
		background-color: var(--header-background-color-light);
	}
	button:focus {
		outline-style: dotted;
		outline-offset: -1px;
		outline-color: var(--elements-focus-color);
		outline-width: 1px;
	}
	svg {
		color: var(--header-text-color);
		height: 20px;
		width: 20px;
	}
	.menubutton.active {
		opacity: 0;
	}
	.closebutton {
		background-color: rgba(0, 0, 0, 0);
		position: absolute;
		top: 15px;
		left: 15px;
		opacity: 0;
	}
	.closebutton.active {
		opacity: 1;
	}
	@media all and (min-width: 700px) {
		button {
			display: none;
		}
	}
</style>
