<script>
	export let title = "Title";
	export let href = "#";
	export let dark = false;
</script>

<div class="item" class:dark><a href={href}>{title}</a></div>

<style>
	.item {
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
	.item:hover {
		background-color: rgba(0, 0, 0, 0.12);
	}
	.item:active {
		background-color: rgba(0, 0, 0, 0.24);
	}
	.item:hover.dark {
		background-color: rgba(255, 255, 255, 0.12);
	}
	.item:active.dark {
		background-color: rgba(255, 255, 255, 0.24);
	}
	a {
		box-sizing: border-box;
		padding-left: 20px;
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--elements-text-color);
	}
	a:focus {
		outline-style: dotted;
		outline-offset: -1px;
		outline-color: var(--elements-focus-color);
	}
	a:active {
		background-color: var(--elements-focus-color);
	}
</style>
