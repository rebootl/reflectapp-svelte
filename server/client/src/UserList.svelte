<script>
  import { onMount } from "svelte";
	import { apiGetRequest } from './resources/requests.js';
	import { profilesURL } from './resources/urls.js';
  import MenuItem from './Elements/MenuItem.svelte';

  export let user = '';

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
  <MenuItem href={'#~' + p.name} icon={'person'}
            active={ user === p.name ? true : false }>{p.name}</MenuItem>
{:else}
	<p>loading...</p>
{/each}
</div>

<style>
	.box {
		/*display: flex;
    flex-wrap: wrap;*/
    border-bottom: 1px solid var(--side-lines-color);
	}
</style>
