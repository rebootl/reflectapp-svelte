<script>

	let active = false;

</script>

<div class="button" class:active>
	<img alt="usericon" src="/icons/user.svg">
	<span class="username">rebootl</span>
	<div class="arrow-down">
		<svg viewbox="0 0 100 100">
			<polyline points="31,12 69,50 31,88" fill="none" stroke="currentColor" stroke-width="16px" />
		</svg>
	</div>
</div>

<div class="dialog">

</div>

<style>
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		height: 100%;
		color: var(--header-text-color);
	}
	.button.active {
		background-color: var(--header-background-color-light);
	}
	.button img {
		height: 20px;
		opacity: 0.4;
		padding-left: 10px;
	}
	.button .username {
		padding-left: 5px;
		/*min-width: 10px;*/
	}
	.arrow-down {
		padding-top: 6px;
		padding-left: 5px;
		padding-right: 10px;
	}
	svg {
		height: 20px;
		/*width: 20px;*/
		transform: rotate(90deg);
	}
</style>
