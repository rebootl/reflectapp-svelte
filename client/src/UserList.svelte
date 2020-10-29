<script>
  import { onMount } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { profilesURL } from './resources/urls.js';
	import UserItem from './UserItem.svelte';

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
{#each profiles as p}
	<UserItem username={p.name} />
{:else}
	<p>loading...</p>
{/each}
</div>

<style>
	.box {
		padding-left: 20px;
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--side-lines-color);
	}
</style>
