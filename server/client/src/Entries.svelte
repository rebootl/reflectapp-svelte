<script>
  //import ProfilePicture from './ProfilePicture.svelte';
  import EntryTypes from './EntryTypes.svelte';
  import EntryInput from './EntryInput.svelte';
	import EntriesList from './EntriesList.svelte';
	import { getEntries, getAllEntries } from './resources/getData.js';
  import { loggedIn } from './resources/auth.js';

  export let routerReady = false;
  export let user = '';
  export let activeTopics = [];
  export let activeTags = [];

  let typeSelect = '';
  let entries = [];

  let userNotFound = false;
  // -> add some error handling
  /*{#if userNotFound}
    <p>Ooops, user not found...</p>
  {:else}*/

  $: update(user, activeTopics, activeTags, typeSelect);

  async function update() {
    if (!routerReady) return;
    entries = [];
    entries = await getEntries(user, activeTopics, activeTags, typeSelect.slice(0, -1))
    console.log(entries)
  }

  async function fetchEntries() {
    const s = entries.length;
    entries = [
      ...entries,
      ...await getEntries(user, activeTopics, activeTags, typeSelect, s)
    ];
  }
</script>

<div class="main-container">
  <EntryTypes on:change={ (e) => typeSelect = e.detail.type }/>
  {#if loggedIn()}
    <EntryInput type={typeSelect} />
  {/if}
  <EntriesList {entries} on:fetch={ ()=>fetchEntries() } />
</div>

<style>
  .main-container {
    display: flex;
    /*justify-content: center;*/
    flex-flow: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
