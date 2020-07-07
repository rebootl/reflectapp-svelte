<script>

	import Topic from './Topic.svelte';

	let a = [ ...Array(2).keys() ];

	export let shownav;
	export let nomenu;

</script>

<nav class:shownav class:nomenu>
	<div class="marginbox"></div>
	<div class="topics">
		<Topic title={"Astro"} />
		<Topic title={"Chess"} />
		<Topic title={"Food"} />
		<Topic title={"Music"} />
		{#each a as p}
			<Topic title={"Topic " + p} />
		{/each}
	</div>
</nav>

<style>
	nav {
		/* alternatively have a border line on top */
		/*border-top: 1px solid var(--side-background-color-light);*/
		/*margin-top: var(--header-height);*/
		/*padding-top: var(--header-height);*/

		display: flex;
		flex-direction: column;
		width: 230px;
		position: fixed;
		left: calc(-1 * var(--side-width));
		transition: left 0.2s;
		top: 0;
		bottom: 0;
		background-color: var(--side-background-color);
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color:
			var(--side-background-color-light)
			var(--side-background-color-dark);
		z-index: 15;
	}
	nav.shownav {
		left: 0;
		transition: left 0.2s;
	}
	nav.nomenu {
		display: none;
	}
	@media all and (min-width: 650px) {
		nav {
			left: 0;
		}
	}
	.marginbox {
		height: calc(var(--header-height) - 1px);
		border-bottom: 1px solid var(--side-background-color-light);
	}
	.topics {
		border-bottom: 1px solid var(--side-background-color-light);
	}
</style>
