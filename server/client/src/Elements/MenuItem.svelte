<script>
	export let href = null;
</script>

<a class="item" href={href}><slot></slot></a>

<style>
	.item {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		height: 48px;
		line-height: 48px;
	}
	.item:hover {
		background-color: var(--elements-hover-color);
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
		outline-style: none;	
		background-color: var(--elements-active-color);
	}
	a:active {
		background-color: var(--elements-active-color);
	}
</style>
