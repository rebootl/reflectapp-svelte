<script>
  import { onMount } from "svelte";
  import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
  import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';
	import { apiGetRequest } from './resources/requests.js';
	import { profilesURL } from './resources/urls.js';
  import MenuItem from './Elements/MenuItem.svelte';

  export let user = '';

	let profiles = [];

  let active = '';

	function setActive(value) {
    active = value;
    //myDrawerOpen = false;
  }

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
<Drawer>
  <Content>
    <List>
      <Item href="#" on:click={() => setActive('Home')}
            activated={active === 'Home'}>
        <Graphic class="material-icons" aria-hidden="true">home</Graphic>
        <Text>Home</Text>
      </Item>
      <!--<Separator nav />-->
      <Subheader component={H6}>Users</Subheader>
      {#each profiles as p}
      <Item href={'#~' + p.name} on:click={() => setActive(p.name)}
            activated={active === p.name}>
        <Graphic class="material-icons" aria-hidden="true">person</Graphic>
        <Text>{p.name}</Text>
      </Item>
      {/each}
    </List>
  </Content>
</Drawer>
</div>

<style>
	.box {
		/*display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--side-lines-color);*/
	}
</style>
