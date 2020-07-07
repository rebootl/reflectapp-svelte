<script>
	import UserMenuButton from './UserMenuButton.svelte';
	import UserMenuDialog from './UserMenuDialog.svelte';

	let active = false;
	let updateButton = false;

	function loginEvent() {
		updateButton = !updateButton;
	}
</script>

<UserMenuButton on:clicked={()=>active = !active}
								{active} {updateButton} />

<!--<div class="overlay" class:active
		 on:click={()=>active = !active}></div>-->
<UserMenuDialog bind:active={active} on:login={()=>loginEvent()} />

<style>
/* use overlay to click "outside" to close */
/*	.overlay {
		display: none;
	}
	.overlay.active {
		display: block;
		position: fixed;
		top: var(--header-height);
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0);
	}*/
</style>
