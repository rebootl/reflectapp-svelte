<script>
  import { onMount } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { profilesURL } from './resources/urls.js';
	import ProfileBox from './ProfileBox.svelte';

	let profiles = [];

	async function getProfiles() {
		const r = await apiGetRequest(profilesURL);
		if (!r.success) {
			console.error(r)
			return [];
		}
		return r.result;
	}

	onMount(async () => {
		profiles = await getProfiles();
	});
</script>

<div class="box">
	<h1>Overview</h1>
	<div class="flexwrap">
	{#each profiles as p}
		<ProfileBox username={p.name} />
	{:else}
		<p>loading...</p>
	{/each}
	</div>
</div>

<style>
	.box {
		padding-left: 20px;
	}
	.flexwrap {
		box-sizing: border-box;
		/*background-color: var(--main-background-color-dark);*/
		/*max-width: var(--main-width);
		padding-left: 20px;
		padding-right: 10px;*/
		display: flex;
		flex-wrap: wrap;
	}
</style>
