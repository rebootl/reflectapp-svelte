<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// this switches between 'menu' and 'close' graphic
	export let close;
	// this hides the button
	export let nomenu;

</script>

<div class:nomenu on:click={()=>dispatch('menuclicked')}>
	<svg class="menubutton" class:close width="1em" height="1em" viewbox="0 0 100 100">
		<line x1="10"  y1="20" x2="90" y2="20" stroke="currentColor" stroke-width="12px" />
		<line x1="10"  y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="12px" />
		<line x1="10"  y1="80" x2="90" y2="80" stroke="currentColor" stroke-width="12px" />
	</svg>
	<svg alt="close menu button" class="closebutton" class:close width="1em" height="1em" viewbox="0 0 100 100">
		<line x1="12"  y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="12px" />
		<line x1="88"  y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="12px" />
	</svg>
</div>

<style>
	div {
		display: inline-block;
	}
	div.nomenu {
		display: none;
	}
	svg {
		padding: 5px;
		color: var(--header-text-color);
		height: 40px;
		width: 40px;
		transition: opacity 0.5s;
	}
	svg.menubutton.close {
		opacity: 0;
	}
	svg.closebutton {
		position: absolute;
		left: 0;
		opacity: 0;
	}
	svg.closebutton.close {
		opacity: 1;
	}
	@media all and (min-width: 650px) {
		div {
			display: none;
		}
	}
</style>
