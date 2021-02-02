<script>
	import IconButton from '@smui/icon-button';
	import { getEntry } from './resources/getData.js';
	import { loggedIn, getUserName } from './resources/auth.js';
	import Entry from './Entry.svelte';

  export let user;
  export let id;

	let entry = {};
  let notFound = false;

  $: update(user, id);

	async function update() {
		entry = await getEntry(user, id)
		//console.log(entry)
	}
	update();
</script>

<div class="main-container">
  <div class="viewheader">
		<IconButton class="material-icons"
								title="Show Menu"
								href={'/#~' + entry.user}>arrow_back</IconButton>
    <h3>{user}</h3>
  </div>
  {#if notFound}
    <p>Ooops, user/entry not found...</p>
  {:else}
		<Entry {entry}
					 edit={ loggedIn() && getUserName() === user ? true : false } />
  {/if}
</div>

<style>
  .main-container {
    /*display: flex;
    justify-content: center;*/
		padding-top: 5px;
		padding-bottom: 5px;
  }
  .viewheader {
    display: flex;
		width: 100%;
    position: relative;
    height: 50px;
    align-items: center;
		margin-bottom: 5px;
  }
  .viewheader h3 {
    margin: 0;
		margin-left: 5px;
  }
</style>
