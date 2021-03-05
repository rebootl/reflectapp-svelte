<script>
  import { onMount } from "svelte";
  import Drawer, {Content} from '@smui/drawer';
  import List, {Item, Text, Graphic, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';

  import { profilesURL } from './resources/urls.js';
  import { DataSet } from './resources/DataSet.js';

  export let user = '';

  let profiles = [];
  let active = 'Home';

  let profilesInstance;

  async function loadProfiles() {
    profilesInstance = new DataSet(profilesURL);
    await profilesInstance.load();

    profiles = profilesInstance.data;

    if (user === '') active = 'Home';
    else active = user;
	}
	loadProfiles();

	function setActive(value) {
    active = value;
  }
</script>

<div class="box">
  <Drawer>
    <Content>
      <List>
        <Item href="/#" on:click={() => setActive('Home')}
              activated={active === 'Home'}>
          <Graphic class="material-icons" aria-hidden="true">home</Graphic>
          <Text>Home</Text>
        </Item>
        <Subheader component={H6}>Users</Subheader>
        {#each profiles as p}
        <Item href={'/#' + p.name} on:click={() => setActive(p.name)}
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
</style>
