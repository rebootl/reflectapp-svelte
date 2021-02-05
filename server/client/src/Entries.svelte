<script>
  //import ProfilePicture from './ProfilePicture.svelte';
  import Button, { Icon } from '@smui/button';
  import EntryTypes from './EntryTypes.svelte';
  import EntryInput from './EntryInput.svelte';
	import EntriesList from './EntriesList.svelte';
	import { getEntries, getEntry } from './resources/getData.js';
  import { loggedIn, getUserName } from './resources/auth.js';

  export let routerReady = false;
  export let user = '';
  export let entryId = '';
  export let single = false;
  export let activeTopics = [];
  export let activeTags = [];

  let typeSelect = '';
  let entries = [];

  let entryInputComponent;

  let edit = false;
  let editEntry = {
    text: ''
  };

  let userNotFound = false;
  // -> add some error handling
  /*{#if userNotFound}
    <p>Ooops, user not found...</p>
  {:else}*/

  $: update(user, single, activeTopics, activeTags, typeSelect);

  async function update() {
    if (!routerReady) return;
    entries = [];
    if (single) {
      entries = [ await getEntry(user, entryId) ];
    } else {
      entries = await getEntries(user, activeTopics, activeTags, typeSelect)
    }
    console.log(entries)
  }

  async function fetchEntries() {
    const s = entries.length;
    entries = [
      ...entries,
      ...await getEntries(user, activeTopics, activeTags, typeSelect, s)
    ];
  }

  function loadEdit() {
    if (!single) return;
    if (!entries[0]) return;
    editEntry = entries[0];
    entryInputComponent.loadEdit(entries[0]);
    edit = true;
  }
</script>

<div class="main-container">
  <div class="entries-header-box">
    <EntryTypes on:change={ (e) => typeSelect = e.detail.type } {editEntry} />
    {#if loggedIn()}
      <EntryInput type={typeSelect} bind:this={entryInputComponent}
                  on:cancel={() => edit = false}
                  on:created={() => update()}/>
    {/if}
    {#if single && !edit}
      <div class="single-buttons-box">
        <Button href={'/#~' + user}>View All</Button>
        {#if loggedIn()}
          <Button on:click={()=>loadEdit()}><Icon class="material-icons">create</Icon>Edit</Button>
        {/if}
      </div>
    {/if}
  </div>
  <EntriesList {entries}
               edit={ loggedIn() && getUserName() === user ? true : false }
               on:fetch={ ()=>fetchEntries() } />
</div>

<style>
  .main-container {
    display: flex;
    /*justify-content: center;*/
    flex-flow: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .entries-header-box {
    border-bottom: 1px solid var(--main-lines-color);
    margin-bottom: 20px;
  }
  .single-buttons-box {
    margin-bottom: 5px;
  }
</style>
