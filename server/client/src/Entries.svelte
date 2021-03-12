<script>
  import Button, { Icon } from '@smui/button';
  import EntryTypes from './EntryTypes.svelte';
  import EntryInput from './EntryInput.svelte';
	import EntriesList from './EntriesList.svelte';
  import { loggedIn, getUserName } from './resources/auth.js';

  import { entriesURL } from './resources/urls.js';
  import { DataSet } from './resources/DataSet.js';

  import { singleEntry, activeType, limitDisplay, userEntries, filteredEntries } from './resources/store.js';

  export let routerReady = false;
  export let user = '';

  let typeSelect = '';
  let setType = 'any';
  let entries = [];

  let entryInputComponent;

  let edit = false;
  let editEntry = {
    text: ''
  };

  let entriesInstance;

  $: loadEntries(user);

  async function loadEntries() {
    if (user === '') return;
    entriesInstance = new DataSet(entriesURL);
    await entriesInstance.load({ user: user });

    // load Entries into svelte store!!
    entriesInstance.useStore(userEntries);
  }

  async function fetchEntries() {
    $limitDisplay += 10;
  }

  function typeChange(type) {
    typeSelect = type;
    $activeType = typeSelect;
  }

  function loadEdit() {
    if (!$singleEntry) return;
    if (!$filteredEntries[0]) return;
    const entry = $filteredEntries[0];
    editEntry = entry;
    setType = entry.type;
    edit = true;
    entryInputComponent.loadEdit(entry);
  }

  function viewAll() {
    setType = 'any';
    location.hash = user;
  }
</script>

<div class="main-container">
  <div class="entries-header-box">
    {#if !$singleEntry || edit}
      <EntryTypes on:change={ (e) => typeChange(e.detail.type) } type={setType} />
    {/if}
    {#if loggedIn() && user === getUserName()}
      <EntryInput type={typeSelect} bind:this={entryInputComponent}
                  single={$singleEntry}
                  {entriesInstance}
                  on:cancel={() => edit = false}
                  on:created={ () => {} } />
    {/if}
    {#if $singleEntry && !edit}
      <div class="single-buttons-box">
        <Button on:click={() => viewAll()}>View All</Button>
        {#if loggedIn() && user === getUserName()}
          <Button on:click={()=>loadEdit()}><Icon class="material-icons">create</Icon>Edit</Button>
        {/if}
      </div>
    {/if}
  </div>
  <EntriesList entries={$filteredEntries}
               on:fetch={ ()=>fetchEntries() } />
</div>

<style>
  .main-container {
    display: flex;
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
