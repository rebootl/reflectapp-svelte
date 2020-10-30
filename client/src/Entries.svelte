<script>
  import ProfilePicture from './ProfilePicture.svelte';
	import EntriesList from './EntriesList.svelte';
	import { getEntries, getAllEntries } from './resources/getData.js';

  export let routerReady = false;
  export let user = '';
  export let activeTopics = [];
  export let activeTags = [];

  let entries = [];

  let userNotFound = false;
  // -> add some error handling
  /*{#if userNotFound}
    <p>Ooops, user not found...</p>
  {:else}*/

  $: update(user, activeTopics, activeTags);

  async function update() {
    if (!routerReady) return;
    entries = [];
    //console.log('Entries/user, topics, tags: ', user, topics, tags)
    if (user === '')
      entries = await getAllEntries();
    else
      entries = await getEntries(user, activeTopics, activeTags)
    //console.log('Entries/entries: ', entries)
  }

  async function fetchEntries() {
    const s = entries.length;
    entries = [
      ...entries,
      ...await getEntries(user, activeTopics, activeTags, s)
    ];
  }
</script>

<div class="main-container">
  <div class="main-inner">
    {#if user !== ''}
	    <h1><div class="logobox"><ProfilePicture /></div>{user}</h1>
    {/if}
    <EntriesList {entries} on:fetch={ ()=>fetchEntries() } />
  </div>
</div>

<style>
  .main-container {
    display: flex;
    /* -> add media query? */
    justify-content: center;
  }
	.main-inner {
    width: 100%;
    max-width: var(--main-width);
	}
  .logobox {
    height: 50px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 10px;
  }
</style>
