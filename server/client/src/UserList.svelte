<script>
  import { onMount } from "svelte";
  import Drawer, {Content} from '@smui/drawer';
  import List, {Item, Text, Graphic, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';
  import { myDataStore } from './resources/dataStore.js';

  export let user = '';

  let profiles = [];
  let active = 'Home';

  async function initProfiles() {
		profiles = await myDataStore.getProfiles();
    if (user === '') active = 'Home';
    else active = user;
	}
	initProfiles();

	function setActive(value) {
    active = value;
  }
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
</style>
