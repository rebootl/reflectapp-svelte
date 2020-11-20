<script>
	import ProfilePicture from './ProfilePicture.svelte';

	export let username = "Username";
</script>

<div class="item">
	<div class="profilepicturebox">
		<ProfilePicture />
	</div>
	{ username }
	<a href={'#~' + username} title="To User" class="clicklink"></a>
</div>

<style>
	.item {
		display: flex;
		position: relative;
		height: 48px;
		align-items: center;
		color: var(--main-text-color);
	}
	.item:hover {
		background-color: var(--side-hover-color);
	}
	.clicklink:focus {
		outline-style: solid;
		outline-offset: -1px;
		outline-color: var(--focus-color);
		outline-width: 1px;
		/*background-color: var(--side-active-color);*/
	}
	.profilepicturebox {
		height: 35px;
		padding-left: 5px;
		padding-right: 5px;
	}
	.clicklink {
		position:absolute;
		width:100%;
		height:100%;
		top:0;
		left: 0;
		z-index: 10;
	}
</style>
