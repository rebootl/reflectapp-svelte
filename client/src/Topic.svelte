<script>
	export let title = "Title";
	export let href = "#";
</script>

<div class="item"><a href={href}>{title}</a></div>

<style>
	.item {
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.item:active {
		background-color: var(--focus-color);
	}
	.item.active {
		background-color: var(--side-active-color);
	}
	a {
		box-sizing: border-box;
		padding-left: 20px;
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		color: var(--side-text-color);
	}
	a:focus {
		outline-style: dotted;
		outline-offset: -1px;
		outline-color: var(--focus-color);
	}
</style>
