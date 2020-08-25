<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// this hides the button
	export let off;
</script>

<div class:off>
	<a href="#" title="Overview">
		<span class="clickspan"></span>
		<svg class="menubutton" viewbox="0 0 100 100">
			<line x1="10" y1="30" x2="40" y2="30" stroke="currentColor" stroke-width="20" />
			<line x1="60" y1="30" x2="90" y2="30" stroke="currentColor" stroke-width="20" />
			<line x1="10" y1="70" x2="40" y2="70" stroke="currentColor" stroke-width="20" />
			<line x1="60" y1="70" x2="90" y2="70" stroke="currentColor" stroke-width="20" />
		</svg>
	</a>
</div>

<style>
	div {
		position: relative;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid var(--logo-primary-color);
		border-right: 1px solid var(--header-lines-color);
	}
	div.off {
		display: none;
	}
	div:hover {
		background-color: var(--header-hover-color);
	}
	a {
		height: 20px;
	}
	svg {
		color: var(--header-text-color);
		height: 20px;
		width: 20px;
	}
	.clickspan {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
